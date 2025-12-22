// schemas/tripSchema.ts
import { z } from "zod";

// 1. The Smallest Unit: Activity
const activitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["visit", "food", "travel", "stay"]),
  time: z.string().optional(), // "10:00 AM"
  description: z.string().optional(),
  // For file uploads, we just validate it exists as a File or String (URL)
  image: z.any().optional(),
});

// 2. The Container: Day
const daySchema = z.object({
  day: z.number(),
  date: z.string(),
  title: z.string().min(1, "Day title is required"), // e.g., "Arrival in Sylhet"
  activities: z.array(activitySchema),
});

// 3. The Full Form
export const tripFormSchema = z.object({
  title: z.string().min(5),
  destination: z.string().min(2),
  startPoint: z.string(),
  bannerImage: z.instanceof(File),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.string(),
  category: z.string(),
  description: z.string(),
  itinerary: z.array(daySchema),
});

// Export the type for TypeScript
export type TripFormValues = z.infer<typeof tripFormSchema>;
