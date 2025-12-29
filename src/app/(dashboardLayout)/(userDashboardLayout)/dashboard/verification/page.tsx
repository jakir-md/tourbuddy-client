import VerificationForm from "@/components/modules/user/verification/verificationForm";
import { getVerifyStatus } from "@/services/auth/verifyUserProfile";

export default async function VerificationPage() {
  const verifyInfo = await getVerifyStatus();
  console.log("verifyInfo", verifyInfo);
  let isVerified: string | null = null;
  if (verifyInfo.data) {
    isVerified = verifyInfo.data.status;
  }
  return (
    <VerificationForm
      isVerified={isVerified}
      message={verifyInfo?.data?.message}
    />
  );
}
