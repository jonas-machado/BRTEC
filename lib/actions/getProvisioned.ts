import prisma from "@/lib/prismadb";

export async function getProvisioned() {
  return await prisma.configured.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
}
