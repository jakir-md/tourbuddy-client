import BrowseCategories from "@/components/modules/home/Categories";
import HeroSection from "@/components/modules/home/HeroSection";
import TopDestinations from "@/components/modules/home/TopDestinations";
import TopTravelers from "@/components/modules/home/TopTravelers";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";
import { TripCard } from "@/components/modules/trip/TripCard";
import { getTrendingTrips } from "@/services/home/trips";
import { Suspense } from "react";

export default async function page() {
  const trips = await getTrendingTrips();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
        <TopDestinations />
        <BrowseCategories />
        <div className="">
          <div className="container px-4 mx-auto grid md:grid-cols-3 gap-4">
            {trips?.data.map((item: any) => (
              <TripCard key={item.id} tripInfo={item} />
            ))}
          </div>
        </div>
        <TopTravelers />;
        <WhyChooseUs />
      </Suspense>
    </>
  );
}
