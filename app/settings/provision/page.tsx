import Providers from "@/components/Providers";
import Provision from "@/components/settings/Provision";
import { getProvisioned } from "@/lib/actions/getProvisioned";

export default async function ProvisionPage() {
  const provisioned = await getProvisioned();
  return (
    <>
      <Providers>
        <Provision provisioned={provisioned} />
      </Providers>
    </>
  );
}
