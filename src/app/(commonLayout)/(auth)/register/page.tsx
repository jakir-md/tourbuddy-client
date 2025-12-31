import RegisterForm from "@/components/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="w-full max-w-xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Create an account</CardTitle>
                <CardDescription className="text-center">
                  Enter your information below to create your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegisterForm />
              </CardContent>
            </Card>
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default RegisterPage;
