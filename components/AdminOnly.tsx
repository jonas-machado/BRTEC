"use client";

import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Admin {
  children: React.ReactNode;
}

export default function AdminOnly({ children }: Admin) {
  const { data, status } = useSession();
  const [role, setRole] = useState<string>();
  useEffect(() => {
    setRole(data?.user.role);
  }, [data]);

  if (role === "ADMIN") {
    return <>{children}</>;
  }
}
