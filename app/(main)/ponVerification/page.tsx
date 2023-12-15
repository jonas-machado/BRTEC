import React from "react";
import { getOlt } from "@/lib/actions/getOlt";
import PonVerificationForm from "@/components/form/PonVerificationForm";
import SectorPage from "@/components/SectorPage";

const ponVerification = async () => {
  const { olt } = await getOlt();

  return (
    <>
      <SectorPage sector="N2">
        <div className="mt-14 z-0">
          <PonVerificationForm olt={olt} />
        </div>
      </SectorPage>
    </>
  );
};

export default ponVerification;
