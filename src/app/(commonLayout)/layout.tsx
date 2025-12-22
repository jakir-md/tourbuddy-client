import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";
import { getUserInfo } from "@/services/auth/getUserInfo";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserInfo();
  return (
    <>
      <PublicNavbar user={user} />
      {children}
      <PublicFooter />
    </>
  );
};

export default CommonLayout;
