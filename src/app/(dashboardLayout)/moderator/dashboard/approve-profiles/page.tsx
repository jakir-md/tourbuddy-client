import { VerificationApprovalHeader } from "@/components/modules/moderator/reviewProfile/VerificationApprovalHeader";
import { VerificationApprovalTable } from "@/components/modules/moderator/reviewProfile/VerificationApprovalTable";
import { getAllVerifyRequests } from "@/services/auth/verifyUserProfile";
import { Suspense } from "react";

export default async function VerificationApprovalPage() {
  const verifyRequests = await getAllVerifyRequests();
  console.log("from verify requests", verifyRequests);
  return (
    <div className="space-y-6 px-4 pt-4">
      <Suspense fallback={<div>Loading...</div>}>
        <VerificationApprovalHeader />
        <VerificationApprovalTable verificationInfo={verifyRequests?.data} />
      </Suspense>
    </div>
  );
}
