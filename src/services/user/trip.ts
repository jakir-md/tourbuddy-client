"use server";

import { serverFetch } from "@/lib/server-fetch";

export const createNewTrip = async (data: FormData) => {
  try {
    const response = await serverFetch.post("/trip/create", {
      body: data,
    });

    const result = await response.json();
    console.log("result in creating new trip", result);
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
