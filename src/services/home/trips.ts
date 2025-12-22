"use server";
import { serverFetch } from "@/lib/server-fetch";

export const getAllTrips = async (queryString?: string) => {
  try {
    const response = await serverFetch.get(
      `/trip/all-trips${queryString ? `?${queryString}` : ""}`,
      {
        cache: "no-store",
      }
    );
    const result = await response.json();
    console.log("all trips from server", result);
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

export const getTripById = async (id: string) => {
  try {
    const response = await serverFetch.get(`/trip/${id}`);
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