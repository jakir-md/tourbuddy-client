"use client";
import { Column } from "@/components/shared/MangementTable";
import { UserInfoCell } from "@/components/shared/Cell/UserInfoCell";
export interface VerificationApproveInfo {
  id: string;
  user: {
    id: string;
    name: string;
    profilePhoto: string;
    username: string;
    email: string;
  };
  status: string;
  fbPageLink: string;
  facebookProfileLink: string;
  selfieImage: string;
  nidFront: string;
  nidBack: string;
  utilityBill: string;
  moderator?: {
    id: string;
    name: string;
    profilePhoto: string;
    username: string;
    email: string;
  };
}

export const VerificationApprovalColumn: Column<VerificationApproveInfo>[] = [
  {
    header: "User",
    accessor: (verificationData) => (
      <UserInfoCell
        name={verificationData.user.name}
        photo={verificationData.user.profilePhoto}
        email={verificationData.user.email}
        slug={verificationData.user.id}
      />
    ),
  },
  {
    header: "Moderator",
    accessor: (verificationData) => (
      <UserInfoCell
        name={verificationData?.moderator?.name}
        photo={verificationData?.moderator?.profilePhoto}
        email={verificationData?.moderator?.email}
        slug={verificationData?.moderator?.id}
      />
    ),
  },
  {
    header: "Status",
    accessor: (verificationData) => verificationData.status,
  },
];
