import { getCurrentUser } from "@/app/api/auth/[...nextauth]/route";

interface Admin {
  children: React.ReactNode;
}

export default function AdminPage({ children }: Admin) {
  const user = getCurrentUser();
  console.log(user);
  return <>{children}</>;
}
