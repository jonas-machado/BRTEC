import { SocketProvider } from "@/lib/socket";
import SectorPage from "@/components/SectorPage";
import { getOlt } from "@/lib/actions/getOlt";
import NetworkHead from "@/components/form/Network/NetworkHead";
export default async function NetworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const olt = await getOlt();
  return (
    <SectorPage sector="SUPORTE">
      <div className="mt-14 z-0 w-11/12 mx-auto">
        <NetworkHead />
        {children}
      </div>
    </SectorPage>
  );
}
