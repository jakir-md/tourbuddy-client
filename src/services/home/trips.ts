"use server";
import { serverFetch } from "@/lib/server-fetch";

export const getAllTrips = async (queryString?: string) => {
  try {
    const response = await serverFetch.get(
      `/trip/all-trips${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: ["all-trips"],
        },
      }
    );
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

export const getTrendingTrips = async () => {
  try {
    const response = await serverFetch.get(`/trip/trending-trips`, {
      next: { revalidate: 60 },
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("Error occured while fetching all trending trips", error);
    return {
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching trending trips",
    };
  }
};

export const getTripById = async (id: string) => {
  try {
    const response = await serverFetch.get(`/trip/${id}`, {
      next: { tags: [`trip-${id}`] },
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
