//import io from "socket.io-client";
import { getOlt } from "@/lib/actions/getOlt";
import ConfigForm from "@/components/form/ConfigForm";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import MotionComponent from "@/lib/framerMotion/motionComponent";
import Settings from "@/components/settings/Sidebar";
import Dashboard from "@/components/settings/dashboard";
import getUsers from "@/lib/actions/getUsers";

export default async function DashboardPage() {
  const users = await getUsers();
  return (
    <>
      <Dashboard users={users} />
    </>
  );
}
