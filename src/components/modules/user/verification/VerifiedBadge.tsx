import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  CheckCircle2,
  User,
  Phone,
  Mail,
  Facebook,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function VerifiedProfileBadge() {
  // In a real app, pass these as props
  const verificationDate = "Dec 2025";

  return (
    <Card className="border-green-100 bg-green-50/30 overflow-hidden">
      <CardHeader className="pb-3 border-b border-green-100 bg-green-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-full">
              <ShieldCheck className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">
                Identity Verified
              </CardTitle>
              <p className="text-xs text-slate-500 font-medium">
                Verified since {verificationDate}
              </p>
            </div>
          </div>
          <Badge className="bg-green-600 hover:bg-green-700 gap-1 pl-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Trusted Host
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-4 grid gap-3">
        <p className="text-sm text-slate-600 mb-1">
          TravelBuddy has performed a background check on this host.
        </p>

        {/* The Verification Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <VerificationItem
            icon={User}
            label="Government ID"
            sub="National Identity Card"
          />

          <VerificationItem
            icon={Phone}
            label="Phone Number"
            sub="Verified via OTP"
          />

          <VerificationItem
            icon={Mail}
            label="Email Address"
            sub="Verified via Link"
          />

          <VerificationItem
            icon={Facebook}
            label="Social Account"
            sub="Facebook Connected"
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Sub-component for individual items
function VerificationItem({
  icon: Icon,
  label,
  sub,
}: {
  icon: any;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/60 transition-colors">
      <div className="mt-0.5">
        <Icon className="w-4 h-4 text-slate-400" />
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-slate-700">{label}</span>
          <CheckCircle2 className="w-3 h-3 text-green-600" />
        </div>
        <p className="text-xs text-slate-500">{sub}</p>
      </div>
    </div>
  );
}
