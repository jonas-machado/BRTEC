import prisma from "../../../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "../../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const { email } = body;
  console.log(email);
  const deleteUser = await prisma.user.delete({
    where: {
      email,
    },
  });

  return NextResponse.json(deleteUser);
}
