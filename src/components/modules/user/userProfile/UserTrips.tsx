"use client";
import { Card, CardContent } from "@/components/ui/card";
import TripCard from "./TripCard";

interface Trip {
  id: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  category: string;
  bannerImage: string;
  slug: string;
}


export default function UserTrips({ trips }: { trips: Trip[] }) {
  if (trips.length === 0) {
    return (
      <Card className="border-dashed shadow-none bg-slate-50">
        <CardContent className="p-8 text-center text-slate-500">
          This user hasn't posted any trips yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
