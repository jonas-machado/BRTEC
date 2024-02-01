import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import PageWrapper from "../lib/framerMotion/pageWrapper";
import MotionPage from "../lib/framerMotion/motionPage";
import AuthContext from "../lib/AuthContext";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JM script",
  description: "Utilitários para todos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " bg-black bg-no-repeat overflow-x-hidden bg-fit scrollbar-none scrollbar-corner-transparent resize-none scrollbar-w-3 scrollbar-thumb-rounded-lg scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-transparent scrollbar-track-rounded-md"
        }
      >
        <AuthContext>
          <PageWrapper>
            <MotionPage>{children}</MotionPage>
          </PageWrapper>
        </AuthContext>
      </body>
    </html>
  );
}
