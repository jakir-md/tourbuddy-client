"use client";

import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Loader2,
  XCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type RequestStatus = "PENDING" | "ACCEPTED" | "REJECTED" | null;

interface BookingCardProps {
  trip: {
    budget: number;
    startDate: string;
    endDate: string;
  };
  requestStatus: RequestStatus;
  onRequestJoin: () => void;
  isProcessing?: boolean; // For loading state when clicking button
}

export default function BookingCard({
  trip,
  requestStatus,
  onRequestJoin,
  isProcessing,
}: BookingCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // 1. DYNAMIC CONTENT CONFIGURATION based on status
  const getStatusConfig = () => {
    switch (requestStatus) {
      case "PENDING":
        return {
          headerColor: "bg-amber-500", // Yellow top bar
          badge: (
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0">
              Request Sent
            </Badge>
          ),
          button: (
            <Button
              disabled
              className="w-full h-12 text-lg font-bold bg-amber-100 text-amber-700 opacity-100"
            >
              <Clock className="w-5 h-5 mr-2" /> Pending Approval
            </Button>
          ),
          message:
            "The host is reviewing your request. You will be notified via email once they decide.",
          alert: (
            <Alert className="bg-amber-50 border-amber-200 mb-4">
              <Clock className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">
                Awaiting Host Response
              </AlertTitle>
              <AlertDescription className="text-amber-700 text-xs">
                Most hosts reply within 24 hours.
              </AlertDescription>
            </Alert>
          ),
        };
      case "REJECTED":
        return {
          headerColor: "bg-red-500", // Red top bar
          badge: (
            <Badge
              variant="destructive"
              className="bg-red-100 text-red-800 hover:bg-red-100 border-0"
            >
              Unavailable
            </Badge>
          ),
          button: (
            <Button
              disabled
              className="w-full h-12 text-lg font-bold bg-slate-100 text-slate-400"
            >
              <XCircle className="w-5 h-5 mr-2" /> Request Rejected
            </Button>
          ),
          message:
            "Unfortunately, the host declined your request for this trip. Try searching for other similar trips.",
          alert: (
            <Alert
              variant="destructive"
              className="bg-red-50 border-red-200 mb-4"
            >
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Request Declined</AlertTitle>
              <AlertDescription className="text-red-700 text-xs">
                The host is unable to accommodate you on this trip.
              </AlertDescription>
            </Alert>
          ),
        };
      case "ACCEPTED":
        return {
          headerColor: "bg-blue-600", // Blue top bar
          badge: (
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-0">
              You're In!
            </Badge>
          ),
          button: (
            <Button className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200">
              <CheckCircle2 className="w-5 h-5 mr-2" /> View Ticket
            </Button>
          ),
          message:
            "Congratulations! You are officially part of this trip. Check your email for next steps.",
          alert: null,
        };
      default:
        return {
          headerColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
          badge: (
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-0">
              Open to Join
            </Badge>
          ),
          button: (
            <Button
              onClick={onRequestJoin}
              disabled={isProcessing}
              className="w-full h-12 text-lg font-bold bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200 gap-2"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Request to Join"
              )}
              {!isProcessing && <ArrowRight className="w-5 h-5" />}
            </Button>
          ),
          message:
            "You won't be charged yet. The host must approve your request before payment.",
          alert: null,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="sticky top-24">
      <Card className="shadow-xl border-slate-200 overflow-hidden">
        {/* Dynamic Header Color */}
        <div className={`h-2 w-full ${config.headerColor}`} />

        <CardContent className="p-6 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-3xl font-bold text-slate-900">
                ${trip.budget}
              </span>
              <span className="text-slate-500 text-sm ml-1">/ person</span>
            </div>
            {config.badge}
          </div>

          {/* Alert Box for Pending/Rejected states */}
          {config.alert}

          <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50/50">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Start Date</span>
              <span className="font-semibold text-slate-900">
                {formatDate(trip.startDate)}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">End Date</span>
              <span className="font-semibold text-slate-900">
                {formatDate(trip.endDate)}
              </span>
            </div>
          </div>

          {/* Dynamic Button */}
          {config.button}

          <p className="text-xs text-center text-slate-400 px-4 leading-normal">
            {config.message}
          </p>

          <div className="flex justify-center pt-2">
            <Button
              variant="ghost"
              className="text-slate-500 hover:text-emerald-700 gap-2 w-full"
            >
              <MessageCircle className="w-4 h-4" /> Message Host
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Safety Note - Only show if not rejected */}
      {requestStatus !== "REJECTED" && (
        <div className="mt-6 flex gap-3 p-4 bg-blue-50 rounded-lg text-blue-800 text-xs leading-relaxed">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <p>
            <strong>Safe Travel Guarantee:</strong> Payments are held in escrow
            until 24 hours after the trip starts.
          </p>
        </div>
      )}
    </div>
  );
}
