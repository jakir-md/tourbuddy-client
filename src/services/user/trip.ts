"use server";

import { serverFetch } from "@/lib/server-fetch";

export const createNewTrip = async () => {
  try {
    const response = await serverFetch.post("/trip/create", {

    });
  } catch (error: any) {
    console.log("Error occured creating new tour subscirption", error);
    return {
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching subscriptions",
    };
  }
};