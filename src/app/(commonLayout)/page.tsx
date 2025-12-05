import BrowseCategories from "@/components/modules/home/Categories";
import HeroSection from "@/components/modules/home/HeroSection";
import TopDestinations from "@/components/modules/home/TopDestinations";
import TopTravelers from "@/components/modules/home/TopTravelers";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";
import { TripCard } from "@/components/modules/trip/TripCard";
const demoTrip = {
  id: "trip-123",
  destination: "Santorini, Greece",
  startDate: new Date("2025-06-15"),
  endDate: new Date("2025-06-22"),
  budget: 1200,
  type: "Leisure",
  image:
    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
  host: {
    name: "Sarah Jenkins",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    isVerified: true,
  },
};

export default function page() {
  return (
    <>
      <HeroSection />
      <TopDestinations />
      <BrowseCategories />
      <TopTravelers />
      <WhyChooseUs />
      <TripCard trip={demoTrip} />
    </>
  );
}
