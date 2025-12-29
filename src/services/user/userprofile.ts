"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export const getUserProfile = async (id: string) => {
  try {
    const response = await serverFetch.get(`/user/${id}`);
    return await response.json();
  } catch (error) {
    console.log("User Profile retrival error");
  }
};

export const getUserReviews = async (id: string) => {
  try {
    const response = await serverFetch.get(`/trip/reviews/${id}`, {
      next: {
        tags: ["profile-reviews"],
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("User Profile reviews retrival error");
  }
};

export const postUserReview = async (payload: any) => {
  try {
    const response = await serverFetch.post(`/trip/reviews`, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.success) {
      revalidateTag("profile-reviews", { expire: 0 });
    }
    return result;
  } catch (error) {
    console.log("User Profile review posting error");
  }
};

export const getReviewableTrips = async (id: string) => {
  try {
    const response = await serverFetch.get(`/trip/reviewable-trips/${id}`);
    return await response.json();
  } catch (error) {
    console.log("User Profile retrival error");
  }
};
