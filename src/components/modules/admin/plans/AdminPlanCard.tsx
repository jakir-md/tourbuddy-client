"use client";

import {
  Edit2,
  Trash2,
  Shield,
  MessageSquare,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

// Type matching your Schema
export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  durationInDays: number;
  isActive: boolean;
  limits: {
    maxTrips: number;
    maxRequests: number;
    isVerifiedBadge: boolean;
    canChat: boolean;
  };
}

interface AdminPlanCardProps {
  plan: Plan;
  onEdit?: (plan: Plan) => void;
  onToggleActive?: (id: string, currentStatus: boolean) => void;
}

export function AdminPlanCard({
  plan,
  onEdit,
  onToggleActive,
}: AdminPlanCardProps) {
  // Helper to display "Unlimited" instead of -1
  const formatLimit = (val: number) => (val === -1 ? "Unlimited" : val);

  return (
    <Card
      className={`border-slate-200 shadow-sm ${
        !plan.isActive ? "opacity-70 bg-slate-50" : "bg-white"
      }`}
    >
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-slate-900">{plan.name}</h3>
          <p className="text-sm text-slate-500">
            {plan.durationInDays === 30
              ? "Monthly"
              : plan.durationInDays === 365
              ? "Yearly"
              : `${plan.durationInDays} Days`}
          </p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-emerald-600">
            {plan.currency === "BDT" ? "৳" : "$"}
            {plan.price}
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4 space-y-4">
        {/* Technical Limits Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-slate-50 p-2 rounded border border-slate-100">
            <span className="text-xs text-slate-500 uppercase font-semibold">
              Trips
            </span>
            <p className="font-medium text-slate-900">
              {formatLimit(plan.limits.maxTrips)}
            </p>
          </div>
          <div className="bg-slate-50 p-2 rounded border border-slate-100">
            <span className="text-xs text-slate-500 uppercase font-semibold">
              Requests
            </span>
            <p className="font-medium text-slate-900">
              {formatLimit(plan.limits.maxRequests)}
            </p>
          </div>
        </div>

        {/* Feature Toggles Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Shield className="w-4 h-4" /> Verified Badge
            </div>
            {plan.limits.isVerifiedBadge ? (
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-300" />
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <MessageSquare className="w-4 h-4" /> Chat Access
            </div>
            {plan.limits.canChat ? (
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-300" />
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t border-slate-100 pt-4 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <Switch
            checked={plan.isActive}
            // onCheckedChange={() => onToggleActive(plan.id, plan.isActive)}
          />
          <span className="text-xs font-medium text-slate-500">
            {plan.isActive ? "Active" : "Archived"}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          // onClick={() => onEdit(plan)}
          className="gap-2"
        >
          <Edit2 className="w-3 h-3" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
