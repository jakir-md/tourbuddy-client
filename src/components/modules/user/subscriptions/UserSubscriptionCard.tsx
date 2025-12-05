"use client";
import { Check, Loader2, Sparkles, Crown } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { upgradeSubscription } from "@/services/user/subscriptionPayment";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  durationInDays: number;
  limits: {
    maxTrips: number;
    maxRequests: number;
    isVerifiedBadge: boolean;
    canChat: boolean;
  };
}

interface UserPlanCardProps {
  plan: Plan;
  currentPlanId?: string; // ID of the plan the user currently has
  onSubscribe?: (planId: string, amount: number) => void;
  isProcessing: boolean;
  isPopular?: boolean; // To highlight the best plan
}

export function UserSubscriptionCard({
  plan,
  currentPlanId,
  isProcessing,
  isPopular = false,
}: UserPlanCardProps) {
  const handleSubscribe = async (planId: string, amount: number) => {
    const result = await upgradeSubscription(planId, amount);
    if (result.success) {
      window.location.href = result.data.paymentURL;
    }
  };
  const isCurrent = currentPlanId === plan.id;
  const formatLimit = (val: number) => (val === -1 ? "Unlimited" : val);

  return (
    <Card
      className={`relative flex flex-col h-full transition-all duration-300 ${
        isPopular
          ? "border-amber-400 shadow-xl scale-105 z-10"
          : "border-slate-200 hover:border-slate-300 hover:shadow-lg"
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-3 py-1 shadow-md">
            <Sparkles className="w-3 h-3 mr-1 fill-white" /> Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-2">
        <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
        <div className="flex items-baseline justify-center gap-1 mt-2">
          <span className="text-3xl font-extrabold text-slate-900">
            {plan.currency === "BDT" ? "৳" : "$"}
            {plan.price}
          </span>
          <span className="text-slate-500 text-sm">
            /{" "}
            {plan.durationInDays === 30
              ? "mo"
              : plan.durationInDays === 365
              ? "yr"
              : `${plan.durationInDays} days`}
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-2 px-4">{plan.description}</p>
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="space-y-3 mt-4">
          <FeatureItem
            text={`${formatLimit(plan.limits.maxTrips)} Active Trips`}
          />
          <FeatureItem
            text={`${formatLimit(plan.limits.maxRequests)} Join Requests / day`}
          />

          {plan.limits.canChat ? (
            <FeatureItem text="Unlimited Chat Access" highlighted />
          ) : (
            <FeatureItem text="No Chat Access" disabled />
          )}

          {plan.limits.isVerifiedBadge && (
            <FeatureItem text="Gold Verified Badge" icon={Crown} highlighted />
          )}
        </ul>
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          className={`w-full font-bold ${
            isPopular ? "bg-amber-500 hover:bg-amber-600" : ""
          }`}
          variant={isCurrent ? "outline" : "default"}
          disabled={isCurrent || isProcessing}
          onClick={() => handleSubscribe(plan.id, plan.price)}
        >
          {isProcessing ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : isCurrent ? (
            "Current Plan"
          ) : (
            "Upgrade Now"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Helper Sub-component
function FeatureItem({
  text,
  disabled = false,
  highlighted = false,
  icon: Icon = Check,
}: {
  text: string;
  disabled?: boolean;
  highlighted?: boolean;
  icon?: any;
}) {
  return (
    <li
      className={`flex items-center gap-3 text-sm ${
        disabled
          ? "text-slate-400 line-through decoration-slate-300"
          : "text-slate-700"
      }`}
    >
      <div
        className={`
        flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center 
        ${
          disabled
            ? "bg-slate-100"
            : highlighted
            ? "bg-amber-100 text-amber-600"
            : "bg-emerald-100 text-emerald-600"
        }
      `}
      >
        <Icon className="w-3 h-3" />
      </div>
      <span className={highlighted ? "font-medium text-slate-900" : ""}>
        {text}
      </span>
    </li>
  );
}
