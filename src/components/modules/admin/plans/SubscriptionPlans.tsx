"use client";
import { useState } from "react";
import AddPlanModal from "./AddPlanModal";
import { AdminPlanCard, Plan } from "./AdminPlanCard";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";

export const SubscriptionPlans = ({ allPlans = [] }: { allPlans: any[] }) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Plan | null>();
  const handleOnToggleActive = (id: string, currStatus: boolean) => {};
  return (
    <div className="px-4 py-2">
      <ManagementPageHeader
        title="Plans"
        action={{ label: "Add New", onClick: () => setOpen(true) }}
      />
      <AddPlanModal open={open} setOpen={setOpen} />
      <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-4">
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
