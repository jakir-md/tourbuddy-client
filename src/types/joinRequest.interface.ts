export interface IJoinRequest {
  attendee: {
    name: string;
    username: string;
    profilePhoto: string;
    email: string;
  };
  trip: {
    title: string;
    slug: string;
    bannerImage: string;
  };
  status: string;
  id: string;
}
