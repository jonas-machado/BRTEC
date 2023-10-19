import prisma from "@/lib/prismadb";

export async function getNeutralNetwork() {
  return await prisma.neutralNetwork.findMany();
}
