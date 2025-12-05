import { getNavItemsByRole, NavSection } from "@/lib/navItems";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { IUserInfo } from "@/types/user.interface";
import DashBoardSidebarContent from "./DashboardSidebarContent";

export default async function DashboardSidebar() {
  const userInfo = (await getUserInfo()) as IUserInfo;
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);

  return <DashBoardSidebarContent user={userInfo} navItems={navItems} />;
}
