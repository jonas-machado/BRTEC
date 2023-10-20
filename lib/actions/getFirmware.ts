import prisma from "@/lib/prismadb";

export async function getFirmware() {
  return await prisma.firmware.findMany();
}
