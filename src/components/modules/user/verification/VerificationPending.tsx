import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, UserCheck, ShieldAlert, Loader2 } from "lucide-react";

export default function VerificationPendingCard() {
  return (
    <Card className="max-w-2xl md:mt-4 mt-0 mx-auto py-10 px-4 rounded-none md:rounded-md border-0 md:border-amber-200 bg-amber-50/40 overflow-hidden">
      {/* Header */}
      <CardHeader className="pb-3 border-b border-amber-100 bg-amber-50/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2.5 rounded-full animate-pulse">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">
                Verification in Progress
              </CardTitle>
              <p className="text-xs text-slate-500 font-medium">
                Submitted on Dec 25, 2025
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-amber-500 text-amber-700 bg-amber-50 gap-1.5 pl-2"
          >
            <Loader2 className="w-3 h-3 animate-spin" />
            Under Review
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-5 space-y-5">
        {/* The Message */}
        <div className="bg-white/60 p-3 rounded-lg border border-amber-100/50 text-sm text-slate-600 leading-relaxed">
          <p>
            Thanks for submitting your documents! Our team is currently
            reviewing your identity proofs to ensure the safety of the
            TravelBuddy community.
          </p>
        </div>

        {/* The Timeline Steps */}
        <div className="space-y-0">
          <StepItem
            icon={FileText}
            title="Documents Uploaded"
            status="completed"
            time="Done"
          />

          <div className="ml-3.5 pl-4 border-l-2 border-amber-200 py-3 space-y-1">
            {/* Connector Line Space */}
          </div>

          <StepItem
            icon={UserCheck}
            title="Admin Review"
            status="current"
            time="Est. 2-4 Hours"
          />

          <div className="ml-3.5 pl-4 border-l-2 border-slate-100 py-3 space-y-1">
            {/* Connector Line Space */}
          </div>

          <StepItem
            icon={ShieldAlert}
            title="Final Approval"
            status="pending"
            time="-"
          />
        </div>

        {/* Footer Note */}
        <p className="text-xs text-center text-slate-400">
          Need to change something?{" "}
          <a href="#" className="underline hover:text-amber-600">
            Contact Support
          </a>
        </p>
      </CardContent>
    </Card>
  );
}

// Helper for the Timeline Steps
function StepItem({
  icon: Icon,
  title,
  status,
  time,
}: {
  icon: any;
  title: string;
  status: "completed" | "current" | "pending";
  time: string;
}) {
  const colors = {
    completed: "bg-green-100 text-green-700 border-green-200",
    current:
      "bg-amber-100 text-amber-700 border-amber-200 shadow-sm ring-2 ring-amber-50",
    pending: "bg-slate-100 text-slate-400 border-slate-200",
  };

  const textColors = {
    completed: "text-slate-900 line-through opacity-70",
    current: "text-slate-900 font-bold",
    pending: "text-slate-400",
  };

  return (
    <div className="flex items-center gap-3 relative">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center border z-10 shrink-0 ${colors[status]}`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 flex justify-between items-center">
        <span className={`text-sm ${textColors[status]}`}>{title}</span>
        <span className="text-xs text-slate-400 font-mono">{time}</span>
      </div>
    </div>
  );
}
