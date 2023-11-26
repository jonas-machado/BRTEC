import { getNeutralNetwork } from "@/lib/actions/getNeutralNetwork";
import { getCurrentUser } from "@/app/api/auth/[...nextauth]/route";
import { getFirmware } from "@/lib/actions/getFirmware";

import getUsers from "@/lib/actions/getUsers";
import Maps from "@/components/settings/navbarUtilities/mapas";
import { getMaps } from "@/lib/actions/getMaps";
import Companies from "@/components/settings/navbarUtilities/companies";

export default async function CompaniesPage() {
  const companies = await getNeutralNetwork();

  return (
    <>
      <Companies companies={companies} />
    </>
  );
}
