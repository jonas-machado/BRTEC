import { SocketProvider } from "@/lib/socket";
import SectorPage from "@/components/SectorPage";
import PonVerificationForm from "@/components/form/ponVerification/PonVerificationForm";
import { getOlt } from "@/lib/actions/getOlt";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const olt = await getOlt();
  return (
    <SectorPage sector="N2">
      <div className="mt-14 z-0">
        <PonVerificationForm olt={olt} />
        {children}
      </div>
    </SectorPage>
  );
}