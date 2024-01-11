import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { id } = body;

  const deletedItem = await prisma.monitoring.delete({
    where: {
      id,
    },
  });

  return Response.json(deletedItem);
}
