import knex from "knex";
import { Redis } from "ioredis";
import { redisConfig } from "../confs/redis.config";
import knexPoolConfig from "../../knexfile";

export const knexPool = knex(knexPoolConfig.development);
export const redisClient = new Redis(redisConfig);
