import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    text,
    isUp,
    dateDown,
    bases,
  }: {
    text: string;
    isUp: boolean;
    dateDown: Date;
    bases: string[];
  } = body;
  console.log(text, isUp, dateDown, bases);

  // Include only defined fields in the updateData object:

  const monitoring = await prisma.monitoring.create({
    data: {
      text,
      isUp,
      dateDown,
      bases,
    },
  });

  console.log(monitoring);

  return Response.json(monitoring);
}
