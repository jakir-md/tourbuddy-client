import { VerificationApprovalHeader } from "@/components/modules/moderator/reviewProfile/VerificationApprovalHeader";
import { VerificationApprovalTable } from "@/components/modules/moderator/reviewProfile/VerificationApprovalTable";
import { getAllVerifyRequests } from "@/services/auth/verifyUserProfile";

export default async function VerificationApprovalPage() {
  const verifyRequests = await getAllVerifyRequests();
  console.log("from verify requests", verifyRequests);
  return (
    <div className="space-y-6 px-4 pt-4">
      <VerificationApprovalHeader />
      <VerificationApprovalTable verificationInfo={verifyRequests.data} />
    </div>
  );
}
