import { createPublicKey, createVerify } from "crypto";

const FLUX_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApItGFqrPP65bhoIXh5Aj
ruqLxUljdcwESTSJJllDtwXeHJcxf6qBXWmK3mPMsXuCsCRY8cOKAbqzrylWohoG
wC+de3w7FMUVH+UH8B+s6OZVzGXKhYnhlq6IVJaw7ZHTZDQUBOtQIYA6pd5YYIXv
rP2rtvxrlQ/TtUor3InwuZvnZGPdRGkcnl8G+QIbMzxrq4sMeJlL64Mx5cqg8VrR
MGCD4eWD5dtOn3ys9uc7SxMoNl4UmZfprS3C2wsD3RpSRSn/ZCr9SOr4dZVj0GhW
d1z3D7Yvfn5oqe7Uy9Lw2Jfu2YFhiYOex1lhKa2uVAd4yEUguyCRL3AlXw4rex2/
wQIDAQAB
-----END PUBLIC KEY-----
`;

export const validateFluxWebhook = (data: unknown, signature: string) => {
  const publicKey = createPublicKey(FLUX_PUBLIC_KEY);
  const verify = createVerify("sha256");
  verify.update(JSON.stringify(data));
  return verify.verify(publicKey, signature, "base64");
};
