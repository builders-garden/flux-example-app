import { FLUX_TIER_GOLD_PRODUCT_ID, FLUX_TIER_SILVER_PRODUCT_ID } from "@/lib/flux/constants";
import { FluxEventType, FluxWebhookEventData } from "@/lib/flux/interfaces";
import { updateUser, UserTier } from "@/lib/redis/users";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { metadata, payload } = (await req.json()) as FluxWebhookEventData;
  if (metadata.eventType === FluxEventType.PAYMENT_SUCCESSFUL) {
    if (payload.productId === FLUX_TIER_SILVER_PRODUCT_ID) {
      await updateUser(payload.userId, { tier: UserTier.SILVER });
    }
    if (payload.productId === FLUX_TIER_GOLD_PRODUCT_ID) {
      await updateUser(payload.userId, { tier: UserTier.GOLD });
    }
  }
  return NextResponse.json({ message: "ok" });
};
