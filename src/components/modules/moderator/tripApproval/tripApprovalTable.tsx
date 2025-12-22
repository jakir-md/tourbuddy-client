"use client";

import { ManagementTable } from "@/components/shared/MangementTable";
import { ITripApprovalInfo } from "@/types/tripApproval.interface";
import { toast } from "sonner";
import { tripApprovalColumn } from "./tripApprovalColumn";
import { updateApprovalStatus } from "@/services/moderator/tripApproval";
import { useState, useTransition } from "react";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";

export function TripApprovalTable({
  tripInfo,
}: {
  tripInfo: ITripApprovalInfo[];
}) {
  const [acceptItem, setAcceptItem] = useState<ITripApprovalInfo | null>(null);
  const [rejectItem, setRejectItem] = useState<ITripApprovalInfo | null>(null);
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleAccept = (singleTripInfo: ITripApprovalInfo) => {
    setAcceptItem(singleTripInfo);
  };

  const handleReject = (singleTripInfo: ITripApprovalInfo) => {
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
        data={tripInfo}
        onAccept={handleAccept}
        onReject={handleReject}
        columns={tripApprovalColumn}
        getRowKey={(tripInfo) => tripInfo.id!}
      />

      <DeleteConfirmationDialog
        onConfirm={handleConfirmReject}
        onOpenChange={(open) => !open && setRejectItem(null)}
        open={!!rejectItem}
        itemName={rejectItem?.trip.title}
      />
    </>
  );
}
