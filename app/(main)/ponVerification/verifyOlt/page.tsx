import getCurrentUser from "@/lib/actions/getCurrentUser";
import MotionContent from "@/lib/framerMotion/motionContent";
import VerifyPon from "@/components/form/ponVerification/VerifyZTE";
import { getOlt } from "@/lib/actions/getOlt";

export default async function monitoring() {
  const { olt } = await getOlt();
  return (
    <MotionContent>
      <div className="flex mx-auto mt-2 w-11/12">
        <VerifyPon olt={olt} />
      </div>
    </MotionContent>
  );
}
