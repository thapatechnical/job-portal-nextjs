import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  console.log("user data: ", user);

  if (!user) return redirect("/login");

  if (user.role !== "employer") return redirect("/dashboard");

  return <> {children} </>;
}
