//import io from "socket.io-client";
import { getOlt } from "@/lib/actions/getOlt";
import ConfigForm from "@/components/form/ConfigForm";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import MotionContent from "@/lib/framerMotion/motionContent";

export default async function ConfigPage() {
  const currentUser = await getCurrentUser();
  const { olt } = await getOlt();
  return (
    <MotionContent>
      <div id="manualConfig" className="mx-auto w-11/12">
        <ConfigForm olt={olt} currentUser={currentUser} />
      </div>
    </MotionContent>
  );
}
