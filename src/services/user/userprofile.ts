"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getUserProfile = async (id: string) => {
  try {
    const response = await serverFetch.get(`/user/${id}`);
    return response.json();
  } catch (error) {
    console.log("User Profile retrival error");
  }
};

export const getUserReviews = async (id: string) => {
  try {
    const response = await serverFetch.get(`/trip/reviews/${id}`);
    return response.json();
  } catch (error) {
    console.log("User Profile retrival error");
  }
};

export const getReviewableTrips = async (id: string) => {
  try {
    const response = await serverFetch.get(`/trip/reviewable-trips/${id}`);
    return response.json();
  } catch (error) {
    console.log("User Profile retrival error");
  }
};
