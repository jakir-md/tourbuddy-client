import HowItWorksPage from "@/components/modules/home/HowItWorks";
import { Suspense } from "react";

export default async function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <HowItWorksPage />
      </Suspense>
    </>
  );
}
