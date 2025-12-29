export interface ITripApprovalInfo {
  user: {
    name: string;
    username: string;
    profilePhoto: string;
    email: string;
    id: string;
  };
  trip: {
    title: string;
    slug: string;
    bannerImage: string;
  };
  id: string;
  approveStatus: string;
}
