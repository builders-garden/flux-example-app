import { NextResponse, NextRequest } from "next/server";
import { verifyAuthToken } from "./lib/privy";
import { validateFluxWebhookEvent } from "./lib/flux";

export const config = {
  matcher: "/api/:function*",
};

export async function middleware(req: NextRequest) {
  if (req.url.includes("/api/public/")) {
    // If the request is for a public endpoint, continue processing the request
    return NextResponse.next();
  }

  if (req.url.includes("/api/flux/webhooks")) {
    const signature = req.headers.get("x-flux-signature");
    if (!signature) {
      return NextResponse.json(
        { success: false, message: "Missing flux signature" },
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const body = await req.json();
    const isValid = validateFluxWebhookEvent(body, signature);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid flux signature" },
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return NextResponse.next();
  }

  // Get the Privy token from the headers
  const authToken = req.headers.get("Authorization");

  if (!authToken) {
    return NextResponse.json(
      { success: false, message: "Missing auth token" },
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const token = authToken.replace("Bearer ", "");
    const { isValid, user } = await verifyAuthToken(token);
    if (!isValid) {
      // Respond with JSON indicating an error message
      return NextResponse.json(
        { success: false, message: "Authentication failed" },
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    // If authentication is successful, continue processing the request
    const response = NextResponse.next();
    // privy embedded wallet address
    const address = user?.wallet?.address.toLowerCase();
    response.headers.set("x-address", address!);
    return response;
  } catch (error) {
    // Handle errors related to token verification or other issues
    return NextResponse.json(
      {
        success: false,
        message: "Authentication failed",
      },
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
