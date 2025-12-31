"use client";

import { ManagementTable } from "@/components/shared/MangementTable";
import { joinRequestColumn } from "./joinRequestColumn";
import {
  acceptJoinRequest,
  rejectJoinRequest,
} from "@/services/joinRequest/joinRequest";
import { toast } from "sonner";
import { IJoinRequest } from "@/types/joinRequest.interface";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import AcceptConfirmationDialog from "@/components/shared/AcceptConfirmation";

export function JoinRequestTable({ requests }: { requests: IJoinRequest[] }) {
  const [acceptItem, setAcceptItem] = useState<IJoinRequest | null>(null);
  const [rejectItem, setRejectItem] = useState<IJoinRequest | null>(null);
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleAccept = (singleTripInfo: IJoinRequest) => {
    setAcceptItem(singleTripInfo);
  };

  const handleReject = (singleTripInfo: IJoinRequest) => {
    setRejectItem(singleTripInfo);
  };

  const handleConfirmReject = async (message?: string) => {
    try {
      const result = await rejectJoinRequest(
        rejectItem?.trip.id as string,
        rejectItem?.attendee.id as string
      );

      if (result.success) {
        toast.success("Join Request Rejected");
        setRejectItem(null);
        handleRefresh();
      } else {
        toast.error("Request Already Updated.");
      }
    } catch (error) {
      console.log(error, "while rejecting trip");
      toast.error("Trip Rejection failed");
    }
  };

  const handleConfirmAccept = async () => {
    try {
      const result = await acceptJoinRequest(
        acceptItem?.trip.id as string,
        acceptItem?.attendee.id as string
      );

      if (result.success) {
        toast.success("Join Request Approved");
        setAcceptItem(null);
        handleRefresh();
      } else {
        toast.error("Request Already Updated.");
      }
    } catch (error) {
      console.log(error, "while accepting join request");
      toast.error("Accepting join request failed");
    }
  };
  return (
    <>
      <ManagementTable
        data={requests}
        onAccept={handleAccept}
        onReject={handleReject}
        columns={joinRequestColumn}
        getRowKey={(joinRequest) => joinRequest.id!}
        emptyMessage="No Records Found"
      />

      <DeleteConfirmationDialog
        onConfirm={handleConfirmReject}
        onOpenChange={(open) => !open && setRejectItem(null)}
        open={!!rejectItem}
        itemName={rejectItem?.trip.title}
      />

      <AcceptConfirmationDialog
        onConfirm={handleConfirmAccept}
        onOpenChange={(open) => !open && setAcceptItem(null)}
        open={!!acceptItem}
        itemName={acceptItem?.trip.title}
      />
    </>
  );
}
