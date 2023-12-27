import prisma from "@/lib/prismadb";

export async function getMonitoring() {
  return await prisma.monitoring.findMany({
    orderBy: { createdAt: "desc" },
  });
}
