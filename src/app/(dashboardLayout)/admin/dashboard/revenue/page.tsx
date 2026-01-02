import { Suspense } from "react";

export default async function RevenuePage() {
  return (
    <div className="space-y-6 px-4 pt-4">
      <Suspense fallback={<div>Loading...</div>}>
        <div>Revenue Page is comming</div>
      </Suspense>
    </div>
  );
}
