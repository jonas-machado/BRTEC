import { useSession } from "next-auth/react";

interface Admin {
  children: React.ReactNode;
}

export default function AdminOnly({ children }: Admin) {
  const { data, status } = useSession();
  console.log(data?.user.role);
  return <>{data?.user.role === "ADMIN" && children}</>;
}
