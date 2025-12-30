"use client";

import { ManagementTable } from "@/components/shared/MangementTable";
import { joinRequestColumn } from "./joinRequestColumn";
import { acceptJoinRequest } from "@/services/joinRequest/joinRequest";
import { toast } from "sonner";
import { IJoinRequest } from "@/types/joinRequest.interface";

export function JoinRequestTable({ requests }: { requests: IJoinRequest[] }) {
  const handleAccept = async (
    tripId: string | undefined,
    userId: string | undefined
  ) => {
    try {
      const result = await acceptJoinRequest(
        tripId as string,
        userId as string
      );
      if (result.success) {
        toast.success("Join Request Accepted.");
      }
    } catch (error) {
      toast.success("Join Request Rejected.");
    }
  };
  
  const handleReject = async (
    tripId: string | undefined,
    userId: string | undefined
  ) => {};
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
    </>
  );
}
