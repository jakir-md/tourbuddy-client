"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getAnalytics = async () => {
  try {
    const response = await serverFetch.get("/trip/user-analytics");
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("Error while fetching analytics for user dashboard", error);
    return {
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Error while fetching analytics for user dashboard",
    };
  }
};

export const getUpcomingTrip = async () => {
  try {
    const response = await serverFetch.get("/trip/upcoming-trip");
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("Error while fetching upcoming trip", error);
    return {
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Error while fetching upcoming trip",
    };
  }
};