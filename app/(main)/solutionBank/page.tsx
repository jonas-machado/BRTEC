import { getSolutions } from "@/lib/actions/getSolutions";
import SolutionForm from "@/components/form/SolutionForm";
import MotionComponent from "@/lib/motionComponent";

const SolutionBank = async () => {
  const solutions = await getSolutions();
  return (
    <MotionComponent>
      <div className="w-full px-4 pt-16">
        <SolutionForm solutions={solutions} />
      </div>
    </MotionComponent>
  );
};

export default SolutionBank;
