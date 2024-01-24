import { SocketProvider } from "@/lib/socket";
import SectorPage from "@/components/SectorPage";
import PonVerificationForm from "@/components/form/Network/NetworkHead";
import { getOlt } from "@/lib/actions/getOlt";
export default async function NetworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const olt = await getOlt();
  return (
    <SectorPage sector="N2">
      <div className="mt-14 z-0 w-11/12 mx-auto">
        <PonVerificationForm olt={olt} />
        {children}
      </div>
    </SectorPage>
  );
}
