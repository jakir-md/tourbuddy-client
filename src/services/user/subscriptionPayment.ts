"use server";
import { serverFetch } from "@/lib/server-fetch";

export const upgradeSubscription = async (planId: string, amount: number) => {
  const payload = {
    planId,
    amount,
  };
  try {
    const response = await serverFetch.post(
      "/subscription/upgrade-subscription",
      {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("Error occured buying subscirption", error)
    return {
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching subscriptions",
    };
  }
};
