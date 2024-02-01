import SolutionForm from "@/components/form/SolutionForm";
import MotionComponent from "@/lib/framerMotion/motionComponent";
import Providers from "@/components/Providers";
import { getPost } from "@/lib/actions/getPost";
import { getCurrentUser } from "@/app/api/auth/[...nextauth]/route";
import MotionContent from "@/lib/framerMotion/motionContent";

const SolutionBank = async () => {
  const post = await getPost();
  const currentUser = await getCurrentUser();

  return (
    <MotionContent className="w-full px-4 pt-16 ">
      <Providers>
        <SolutionForm post={post} currentUser={currentUser} />
      </Providers>
    </MotionContent>
  );
};

export default SolutionBank;
