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
    console.log("rejected item", singleTripInfo);
    setRejectItem(singleTripInfo);
  };

  const handleConfirmReject = async (message?: string) => {
    try {
      const result = await updateApprovalStatus({
        approvalId: rejectItem?.id,
        message,
        status: "REJECTED",
      });

      if (result.success) {
        toast.success("Trip Rejected");
        setRejectItem(null);
        handleRefresh();
      }
    } catch (error) {
      console.log(error, "while rejecting trip");
      toast.error("Trip Rejection failed");
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
    </>
  );
}
