import { Redis } from "ioredis";
import { connect } from "mongoose";
import { redisConfig } from "../confs/redis.config";

export const connectToMongo = async () => {
  await connect(process.env.DB_URL).catch((e) => console.log(e));
};

export const redisClient = new Redis(redisConfig);
