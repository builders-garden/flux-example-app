import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { metadata, payload } = await req.json();
  if (metadata.eventType === "product_purchased") {
    // TODO: Handle product purchased and update user tier
    console.log(payload);
  }
  return NextResponse.json({ message: "ok" });
};
