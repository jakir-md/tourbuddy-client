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
        { title: "Joined Trips", url: "/dashboard/joined-trips", icon: "Map" },
        {
          title: "Join Requests",
          url: "/dashboard/join-requests",
          icon: "UserPlus",
          badge: 2,
        },
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
          icon: "ShieldCheck",
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
        { title: "All Users", url: "/admin/dashboard/manage-users", icon: "Users" },
        {
          title: "ID Verification",
          url: "/admin/dashboard/approve-profiles",
          icon: "Shield",
          badge: 5,
        },
      ],
    },
    {
      title: "Content & Safety",
      items: [
        {
          title: "Review Trip",
          icon: "Map",
          url: "/admin/dashboard/approve-trips",
        },
        // {
        //   title: "Reports & Flags",
        //   url: "/admin/dashboard/reports",
        //   icon: "Flag",
        //   badge: 2,
        // },
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
        // {
        //   title: "Platform Settings",
        //   url: "/admin/dashboard/settings",
        //   icon: "Settings",
        // },
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
