"use client";

import { ManagementTable } from "@/components/shared/MangementTable";
import { toast } from "sonner";
import { updateApprovalStatus } from "@/services/moderator/tripApproval";
import { useState, useTransition } from "react";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import {
  VerificationApprovalColumn,
  VerificationApproveInfo,
} from "./VerificationApprovalColumn";
import VerificationDetailsModal from "./VerificationViewDetails";
import AcceptConfirmationDialog from "@/components/shared/AcceptConfirmation";
import { updateVerifyRequests } from "@/services/auth/verifyUserProfile";

export function VerificationApprovalTable({
  verificationInfo,
}: {
  verificationInfo: VerificationApproveInfo[];
}) {
  const [acceptItem, setAcceptItem] = useState<VerificationApproveInfo | null>(
    null
  );
  const [rejectItem, setRejectItem] = useState<VerificationApproveInfo | null>(
    null
  );
  const [viewItem, setViewItem] = useState<VerificationApproveInfo | null>(
    null
  );

  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleAccept = (singleTripInfo: VerificationApproveInfo) => {
    setAcceptItem(singleTripInfo);
  };

  const handleView = (singleTripInfo: VerificationApproveInfo) => {
    setViewItem(singleTripInfo);
  };

  const handleReject = (singleTripInfo: VerificationApproveInfo) => {
    setRejectItem(singleTripInfo);
  };

  const handleConfirmReject = async (message?: string) => {
    console.log("rejected item", rejectItem, message);
    try {
      const result = await updateVerifyRequests(
        rejectItem?.id as string,
        "REJECTED",
        message
      );

      if (result.success) {
        toast.success("Verification Rejected");
        setRejectItem(null);
        handleRefresh();
      }
    } catch (error: any) {
      console.log(error, "while rejecting verfication");
      toast.error(error?.message);
    }
  };

  const handleConfirmAccept = async () => {
    try {
      const result = await updateVerifyRequests(
        acceptItem?.id as string,
        "APPROVED"
      );

      if (result.success) {
        toast.success("Profile Approved");
        setAcceptItem(null);
        handleRefresh();
      }
    } catch (error) {
      console.log(error, "while accepting profile");
      toast.error("Profile Approvement failed");
    }
  };

  return (
    <>
      <ManagementTable
        data={verificationInfo}
        onAccept={handleAccept}
        onReject={handleReject}
        onView={handleView}
        columns={VerificationApprovalColumn}
        getRowKey={(info) => info.id!}
      />

      <DeleteConfirmationDialog
        onConfirm={handleConfirmReject}
        onOpenChange={(open) => !open && setRejectItem(null)}
        open={!!rejectItem}
        itemName={rejectItem?.user.name}
      />

      <VerificationDetailsModal
        data={viewItem as VerificationApproveInfo}
        onClose={(open) => !open && setViewItem(null)}
        open={!!viewItem}
      />

      <AcceptConfirmationDialog
        onConfirm={handleConfirmAccept}
        onOpenChange={(open) => !open && setAcceptItem(null)}
        open={!!acceptItem}
        itemName={acceptItem?.user?.name}
      />
    </>
  );
}
