"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircle, RefreshCw, HelpCircle, Copy } from "lucide-react";
import { toast } from "sonner";

interface PaymentFailedProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  transactionId: string; // Failed tx often still have IDs for tracing
  onRetry?: () => void;
}

export default function PaymentFailed({
  isOpen,
  onClose,
  amount,
  transactionId,
  onRetry,
}: PaymentFailedProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(transactionId);
    toast.success("Transaction ID copied for support.");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center px-2 py-2">
        {/* Error Icon */}
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-5 w-5 text-red-600" />
        </div>

        <DialogHeader>
          <DialogTitle className="text-xl text-center text-slate-900">
            Payment Failed
          </DialogTitle>
          <p className="text-sm text-center text-slate-500">
            We couldn't process your payment. Don't worry, no money was deducted
            from your account.
          </p>
        </DialogHeader>

        {/* Error Details Box */}
        <div className="my-4 rounded-lg border border-red-100 bg-red-50 p-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Attempted Amount</span>
            <span className="font-bold text-slate-900">
              ৳ {amount.toLocaleString()}
            </span>
          </div>

          <div className=" text-sm">
            <span className="text-slate-500">Reference ID</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-700 text-xs">
                {transactionId}
              </span>
              <button
                onClick={copyToClipboard}
                className="text-slate-400 hover:text-slate-600"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="bg-white p-2 rounded border border-red-100 text-xs text-red-600 font-medium">
            Error: Gateway Timeout or Insufficient Funds
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full text-slate-500"
          >
            Back To dashboard
          </Button>
        </DialogFooter>

        <div className="mt-2 text-center">
          <button className="text-xs text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1 mx-auto">
            <HelpCircle className="w-3 h-3" /> Report Issue to Support
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
