import getCurrentUser from "@/lib/actions/getCurrentUser";
import ScriptForm from "@/components/form/scriptForm/ScriptForm";
import MotionContent from "@/lib/framerMotion/motionContent";
import InlineEditor from "@/components/inlineEditor";
import React, { Component } from "react";

export default async function monitoring() {
  const currentUser = await getCurrentUser();

  return (
    <MotionContent>
      <InlineEditor />
    </MotionContent>
  );
}
