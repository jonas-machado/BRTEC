import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const allItens = await prisma.monitoring.findMany();

  return NextResponse.json(allItens);
}
