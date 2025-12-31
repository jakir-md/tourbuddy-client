"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy, Download } from "lucide-react";
import { toast } from "sonner"; // Assuming you use Sonner or similar

interface PaymentSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  transactionId: string;
  onViewTicket?: () => void;
}

export default function PaymentSuccess({
  isOpen,
  onClose,
  amount,
  transactionId,
  onViewTicket,
}: PaymentSuccessProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(transactionId);
    toast.success("Transaction ID copied!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center p-2">
        {/* Animated Icon */}
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-100 animate-in zoom-in duration-300">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
        </div>

        <DialogHeader>
          <DialogTitle className="text-xl text-center text-slate-900">
            Payment Successful!
          </DialogTitle>
          <p className="text-sm text-center text-slate-500">
            Your Subscription Upgraded.
          </p>
        </DialogHeader>

        {/* Receipt Box */}
        <div className="my-4 py-2 rounded-lg border border-slate-100 bg-slate-50 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Amount Paid</span>
            <span className="font-bold text-slate-900 text-lg">
              ৳ {amount.toLocaleString()}
            </span>
          </div>

          <div className="h-px bg-slate-200 border-dashed" />

          <div className="text-sm">
            <span className="text-slate-500">Transaction ID</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-700">{transactionId}</span>
              <button
                onClick={copyToClipboard}
                className="text-slate-400 hover:text-slate-600"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Payment Date</span>
            <span className="text-slate-700">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {/* Actions */}
          <Button
            variant="outline"
            onClick={onClose}
            className="hover:cursor-pointer w-full"
          >
            Back To dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
