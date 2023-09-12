import prisma from "@/lib/prismadb";

export async function getPost() {
  return await prisma.post.findMany();
}
