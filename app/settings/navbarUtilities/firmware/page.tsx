import { getNeutralNetwork } from "@/lib/actions/getNeutralNetwork";
import { getCurrentUser } from "@/app/api/auth/[...nextauth]/route";
import { getFirmware } from "@/lib/actions/getFirmware";

import getUsers from "@/lib/actions/getUsers";
import Maps from "@/components/settings/navbarUtilities/mapas";
import { getMaps } from "@/lib/actions/getMaps";
import Companies from "@/components/settings/navbarUtilities/companies";
import Firmware from "@/components/settings/navbarUtilities/firmware";

export default async function CompaniesPage() {
  const firmware = await getFirmware();

  return (
    <>
      <Firmware firmware={firmware} />
    </>
  );
}
