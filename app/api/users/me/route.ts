import { getUser, updateUser } from "@/lib/redis/users";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const address = req.headers.get("x-address")!;
  const user = await getUser(address);
  if (!user) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      { status: 404 }
    );
  }
  return NextResponse.json(user);
};

export const PUT = async (req: NextRequest) => {
  const address = req.headers.get("x-address")!;
  const body = await req.json();

  const user = await getUser(address);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const { tier } = body;
  
  const data = await updateUser(address, { tier });
  return NextResponse.json(data);
};
