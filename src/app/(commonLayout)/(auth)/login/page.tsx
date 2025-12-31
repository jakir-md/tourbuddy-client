import LoginForm from "@/components/login-form";
import { Suspense } from "react";

const LoginPage = async ({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) => {
  const params = searchParams || {};
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>
          <LoginForm redirect={params.redirect} />
        </div>
      </Suspense>
    </div>
  );
};

export default LoginPage;
