import prisma from "@/lib/prismadb";

export async function getProvisioned() {
  return await prisma.configured.findMany({
    orderBy: { updatedAt: "desc" },
    include: { user: true, olt: true },
  });
}
