import { UserRole } from "@/types/user.interface";
import { getDefaultDashboardRoute } from "./auth-utils";

export interface NavItem {
  title: string;
  url: string;
  icon: string;
  badge?: string | number;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const userNavitems = (): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute("USER");
  return [
    {
      title: "Overview",
      items: [
        {
          title: "OverView",
          icon: "LayoutDashboard",
          url: defaultDashboard,
        },
        {
          title: "Messages",
          url: "/dashboard/messages",
          icon: "MessageSquare",
          badge: 3,
        },
      ],
    },
    {
      title: "My Travel",
      items: [
        { title: "My Trips", url: "/dashboard/trips", icon: "Map" },
        {
          title: "Join Requests",
          url: "/dashboard/join-requests",
          icon: "UserPlus",
          badge: 2,
        },
        { title: "Saved Trips", url: "/dashboard/saved", icon: "Heart" },
        { title: "History", url: "/dashboard/history", icon: "History" },
      ],
    },
    {
      title: "Account",
      items: [
        {
          title: "ID Verification",
          url: "/dashboard/verification",
          icon: "ShieldCheck",
        },
        {
          title: "Subscription",
          url: "/dashboard/subscriptions",
          icon: "CreditCard",
        },
        { title: "Settings", url: "/dashboard/settings", icon: "Settings" },
      ],
    },
  ];
};

export const moderatorNavItems = (): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute("MODERATOR");
  return [
    {
      title: "Overview",
      items: [
        {
          title: "OverView",
          icon: "LayoutDashboard",
          url: defaultDashboard,
        },
      ],
    },
    {
      title: "Trips Management",
      items: [
        {
          title: "Review Trip",
          icon: "LayoutDashboard",
          url: "/moderator/dashboard/approve-trips",
        },
      ],
    },
    {
      title: "User Management",
      items: [
        {
          title: "Review Profiles",
          icon: "Profile",
          url: "/moderator/dashboard/approve-profiles",
        },
      ],
    },
  ];
};

export const adminNavItems = (): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute("ADMIN");
  return [
    {
      title: "Overview",
      items: [
        {
          title: "OverView",
          icon: "LayoutDashboard",
          url: defaultDashboard,
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          title: "Revenue",
          url: "/admin/dashboard/revenue",
          icon: "BadgeDollarSign",
        },
      ],
    },
    {
      title: "User Management",
      items: [
        { title: "All Users", url: "/admin/dashboard/users", icon: "Users" },
        {
          title: "ID Verification",
          url: "/admin/dashboard/verification",
          icon: "Shield",
          badge: 5,
        },
      ],
    },
    {
      title: "Content & Safety",
      items: [
        { title: "Manage Trips", url: "/admin/trips", icon: "Map" },
        {
          title: "Reports & Flags",
          url: "/admin/dashboard/reports",
          icon: "Flag",
          badge: 2,
        },
        { title: "Reviews", url: "/admin/dashboard/reviews", icon: "FileText" },
      ],
    },
    {
      title: "System",
      items: [
        {
          title: "Subscription Plans",
          url: "/admin/dashboard/manage-plans",
          icon: "CreditCard",
        },
        {
          title: "Platform Settings",
          url: "/admin/dashboard/settings",
          icon: "Settings",
        },
      ],
    },
  ];
};

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  switch (role) {
    case "USER":
      return [...userNavitems()];
    case "ADMIN":
      return [...adminNavItems()];
    case "MODERATOR":
      return [...moderatorNavItems()];
    default:
      return [];
  }
};
