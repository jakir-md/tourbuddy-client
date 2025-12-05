import { UserSubscriptionCard } from "@/components/modules/user/subscriptions/UserSubscriptionCard";
import { getAllSubscriptionPlans } from "@/services/admin/subscriptionPlans";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function UserSubscriptionPlansPage() {
  const userInfo = await getUserInfo();
  const allPlans = await getAllSubscriptionPlans();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto p-6 items-center">
      {allPlans.data.length > 0 &&
        allPlans.data.map((plan: any, index: any) => (
          <UserSubscriptionCard
            isProcessing={false}
            key={index}
            plan={plan}
            currentPlanId={userInfo.subscription?.planId} // Calls your SSLCommerz endpoint
            //isPopular={plan.name.includes("global") || plan.price === 500} // Simple logic to highlight middle tier
            isPopular={index === 1}
          />
        ))}
    </div>
  );
}
