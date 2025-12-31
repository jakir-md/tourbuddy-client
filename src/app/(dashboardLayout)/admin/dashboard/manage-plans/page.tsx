import { SubscriptionPlans } from "@/components/modules/admin/plans/SubscriptionPlans";
import { getAllSubscriptionPlans } from "@/services/admin/subscriptionPlans";
import { Suspense } from "react";

export default async function AdminSubscriptionPlansPage() {
  const allPlans = await getAllSubscriptionPlans();
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SubscriptionPlans allPlans={allPlans.data} />
      </Suspense>
    </div>
  );
}
