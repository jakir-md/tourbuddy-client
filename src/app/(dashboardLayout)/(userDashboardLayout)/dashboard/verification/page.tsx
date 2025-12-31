import VerificationForm from "@/components/modules/user/verification/verificationForm";
import { getVerifyStatus } from "@/services/auth/verifyUserProfile";
import { Suspense } from "react";

export default async function VerificationPage() {
  const verifyInfo = await getVerifyStatus();
  console.log("verifyInfo", verifyInfo);
  let isVerified: string | null = null;
  if (verifyInfo.data) {
    isVerified = verifyInfo.data.status;
  }
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <VerificationForm
          isVerified={isVerified}
          message={verifyInfo?.data?.message}
        />
      </Suspense>
    </div>
  );
}
