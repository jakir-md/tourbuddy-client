import ExploreSearchFilters from "@/components/modules/explore/ExploreSearchFilter";
import { TripCard } from "@/components/modules/trip/TripCard";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatter";
import { getAllTrips } from "@/services/home/trips";
import { Suspense } from "react";

export const revalidate = 600;

const ExplorePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const [allTripsResponse] = await Promise.all([getAllTrips(queryString)]);

  const allTrips = allTripsResponse?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <p className="text-muted-foreground mt-2">Search all trips</p>
        </div>

        <ExploreSearchFilters />

        <Suspense fallback={<TableSkeleton columns={3} />}>
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-4">
            {allTrips.map((item: any) => (
              <TripCard key={item.id} tripInfo={item} />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default ExplorePage;
