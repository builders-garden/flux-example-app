import { validateFluxWebhookEvent } from "@/lib/flux";
import {
  FLUX_TIER_GOLD_PRODUCT_ID,
  FLUX_TIER_SILVER_PRODUCT_ID,
} from "@/lib/flux/constants";
import { FluxEventType, FluxWebhookEventData } from "@/lib/flux/interfaces";
import { updateUser, UserTier } from "@/lib/redis/users";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const signature = req.headers.get("x-flux-signature")!;
  const body = await req.json();
  const isValid = validateFluxWebhookEvent(
    {
      url: `${process.env.BASE_URL}/api/flux/webhooks`,
      payload: body,
    },
    signature
  );
  if (!isValid) {
    return NextResponse.json(
      { success: false, message: "Invalid flux signature" },
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { metadata, eventData } = body as FluxWebhookEventData;
  console.log({ metadata, eventData });
  if (metadata.eventType === FluxEventType.PAYMENT_SUCCESSFUL) {
    if (eventData.productId === FLUX_TIER_SILVER_PRODUCT_ID) {
      console.log("Updating user to silver tier");
      await updateUser(eventData.customerAddress, { tier: UserTier.SILVER });
    }
    if (eventData.productId === FLUX_TIER_GOLD_PRODUCT_ID) {
      console.log("Updating user to gold tier");
      await updateUser(eventData.customerAddress, { tier: UserTier.GOLD });
    }
  }
  return NextResponse.json({ message: "ok" });
};
