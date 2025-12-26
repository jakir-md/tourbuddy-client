/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export const verifyUserProfile = async (data: any) => {
  try {
    const response = await serverFetch.post("/user/verify", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result.success) {
      revalidateTag("profile-verification", { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.log("Error occured while fetching all trips", error);
    return {
      success: false,
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching subscriptions",
    };
  }
};

export const getVerifyStatus = async () => {
  try {
    const response = await serverFetch.get("/user/verification-status", {
      cache: "force-cache",
      next: {
        tags: ["profile-verification"],
      },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("Error occured while fetching all trips", error);
    return {
      success: false,
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching subscriptions",
    };
  }
};

export const getAllVerifyRequests = async () => {
  try {
    const response = await serverFetch.get("/user/verify-requests", {
      cache: "force-cache",
      next: {
        tags: ["all-verification-requests"],
      },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(
      "Error occured while fetching all verification requests.",
      error
    );
    return {
      success: false,
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching subscriptions",
    };
  }
};

export const updateVerifyRequests = async (id: string, status: string) => {
  try {
    const response = await serverFetch.patch("/user/verify-request", {
      body: JSON.stringify({ id, status }),
    });

    const result = await response.json();
    if (result.success) {
      revalidateTag("all-verification-requests", { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.log(
      "Error occured while fetching all verification requests.",
      error
    );
    return {
      success: false,
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching subscriptions",
    };
  }
};
