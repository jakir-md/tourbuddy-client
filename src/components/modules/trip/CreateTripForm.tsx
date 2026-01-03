"use client";

import {
  useForm,
  FormProvider,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import ItineraryForm from "./ItineraryForm";
import { tripFormSchema, TripFormValues } from "@/zod/trip.validation";
import { BasicInfo } from "./BasicInfo";
import { DatePicker } from "./DatePicker";
import { useState } from "react";
import { uploadImage } from "@/services/fileUpload/imageUpload";
import { createNewTrip } from "@/services/user/trip";
import { toast } from "sonner";
import { getNewDate } from "@/lib/getNewDate";
import { useRouter } from "next/navigation";

export default function CreateTripForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const methods = useForm<TripFormValues>({
    // resolver: zodResolver(tripFormSchema),
    defaultValues: {
      title: "",
      destination: "",
      description: "",
      startDate: "",
      endDate: "",
      budget: "",
      category: "",
      itinerary: [],
    },
  });

  const onSubmit = async (data: TripFormValues) => {
    setIsSubmitting(true);
    try {
      const bannerImage = await uploadImage(data.bannerImage);
      const finalItinerary = data.itinerary;
      const uploadPromises = finalItinerary.map(
        async (day: any, dayIndex: number) => {
          const activityPromises = day.activities.map(
            async (activity: any, actIndex: number) => {
              if (activity.image instanceof File) {
                try {
                  const url = await uploadImage(activity.image);
                  finalItinerary[dayIndex].activities[actIndex].image = url;
                } catch (err) {
                  console.error("Failed to upload image for", activity.title);
                }
              }
              return;
            }
          );

          await Promise.all(activityPromises);
        }
      );
      await Promise.all(uploadPromises);
      const payload = {
        ...data,
        bannerImage,
        startDate: getNewDate(data.startDate, 0),
        endDate: getNewDate(data.endDate, 0),
        itinerary: finalItinerary,
      };

      const result = await createNewTrip(payload);
      if (result.success) {
        methods.reset();
        toast.success("Trip Published!");
        router.push(`/trip/${result.data.slug}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-2 md:px-8">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <BasicInfo />
          <DatePicker />
          <ItineraryForm />

          <Button type="submit" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting ? "Creating..." : "Create Trip"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
