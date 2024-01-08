import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { id, text, isUp, dateDown, bases } = body;
  console.log(id, text);
  const monitoring = await prisma.monitoring.update({
    where: {
      id,
    },
    data: {
      text,
    },
  });

  return Response.json(monitoring);
}
