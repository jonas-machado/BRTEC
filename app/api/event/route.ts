import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { data } = body;
  const pusher = new Pusher({
    appId: "APP_ID",
    key: "APP_KEY",
    secret: "APP_SECRET",
    cluster: "APP_CLUSTER",
    useTLS: true,
  });

  pusher.trigger("my-channel", "my-event", {
    message: "hello world",
  });
  return Response.json({ data: "ok" });
}
