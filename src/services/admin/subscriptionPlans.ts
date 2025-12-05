"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { addSubscriptionPlanSchema } from "@/zod/plan.validation";
import { revalidateTag } from "next/cache";

export const addNewPlan = async (initialState: any, formData: FormData) => {
  const payload = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    currency: "BDT",
    durationInDays: formData.get("durationInDays"),
    maxTrips: formData.get("maxTrips"),
    maxRequests: formData.get("maxRequests"),
    isVerifiedBadge: formData.get("isVerifiedBadge") === "on",
    canChat: formData.get("canChat") === "on",
    isOverseas: formData.get("isOverseas") === "on",
  };

  const validatedPayload = zodValidator(payload, addSubscriptionPlanSchema);
  if (!validatedPayload.success) {
    return validatedPayload;
  }

  const backendPayload = {
    name: validatedPayload.data?.name,
    description: validatedPayload.data?.description,
    price: validatedPayload.data?.price,
    currency: validatedPayload.data?.currency,
    durationInDays: validatedPayload.data?.durationInDays,
    limits: {
      maxTrips: validatedPayload.data?.maxTrips,
      maxRequests: validatedPayload.data?.maxRequests,
      isVerifiedBadge: validatedPayload.data?.isVerifiedBadge,
      canChat: validatedPayload.data?.canChat,
      isOverseas: validatedPayload.data?.isOverseas,
    },
  };

  try {
    const response = await serverFetch.post("/subscription/create", {
      body: JSON.stringify(backendPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result.success) {
      revalidateTag("all-subscriptions", { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
      formData: validatedPayload,
    };
  }
};

export const getAllSubscriptionPlans = async () => {
  try {
    const response = await serverFetch.get("/subscription/all-plans", {
      cache: "force-cache",
      next: { tags: ["all-subscriptions"] },
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching subscriptions",
    };
  }
};
