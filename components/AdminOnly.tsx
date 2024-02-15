"use client";

import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Admin {
  children: React.ReactNode;
}

export default function AdminOnly({ children }: Admin) {
  const session = useSession();
  useEffect(() => {}, [session]);
  console.log(session.data);
  if (session.data?.user.role === "ADMIN") {
    return <>{children}</>;
  }
}
