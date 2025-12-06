"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getJoinRequestStatus = async (tripId: string) => {
  try {
    const response = await serverFetch.post("/join-request/status", {
      body: JSON.stringify({ tripId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("Error occured while fetching all trips", error);
    return {
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching subscriptions",
    };
  }
};

export const requestForJoining = async (tripId: string) => {
  try {
    const response = await serverFetch.post("/join-request/request", {
      body: JSON.stringify({ tripId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("Error occured while fetching all trips", error);
    return {
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching subscriptions",
    };
  }
};

export const acceptJoinRequest = async (tripId: string, userId: string) => {
  try {
    const response = await serverFetch.post("/join-request/accept", {
      body: JSON.stringify({ tripId, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
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

export const rejectJoinRequest = async (tripId: string, userId: string) => {
  try {
    const response = await serverFetch.post("/join-request/reject", {
      body: JSON.stringify({ tripId, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("Error occured while fetching all trips", error);
    return {
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching subscriptions",
    };
  }
};
