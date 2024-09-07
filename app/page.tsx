"use client";

import TierChip from "@/components/TierChip";
import { useFetchUser } from "@/hooks/use-fetch-user";
import { useUpdateUser } from "@/hooks/use-update-user";
import { UserTier } from "@/lib/redis/users";
import { shortenAddress } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { RefreshCcw } from "lucide-react";

export default function Home() {
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin({
    onComplete: async (user, isNewUser) => {
      if (isNewUser) {
        await fetch("/api/public/users", {
          method: "POST",
          body: JSON.stringify({
            email: user.email?.address,
            address: user.wallet?.address,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        refetch();
      }
    },
  });

  const { user, refetch } = useFetchUser();
  console.log(user);
  const { updateUser } = useUpdateUser({ refetchUser: refetch });

  return (
    <div className="text-black bg-white flex flex-row justify-center items-center justify-items-center min-h-screen p-24 pb-20 gap-16 sm:p-20]">
      <div className="flex flex-row justify-center gap-8">
        <div className="w-1/2 flex flex-col gap-4 bg-gradient-to-br ">
          <div className="text-6xl font-black">Flux Example App</div>
          <div className="text-lg">
            This app demonstrates how to use Flux payment infrastructure in your
            app, unlocking new tiers automatically after receiveing a product
            purchase event.
          </div>
          {ready && !authenticated && (
            <Button
              radius="full"
              className="bg-black text-white w-fit"
              onClick={() => login()}
            >
              Start now
            </Button>
          )}
        </div>
        {!user && <div className="w-1/2"></div>}
        {user && (
          <div className="w-1/2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="text-xl font-black">Logged in as</div>
                <div className="flex flex-row gap-2">
                  <div className="text-sm text-gray-600 bg-default-100 rounded-md py-1 px-2">
                    {user.email}
                  </div>
                  <div className="text-sm text-gray-600 bg-default-100 rounded-md py-1 px-2">
                    {shortenAddress(user.address)}
                  </div>
                  <TierChip tier={user.tier} />
                </div>
              </div>
              <Button
                size="sm"
                className="bg-black text-white w-fit"
                onClick={() => updateUser(UserTier.BRONZE)}
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Reset tier
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
