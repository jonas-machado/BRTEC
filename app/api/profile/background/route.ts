import prisma from "../../../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "../../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const { backgroundImage } = body;

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser?.user.id,
    },
    data: {
      backgroundImage,
    },
  });

  return NextResponse.json(updatedUser);
}
