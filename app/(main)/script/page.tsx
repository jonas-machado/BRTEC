import getCurrentUser from "@/lib/actions/getCurrentUser";
import ScriptForm from "@/components/form/scriptForm/ScriptForm";
import MotionContent from "@/lib/framerMotion/motionContent";

const script = async () => {
  const currentUser = await getCurrentUser();

  return (
    <MotionContent>
      <div className="mt-12">
        <ScriptForm currentUser={currentUser} />
      </div>
    </MotionContent>
  );
};

export default script;
