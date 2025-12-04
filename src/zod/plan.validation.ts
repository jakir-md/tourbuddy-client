import z from "zod";
export const addSubscriptionPlanSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Plan name must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.coerce
      .number({ message: "Price is required" })
      .min(0, { message: "Price cannot be negative" })
  ),
  durationInDays: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1 day" }),

  maxTrips: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.coerce
      .number({ message: "Max Trips is required" })
      .min(1, { message: "Use -1 for unlimited" })
  ),
  maxRequests: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.coerce
      .number({ message: "Max Trips is required" })
      .min(1, { message: "Use -1 for unlimited" })
  ),
  isVerifiedBadge: z.boolean().default(false),
  canChat: z.boolean().default(false),
  isOverseas: z.boolean({ message: "This field required" }),
});
