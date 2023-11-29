import prisma from "../../../../lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { sector, role, email } = body;

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      sector,
      role,
    },
  });

  return NextResponse.json(user);
}
