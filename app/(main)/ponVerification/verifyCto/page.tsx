import MotionContent from "@/lib/framerMotion/motionContent";
import { getOlt } from "@/lib/actions/getOlt";
import VerifyCTO from "@/components/form/ponVerification/VerifyCTO";

export default async function monitoring() {
  const { olt } = await getOlt();
  return (
    <MotionContent>
      <VerifyCTO olt={olt} />
    </MotionContent>
  );
}
