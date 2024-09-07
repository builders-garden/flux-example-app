import { getRedisClient } from ".";

export enum UserTier {
  BRONZE = "bronze",
  SILVER = "silver",
  GOLD = "gold",
}

export const createUser = async (address: string, email: string) => {
  const redis = getRedisClient();
  const user = await redis.hgetall(`user:${address.toLowerCase()}`);
  if (user) {
    return user;
  }
  const newUser = await redis.hset(`user:${address.toLowerCase()}`, {
    address,
    email,
    tier: UserTier.BRONZE,
  });
  return newUser;
};

export const getUser = async (address: string) => {
  const redis = getRedisClient();
  const user = await redis.hgetall(`user:${address.toLowerCase()}`);
  return user;
};

export const updateUser = async (
  address: string,
  data: {
    tier: UserTier;
  }
) => {
  const redis = getRedisClient();
  const user = await getUser(address.toLowerCase());
  const updatedUser = await redis.hset(`user:${address.toLowerCase()}`, {
    ...user,
    tier: data.tier,
  });
  return updatedUser;
};

export const deleteUser = async (address: string) => {
  const redis = getRedisClient();
  const user = await redis.del(`user:${address}`);
  return user;
};
