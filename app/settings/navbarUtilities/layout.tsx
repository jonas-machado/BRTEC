import PageWrapper from "@/lib/framerMotion/pageWrapper";

import NavbarUtilities from "@/components/settings/navbarUtilities/NavbarUtilities";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper classname="">
      <NavbarUtilities />
      {children}
    </PageWrapper>
  );
}
