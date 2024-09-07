import { User } from "@/lib/redis/users";
import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";

export const useFetchUser = () => {
  const { getAccessToken } = usePrivy();
  const { isPending, error, data, refetch, isRefetching } = useQuery({
    queryKey: ["users", "me"],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/users/me`, {
          headers: {
            Authorization: `Bearer ${await getAccessToken()}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        return await response.json();
      } catch (error) {
        return null;
      }
    },
  });

  return {
    isPending: isPending || isRefetching,
    error,
    user: data as User | null,
    refetch,
  };
};
