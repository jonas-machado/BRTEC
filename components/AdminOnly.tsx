"use client";

import { useSession } from "next-auth/react";

interface Admin {
  children: React.ReactNode;
}

export default function AdminOnly({ children }: Admin) {
  const { data, status } = useSession();
  if (data?.user.role === "ADMIN") {
    return <>{children}</>;
  }
}
