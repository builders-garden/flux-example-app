import { createPublicKey, createVerify } from "crypto";
import { FLUX_WEBHOOK_PUBLIC_KEY } from "./constants";

export const validateFluxWebhookEvent = (data: unknown, signature: string) => {
  const publicKey = createPublicKey(FLUX_WEBHOOK_PUBLIC_KEY);
  const verify = createVerify("sha256");
  verify.update(JSON.stringify(data));
  return verify.verify(publicKey, signature, "base64");
};
