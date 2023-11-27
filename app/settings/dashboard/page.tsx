//import io from "socket.io-client";
import { getOlt } from "@/lib/actions/getOlt";
import ConfigForm from "@/components/form/ConfigForm";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import MotionComponent from "@/lib/framerMotion/motionComponent";
import Settings from "@/components/settings/Sidebar";

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();
  const { olt } = await getOlt();
  return <></>;
}
