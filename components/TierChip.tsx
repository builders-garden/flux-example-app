import { UserTier } from "@/lib/redis/users";
import { Chip } from "@nextui-org/react";

export default function TierChip({ tier }: { tier: UserTier }) {
  if (tier === UserTier.BRONZE) {
    return (
      <Chip
        radius="sm"
        variant="shadow"
        classNames={{
          base: "bg-gradient-to-br from-amber-200 to-yellow-300 border-small border-white/50 shadow-yellow-300/30",
          content: "drop-shadow shadow-black text-amber-800",
        }}
      >
        Bronze
      </Chip>
    );
  }

  if (tier === UserTier.SILVER) {
    return (
      <Chip
        variant="shadow"
        radius="sm"
        classNames={{
          base: "bg-gradient-to-br from-gray-200 to-gray-300 border-small border-white/50 shadow-gray-300/30",
          content: "drop-shadow shadow-black text-gray-700",
        }}
      >
        Silver
      </Chip>
    );
  }
  if (tier === UserTier.GOLD) {
    return (
      <Chip
        variant="shadow"
        radius="sm"
        classNames={{
          base: "bg-gradient-to-br from-amber-200 to-yellow-300 border-small border-white/50 shadow-yellow-300/30",
          content: "drop-shadow shadow-black text-amber-800",
        }}
      >
        Gold
      </Chip>
    );
  }
}
