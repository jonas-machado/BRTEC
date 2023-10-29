import { getSolutions } from "@/lib/actions/getSolutions";
import SolutionForm from "@/components/form/SolutionForm";
import MotionComponent from "@/lib/motionComponent";
import Providers from "@/components/Providers";
import { getPost } from "@/lib/actions/getPost";

const SolutionBank = async () => {
  const solutions = await getSolutions();
  const post = await getPost();
  return (
    <MotionComponent>
      <div className="w-full px-4 pt-16">
        <Providers>
          <SolutionForm post={post} />
        </Providers>
      </div>
    </MotionComponent>
  );
};

export default SolutionBank;
