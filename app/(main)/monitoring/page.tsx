import getCurrentUser from "@/lib/actions/getCurrentUser";
import ScriptForm from "@/components/form/scriptForm/ScriptForm";
import MotionContent from "@/lib/framerMotion/motionContent";
import InlineEditor from "@/components/inlineEditor";
import React, { Component } from "react";
import Monitoring from "@/components/Monitoring";

export default async function monitoring() {
  const currentUser = await getCurrentUser();

  return (
    <MotionContent>
      <div className="flex mx-auto my-12 w-11/12">
        <Monitoring />
      </div>
    </MotionContent>
  );
}
