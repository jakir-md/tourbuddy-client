// types/itinerary.ts

export type ActivityType = "visit" | "food" | "travel" | "stay";

export interface Activity {
  id: string; // Unique ID for dragging/dropping later
  time?: string; // "10:00 AM" (Optional)
  type: ActivityType; // Determines the icon (Fork, Camera, Bus)
  title: string; // "Starbucks Reserve"
  description?: string; // "Get the matcha latte."
  location?:string;
  image?: string; // URL to an image representing the activity
}

export interface ItineraryDay {
  day: number;
  date?: string; // "2025-10-12"
  title: string; // "Exploring Shibuya"
  activities: Activity[]; // <--- THE KEY CHANGE
}

export interface IUserAllTrips {
  trip: {
    title: string;
    slug: string;
    bannerImage: string;
  };
  id: string;
  approveStatus: string;
  message?: string;
}
