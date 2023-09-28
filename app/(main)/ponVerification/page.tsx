import React from "react";
import { getOlt } from "@/lib/actions/getOlt";
import PonVerificationForm from "@/components/form/PonVerificationForm";

const ponVerification = async () => {
  const { olt } = await getOlt();

  return (
    <div className="mt-14 z-0">
      <PonVerificationForm olt={olt} />
    </div>
  );
};

export default ponVerification;