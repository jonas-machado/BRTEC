import getCurrentUser from "@/lib/actions/getCurrentUser";
import MotionContent from "@/lib/framerMotion/motionContent";
import React from "react";
import { getMonitoring } from "@/lib/actions/getMonitoring";
import MonitoringOutput from "@/components/MonitoringOutput";

export default async function monitoring() {
  const currentUser = await getCurrentUser();
  const monitoring = await getMonitoring();

  return (
    <>
      <MotionContent>
        <div className="m-4">
          <MonitoringOutput monitoring={monitoring} />
        </div>
      </MotionContent>
    </>
  );
}
