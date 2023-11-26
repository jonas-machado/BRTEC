import prisma from "@/lib/prismadb";

export async function getMaps() {
  return await prisma.maps.findMany();
}
