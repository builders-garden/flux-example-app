import { UserTier } from "@/lib/redis/users";
import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";

export const useUpdateUser = ({ refetchUser }: { refetchUser: () => void }) => {
  const { getAccessToken } = usePrivy();

  const [loading, setLoading] = useState(false);

  const updateUser = async (tier: UserTier) => {
    setLoading(true);
    const response = await fetch(`/api/users/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      body: JSON.stringify({ tier }),
    });
    await response.json();
    refetchUser();
    setLoading(false);
  };

  return {
    isLoading: loading,
    updateUser,
  };
};
