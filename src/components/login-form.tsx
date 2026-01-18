"use client";
// import { loginUser } from "@/services/auth/loginUser";
// import { useActionState, useEffect } from "react";
// import { toast } from "sonner";
// import InputFieldError from "./shared/InputFieldError";
// import { Button } from "./ui/button";
// import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
// import { Input } from "./ui/input";

// const LoginForm = ({ redirect }: { redirect?: string }) => {
//   const [state, formAction, isPending] = useActionState(loginUser, null);

//   useEffect(() => {
//     if (state && !state.success && state.message) {
//       toast.error(state.message);
//     }
//   }, [state]);

//   return (
//     <form action={formAction}>
//       {redirect && <input type="hidden" name="redirect" value={redirect} />}
//       <FieldGroup>
//         <div className="grid grid-cols-1 gap-4">
//           {/* Email */}
//           <Field>
//             <FieldLabel htmlFor="email">Email</FieldLabel>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="m@example.com"
//               //   required
//             />

//             <InputFieldError field="email" state={state} />
//           </Field>

//           {/* Password */}
//           <Field>
//             <FieldLabel htmlFor="password">Password</FieldLabel>
//             <Input
//               id="password"
//               name="password"
//               type="password"
//               placeholder="Enter your password"
//               //   required
//             />
//             <InputFieldError field="password" state={state} />
//           </Field>
//         </div>
//         <FieldGroup className="mt-4">
//           <Field>
//             <Button type="submit" disabled={isPending}>
//               {isPending ? "Logging in..." : "Login"}
//             </Button>

//             <FieldDescription className="px-6 text-center">
//               Don&apos;t have an account?{" "}
//               <a href="/register" className="text-blue-600 hover:underline">
//                 Sign up
//               </a>
//             </FieldDescription>
//             <FieldDescription className="px-6 text-center">
//               <a
//                 href="/forget-password"
//                 className="text-blue-600 hover:underline"
//               >
//                 Forgot password?
//               </a>
//             </FieldDescription>
//           </Field>
//         </FieldGroup>
//       </FieldGroup>
//     </form>
//   );
// };

// export default LoginForm;

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { loginUser } from "@/services/auth/loginUser";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import Link from "next/link";
import Password from "./Password";

export function LoginForm({
  className,
  redirect,
  ...props
}: React.ComponentProps<"div"> & { redirect: string | undefined }) {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className={cn("flex flex-col gap-6 rounded-md", className)} {...props}>
      <Card className="rounded-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                {redirect && (
                  <input type="hidden" name="redirect" value={redirect} />
                )}
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  defaultValue={state?.inputs?.email}
                  // required
                />
                <InputFieldError field="email" state={state} />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                {/* <Input id="password" type="password" name="password" /> */}
                <Password />
                <InputFieldError field="password" state={state} />
              </Field>
              <Field>
                <Button type="submit" className="hover:cursor-pointer">
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/register">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
