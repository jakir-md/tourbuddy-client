export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  image?: string;

  role: UserRole;
  isVerified: boolean;

  bio?: string;
  age?: number;
  gender?: string;
  interests: string[];

  subscriptionStatus: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = "USER" | "ADMIN";

export enum SubscriptionStatus {
  PENDING,
  ACCEPTED,
  REJECTED,
}

export enum TripType {
  SOLO,
  BACKPACKING,
  LUXURY,
  BUSINESS,
  FAMILY,
}
