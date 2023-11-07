import { getCurrentUser } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, content, sector, postId } = body;
    console.log(title, content, sector, postId);
    const session = await getCurrentUser();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
        sector,
      },
    });

    return new Response("OK");
  } catch (error) {
    console.log(error);
    return new Response("Could not post to subreddit.", { status: 500 });
  }
}
