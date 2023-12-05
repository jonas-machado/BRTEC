import Provision from "@/components/settings/Provision";
import QueryProvider from "@/lib/QueryProvider";
import { getProvisioned } from "@/lib/actions/getProvisioned";

export default async function ProvisionPage() {
  const provisioned = await getProvisioned();
  return (
    <>
      <QueryProvider>
        <Provision provisioned={provisioned} />
      </QueryProvider>
    </>
  );
}
