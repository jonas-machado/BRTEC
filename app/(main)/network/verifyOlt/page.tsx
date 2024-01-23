import getCurrentUser from "@/lib/actions/getCurrentUser";
import MotionContent from "@/lib/framerMotion/motionContent";
import VerifyPon from "@/components/form/Network/VerifyZTE";
import { getOlt } from "@/lib/actions/getOlt";

export default async function monitoring() {
  const { olt } = await getOlt();
  return (
    <MotionContent>
      <div className="flex mt-2">
        <VerifyPon olt={olt} />
      </div>
    </MotionContent>
  );
}
