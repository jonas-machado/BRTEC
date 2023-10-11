import getCurrentUser from "@/lib/actions/getCurrentUser";
import ScriptForm from "@/components/form/scriptForm/ScriptForm";
import MotionPage from "@/lib/motionPage";
import MotionComponent from "@/lib/motionComponent";

const script = async () => {
  const currentUser = await getCurrentUser();

  return (
    <MotionComponent>
      <div className="mt-12">
        <ScriptForm currentUser={currentUser} />
      </div>
    </MotionComponent>
  );
};

export default script;
