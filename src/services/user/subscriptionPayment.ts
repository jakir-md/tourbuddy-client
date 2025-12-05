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
    console.log("purchase subc before")
    const result = await response.json();
    console.log("purchase subc after")
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
