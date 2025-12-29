"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, Facebook, FileText, UserCheck } from "lucide-react";
import Link from "next/link";
import { VerificationApproveInfo } from "./VerificationApprovalColumn";

interface VerificationModalProps {
  data: VerificationApproveInfo;
  onClose: (open: boolean) => void;
  open: boolean;
}

export default function VerificationDetailsModal({
  onClose,
  open,
  data,
}: VerificationModalProps) {
  return (
    <>
      {data && (
        <Dialog open={open} onOpenChange={onClose}>
          {/* 3. The Modal Content */}
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-blue-600" />
                Identity Verification Evidence
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              {/* SECTION A: THE CRITICAL CHECK (Face Match) */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500 border-b pb-1">
                  Step 1: Face Match Check
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ImageCard
                    title="Live Selfie"
                    src={data?.selfieImage}
                    badge="Live Capture"
                  />
                  <ImageCard
                    title="NID (Front)"
                    src={data?.nidFront}
                    badge="Document"
                  />
                </div>
              </div>

              {/* SECTION B: ADDRESS & BACKING INFO */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500 border-b pb-1">
                  Step 2: Address & Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ImageCard title="NID (Back)" src={data?.nidBack} />
                  <ImageCard title="Utility Bill" src={data?.utilityBill} />
                </div>
              </div>

              {/* SECTION C: SOCIAL PROOF */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500 border-b pb-1">
                  Step 3: Social Presence
                </h3>
                <div className="grid  gap-4">
                  {/* Profile Link */}
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                        <Facebook className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Personal Profile</p>
                        <p className="text-xs text-slate-500 truncate max-w-[200px]">
                          {data?.facebookProfileLink}
                        </p>
                      </div>
                    </div>
                    {data?.facebookProfileLink && (
                      <Button asChild size="sm" variant="outline">
                        <Link href={data?.facebookProfileLink} target="_blank">
                          Visit <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    )}
                  </div>

                  {/* Page Link (Optional) */}
                  {data?.fbPageLink && (
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Business Page</p>
                          <p className="text-xs text-slate-500 truncate max-w-[200px]">
                            {data?.fbPageLink}
                          </p>
                        </div>
                      </div>
                      {data?.fbPageLink && (
                        <Button asChild size="sm" variant="outline">
                          <Link href={data?.fbPageLink} target="_blank">
                            Visit <ExternalLink className="w-3 h-3 ml-2" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

function ImageCard({
  title,
  src,
  badge,
}: {
  title: string;
  src: string;
  badge?: string;
}) {
  return (
    <div className="border rounded-lg overflow-hidden bg-slate-50 group">
      <div className="p-3 border-b bg-white flex justify-between items-center">
        <span className="font-medium text-sm">{title}</span>
        {badge && (
          <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <div className="relative aspect-video bg-slate-200 cursor-zoom-in">
        <Link href={src} target="_blank">
          <img
            src={src}
            alt={title}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
          />
          {/* Overlay hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
              Click to Open Full Size
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
