"use client";

import React, { useState } from "react";
import {
  Star,
  MessageSquarePlus,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { postUserReview } from "@/services/user/userprofile";

// 1. Type Definitions
interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  tripName?: string;
  author: {
    name: string;
    profilePhoto?: string | null;
  };
  trip: {
    title: string;
  };
}

interface SharedTrip {
  trip: {
    id: string;
    title: string;
    startDate: Date;
  };
}

interface ReviewsSectionProps {
  reviews: Review[];
  currentUser?: { id: string; name: string } | null;
  targetUserId: string;
  sharedTrips: SharedTrip[];
}

export default function ReviewsSection({
  reviews,
  currentUser,
  targetUserId,
  sharedTrips,
}: ReviewsSectionProps) {
  // Logic: Can only review if you are logged in AND not viewing your own profile
  const canReview = currentUser && currentUser.id !== targetUserId;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          Reviews{" "}
          <span className="text-sm font-normal text-slate-500">
            ({reviews.length})
          </span>
        </h3>
      </div>

      {/* 1. INLINE REVIEW FORM (Conditionally Rendered) */}
      {canReview && (
        <WriteReviewCard sharedTrips={sharedTrips} targetId={targetUserId} />
      )}

      {/* 2. REVIEWS LIST */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p className="text-slate-500">No reviews yet.</p>
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Sub-Component: The Inline "Write Review" Card
// ---------------------------------------------------------
function WriteReviewCard({
  sharedTrips,
  targetId,
}: {
  sharedTrips: SharedTrip[];
  targetId: string;
}) {
  const [selectedTrip, setSelectedTrip] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrip || rating === 0) return;

    setIsSubmitting(true);

    const reviewData = { tripId: selectedTrip, rating, comment, targetId };
    const result = await postUserReview(reviewData);

    if (result.success) {
      setIsSuccess(true);
    }
    setIsSubmitting(false);
  };

  const formatDate = (d: Date) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  if (isSuccess) {
    return (
      <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800">
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        <AlertTitle>Review Posted!</AlertTitle>
        <AlertDescription>
          Thank you for sharing your experience. Your review is now live.
        </AlertDescription>
      </Alert>
    );
  }

  // CASE A: User matches logic but has NO shared trips
  if (sharedTrips.length === 0) {
    return (
      <Alert
        variant="destructive"
        className="bg-red-50 border-red-100 text-red-900"
      >
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertTitle>Review Unavailable</AlertTitle>
        <AlertDescription>
          To ensure authenticity, you can only review travelers you have
          completed a trip with. We couldn't find any shared trips between you
          and this user.
        </AlertDescription>
      </Alert>
    );
  }

  // CASE B: User can review (Form)
  return (
    <Card className="border-emerald-100 shadow-sm bg-slate-50/50">
      <CardHeader className="pb-3 border-b border-slate-100 bg-white rounded-t-xl">
        <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
          <MessageSquarePlus className="w-4 h-4 text-emerald-600" />
          Rate your experience
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="">
            {/* 1. Trip Selector */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-slate-500">
                Trip Context
              </Label>
              <Select onValueChange={setSelectedTrip} required>
                <SelectTrigger className="bg-white w-full">
                  <SelectValue placeholder="Select the trip you took together..." />
                </SelectTrigger>
                <SelectContent>
                  {sharedTrips.map((item) => (
                    <SelectItem key={item.trip.id} value={item.trip.id}>
                      {item.trip.title} ({formatDate(item.trip.startDate)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-slate-500">
                Rating
              </Label>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="focus:outline-none transition-transform hover:scale-110"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRating || rating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-600">
                  {rating === 5
                    ? "Excellent"
                    : rating === 4
                    ? "Very Good"
                    : rating === 3
                    ? "Average"
                    : rating > 0
                    ? "Poor"
                    : ""}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase text-slate-500">
              Your Review
            </Label>
            <Textarea
              placeholder="What was it like traveling with them? (e.g., punctuality, communication, vibe)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] bg-white resize-none"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !selectedTrip || rating === 0}
              className="bg-emerald-600 hover:bg-emerald-700 w-full md:w-auto"
            >
              {isSubmitting ? "Posting..." : "Post Review"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------
// Sub-Component: Individual Review Card
// ---------------------------------------------------------
function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="px-2 py-0 border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-slate-100">
              <AvatarImage src={review.author.profilePhoto || ""} />
              <AvatarFallback>{review.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {review.author.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                {review.trip.title && (
                  <>
                    <span>•</span>
                    <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-medium">
                      Trip: {review.trip.title}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? "text-amber-400 fill-amber-400"
                    : "text-slate-200"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed">
          "{review.comment}"
        </p>
      </CardContent>
    </Card>
  );
}
