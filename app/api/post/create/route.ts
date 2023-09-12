import { getCurrentUser } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, content } = body;

    console.log(title, content);

    const session = await getCurrentUser();

    console.log(session);

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return new Response("OK");
  } catch (error) {
    console.log(error);
    return new Response("Could not post to subreddit.", { status: 500 });
  }
}
