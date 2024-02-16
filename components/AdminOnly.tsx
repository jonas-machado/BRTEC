"use client";
import { getCurrentUser } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Admin {
  children: React.ReactNode;
  user: User;
}

export default function AdminOnly({ children, user }: Admin) {
  if (user.role === "ADMIN") {
    return <>{children}</>;
  }
}
