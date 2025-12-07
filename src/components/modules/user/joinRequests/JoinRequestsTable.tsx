"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  X,
  Calendar,
  ArrowRight,
  MessageSquare,
  Loader2,
  User,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// 1. Mock Data Interface
interface JoinRequest {
  id: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  message: string;
  user: {
    id: string;
    name: string;
    username: string;
    profilePhoto: string;
  };
  trip: {
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
  };
  createdAt: string;
}

// 2. Mock Data
const initialRequests: JoinRequest[] = [
  {
    id: "req_1",
    status: "PENDING",
    message:
      "Hi! I've been to Egypt before and speak a bit of Arabic. Would love to join your group!",
    user: {
      id: "u1",
      name: "Sarah Jenkins",
      username: "@sarah_j",
      profilePhoto:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    },
    trip: {
      id: "t1",
      destination: "Cairo, Egypt",
      startDate: "2025-12-05",
      endDate: "2025-12-12",
    },
    createdAt: "2025-10-10",
  },
  {
    id: "req_2",
    status: "PENDING",
    message: "Is this trip suitable for beginners? I have my own gear.",
    user: {
      id: "u2",
      name: "Mike Chen",
      username: "@mike_c",
      profilePhoto:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    trip: {
      id: "t2",
      destination: "Kyoto, Japan",
      startDate: "2026-03-10",
      endDate: "2026-03-20",
    },
    createdAt: "2025-10-12",
  },
];

export default function JoinRequestsPage() {
  const [requests, setRequests] = useState<JoinRequest[]>(initialRequests);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleAction = async (
    requestId: string,
    action: "ACCEPTED" | "REJECTED"
  ) => {
    setProcessingId(requestId);
    console.log(`Marking request ${requestId} as ${action}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
    setProcessingId(null);
  };

  // --- EMPTY STATE ---
  if (requests.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Join Requests
        </h1>
        <Card className="border-dashed shadow-none bg-slate-50">
          <CardContent className="p-12 text-center text-slate-500 flex flex-col items-center gap-2">
            <User className="w-10 h-10 text-slate-300 mb-2" />
            <p>No pending requests right now.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Join Requests
          </h1>
          <p className="text-slate-500 hidden sm:block">
            Manage travelers who want to join your trips.
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          {requests.length} Pending
        </Badge>
      </div>

      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 py-4">
          <CardTitle className="text-lg">Pending Approvals</CardTitle>
          <CardDescription className="hidden sm:block">
            Review profiles before accepting. Safety first!
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {/* ======================================================= */}
          {/* VIEW 1: DESKTOP TABLE (Hidden on Mobile)                */}
          {/* ======================================================= */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Traveler</TableHead>
                  <TableHead className="w-[250px]">Trip Details</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id} className="group">
                    {/* User */}
                    <TableCell className="font-medium">
                      <Link
                        href={`/profile/${req.user.id}`}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                      >
                        <Avatar className="h-10 w-10 border border-slate-200">
                          <AvatarImage src={req.user.profilePhoto} />
                          <AvatarFallback>{req.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                            {req.user.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            {req.user.username}
                          </span>
                        </div>
                      </Link>
                    </TableCell>

                    {/* Trip */}
                    <TableCell>
                      <Link
                        href={`/trips/${req.trip.id}`}
                        className="group/trip block"
                      >
                        <div className="font-medium text-slate-900 group-hover/trip:text-emerald-600 flex items-center gap-1 transition-colors">
                          {req.trip.destination}
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/trip:opacity-100 transition-opacity -translate-x-1 group-hover/trip:translate-x-0" />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(req.trip.startDate).toLocaleDateString()}
                          </span>
                        </div>
                      </Link>
                    </TableCell>

                    {/* Message */}
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-start gap-2 max-w-[200px] cursor-help">
                              <MessageSquare className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                              <p className="text-sm text-slate-600 truncate">
                                {req.message}
                              </p>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs p-4">
                            <p className="italic">"{req.message}"</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <ActionButtons
                        reqId={req.id}
                        processingId={processingId}
                        onAction={handleAction}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* ======================================================= */}
          {/* VIEW 2: MOBILE CARDS (Hidden on Desktop)                */}
          {/* ======================================================= */}
          <div className="md:hidden divide-y divide-slate-100">
            {requests.map((req) => (
              <div key={req.id} className="p-4 flex flex-col gap-4">
                {/* Header: User & Trip */}
                <div className="flex items-start justify-between">
                  <Link
                    href={`/profile/${req.user.id}`}
                    className="flex items-center gap-3"
                  >
                    <Avatar className="h-10 w-10 border border-slate-200">
                      <AvatarImage src={req.user.profilePhoto} />
                      <AvatarFallback>{req.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 text-sm">
                        {req.user.name}
                      </span>
                      <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                        To: {req.trip.destination}
                      </span>
                    </div>
                  </Link>
                  <Badge
                    variant="outline"
                    className="text-[10px] text-slate-400"
                  >
                    {new Date(req.createdAt).toLocaleDateString()}
                  </Badge>
                </div>

                {/* Message Bubble */}
                <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600 relative ml-4 border border-slate-100">
                  <div className="absolute w-3 h-3 bg-slate-50 border-l border-t border-slate-100 transform -rotate-45 -top-1.5 left-4"></div>
                  <p>"{req.message}"</p>
                </div>

                {/* Actions (Full Width) */}
                <div className="flex gap-3 mt-1">
                  <ActionButtons
                    reqId={req.id}
                    processingId={processingId}
                    onAction={handleAction}
                    mobile
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 3. Helper Component: Reusable Buttons
function ActionButtons({ reqId, processingId, onAction, mobile = false }: any) {
  return (
    <div
      className={`flex items-center gap-2 ${mobile ? "w-full" : "justify-end"}`}
    >
      {/* Reject Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={!!processingId}
        onClick={() => onAction(reqId, "REJECTED")}
        className={`text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 ${
          mobile ? "flex-1" : ""
        }`}
      >
        {processingId === reqId ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <X className="w-4 h-4 mr-1" /> Reject
          </>
        )}
      </Button>

      {/* Accept Button */}
      <Button
        size="sm"
        disabled={!!processingId}
        onClick={() => onAction(reqId, "ACCEPTED")}
        className={`bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm ${
          mobile ? "flex-1" : ""
        }`}
      >
        {processingId === reqId ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Check className="w-4 h-4 mr-1" /> Accept
          </>
        )}
      </Button>
    </div>
  );
}
