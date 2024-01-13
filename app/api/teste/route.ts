import prisma from "@/lib/prismadb";

export async function GET() {
  const teste = { message: "teste" };

  return Response.json(teste);
}
