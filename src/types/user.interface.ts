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

  subscription: any;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = "USER" | "ADMIN";

export enum TripType {
  SOLO,
  BACKPACKING,
  LUXURY,
  BUSINESS,
  FAMILY,
}
