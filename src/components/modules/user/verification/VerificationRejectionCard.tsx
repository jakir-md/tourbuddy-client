import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  XCircle,
  AlertTriangle,
  RefreshCw,
  MessageSquareWarning,
} from "lucide-react";

interface RejectedCardProps {
  reason?: string; // The text written by the moderator
  onRetry: () => void; // Function to reopen the form
}

export default function VerificationRejectedCard({
  reason,
  onRetry,
}: RejectedCardProps) {
  return (
    <Card className="max-w-2xl md:mt-4 mx-auto py-10 px-4 border-none md:rounded-md rounded-none md:border-red-200 bg-red-50/30 overflow-hidden shadow-sm">
      {/* Header */}
      <CardHeader className="pb-3 border-b border-red-100 bg-red-50/60">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-full">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-slate-900">
              Verification Failed
            </CardTitle>
            <p className="text-xs text-red-600 font-semibold">
              Action Required
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-5 space-y-6">
        {/* The Moderator's Message */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <MessageSquareWarning className="w-4 h-4 text-amber-500" />
            Moderator Feedback:
          </div>

          <div className="bg-white p-4 rounded-lg border border-red-200 text-slate-700 text-sm leading-relaxed shadow-sm">
            {/* Fallback text if reason is empty */}
            {reason && reason ||
              "Your documents did not meet our clarity requirements. Please ensure all photos are readable and not blurry."}
          </div>
        </div>

        {/* The Help/Tips Section */}
        <div className="flex gap-3 items-start bg-red-100/50 p-3 rounded-md">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600">
            Common reasons include: Blurry text, face mismatch, or expired
            documents. Please check the feedback above and upload fresh copies.
          </p>
        </div>

        {/* Action Button */}
        <Button
          onClick={onRetry}
          className="w-full bg-red-600 hover:bg-red-700 text-white gap-2 h-11"
        >
          <RefreshCw className="w-4 h-4" />
          Re-submit Documents
        </Button>
      </CardContent>
    </Card>
  );
}
