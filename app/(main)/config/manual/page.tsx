//import io from "socket.io-client";
import { getOlt } from "@/lib/actions/getOlt";
import ConfigForm from "@/components/form/ConfigForm";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import MotionComponent from "@/lib/motionComponent";

export default async function ConfigPage() {
  const currentUser = await getCurrentUser();
  const { olt } = await getOlt();
  return (
    <MotionComponent>
      <div id="manualConfig" className="mx-auto w-11/12">
        <ConfigForm olt={olt} currentUser={currentUser} />
      </div>
    </MotionComponent>
  );
}
