import { SubscriptionPlans } from "@/components/modules/admin/plans/SubscriptionPlans";
import { getAllSubscriptionPlans } from "@/services/admin/subscriptionPlans";

export default async function AdminSubscriptionPlansPage() {
  const allPlans = await getAllSubscriptionPlans();
  return (
    <div>
      <SubscriptionPlans allPlans={allPlans.data} />
    </div>
  );
}
