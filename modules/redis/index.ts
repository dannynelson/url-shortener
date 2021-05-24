import redis from 'redis';
import { promisify } from 'util';

const redisClient = redis.createClient({ host: process.env.REDIS_HOST });

redisClient.on('error', function (error) {
  console.error(error);
});

export default {
  set: promisify(redisClient.set).bind(redisClient),
  get: promisify(redisClient.get).bind(redisClient),
  client: redisClient,
};
