"use client";
import { useState } from "react";
import AddPlanModal from "./AddPlanModal";
import { AdminPlanCard, Plan } from "./AdminPlanCard";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";

export const SubscriptionPlans = ({ allPlans = [] }: { allPlans: any[] }) => {
  const [open, setOpen] = useState(false);
  // const planData = {
  //   id: "plan-free-001",
  //   name: "Explorer Starter",
  //   description:
  //     "Perfect for new travelers who want to try out the platform locally.",
  //   price: 0,
  //   currency: "BDT",
  //   durationInDays: 30, // Monthly cycle
  //   isActive: true,
  //   limits: {
  //     maxTrips: 1, // Can only have 1 active trip
  //     maxRequests: 3, // Can only send 3 join requests per day
  //     isVerifiedBadge: false, // No Gold Badge
  //     canChat: false, // Cannot message others directly
  //     isOverseas: false, // Domestic trips only
  //   },
  // };
  const [edit, setEdit] = useState<Plan | null>();
  const handleOnToggleActive = (id: string, currStatus: boolean) => {};
  return (
    <div>
      <ManagementPageHeader
        title="Subscriptions"
        action={{ label: "Add New Plan", onClick: () => setOpen(true) }}
      />
      <AddPlanModal open={open} setOpen={setOpen} />
      <div className="mt-5 grid grid-cols-3 gap-4">
        {allPlans.length >0 && allPlans?.map((plan, index) => (
          <AdminPlanCard
            key={index}
            plan={plan}
            onEdit={setEdit}
            onToggleActive={handleOnToggleActive}
          />
        ))}
      </div>
    </div>
  );
};
