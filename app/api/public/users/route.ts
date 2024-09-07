import { createUser } from "@/lib/redis/users";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { address } = body;
  if (!address) {
    return NextResponse.json(
      { error: "Missing reqired filed 'address'" },
      {
        status: 422,
      }
    );
  }
  const data = await createUser(address);
  return NextResponse.json(data);
};
