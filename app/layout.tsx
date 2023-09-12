import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import PageWrapper from "../lib/pageWrapper";
import MotionPage from "../lib/motionPage";
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
          " bg-black bg-no-repeat bg-fit h-full min-h-screen scrollbar-corner-transparent resize-none scrollbar-w-3 scrollbar-thumb-rounded-md scrollbar scrollbar-thumb-gray-800 scrollbar-track-gray-900 scrollbar-track-rounded-md"
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
