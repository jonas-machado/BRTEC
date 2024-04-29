import getCurrentUser from "@/lib/actions/getCurrentUser";
import ScriptForm from "@/components/form/scriptForm/ScriptForm";
import MotionContent from "@/lib/framerMotion/motionContent";
import InlineEditor from "@/components/inlineEditor";
import React, { Component } from "react";
import Monitoring from "@/components/Monitoring";
import { getMonitoring } from "@/lib/actions/getMonitoring";
import MonitoringOutput from "@/components/MonitoringOutput";

export default async function monitoring() {
  const currentUser = await getCurrentUser();
  const monitoring = await getMonitoring();
  console.log(monitoring);

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
