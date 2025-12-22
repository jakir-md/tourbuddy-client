"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export const updateApprovalStatus = async (payload: any) => {
  console.log("payload for update", payload);
  try {
    const response = await serverFetch.post("/trip/update-status", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("trip-approvals", { expire: 0 });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("Error while accepting join request", error);
    return {
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went while accepting join request",
    };
  }
};

export const fetchAllApprovals = async () => {
  try {
    const response = await serverFetch.get("/trip/pending-approvals", {
      cache: "no-store",
      next: { tags: ["trip-approvals"] },
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("Error occured while fetching all trips approvals", error);
    return {
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching trip approvals",
    };
  }
};
