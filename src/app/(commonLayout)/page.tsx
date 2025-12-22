import BrowseCategories from "@/components/modules/home/Categories";
import HeroSection from "@/components/modules/home/HeroSection";
import TopDestinations from "@/components/modules/home/TopDestinations";
import TopTravelers from "@/components/modules/home/TopTravelers";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";
import { TripCard } from "@/components/modules/trip/TripCard";
import { getAllTrips } from "@/services/home/trips";

export default async function page() {
  const trips = await getAllTrips();
  return (
    <>
      <HeroSection />
      <TopDestinations />
      <BrowseCategories />
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-4">
        {trips?.data.map((item: any) => (
          <TripCard key={item.id} tripInfo={item} />
        ))}
      </div>
      <TopTravelers />
      <WhyChooseUs />
    </>
  );
}
