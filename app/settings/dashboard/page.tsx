//import io from "socket.io-client";

import Dashboard from "@/components/settings/Dashboard";
import getUsers from "@/lib/actions/getUsers";

export default async function DashboardPage() {
  const users = await getUsers();
  return (
    <>
      <Dashboard users={users} />
    </>
  );
}
