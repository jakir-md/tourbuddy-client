export interface IJoinRequest {
  attendee: {
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
    id: string;
  };
  status: string;
  id: string;
}
