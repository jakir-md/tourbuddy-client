"use server";
import { redirect } from "next/navigation";
import { deleteCookie } from "./tokenHandlers";

export const logOut = async () => {
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
  redirect("/?loggedOut=true");
};
