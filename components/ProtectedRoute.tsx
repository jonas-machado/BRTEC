"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: LayoutProps) {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status == "unauthenticated") {
      signOut({
        callbackUrl: "/",
      });
    }
  }, [session]);

  return <>{session?.status == "authenticated" && children}</>;
}
