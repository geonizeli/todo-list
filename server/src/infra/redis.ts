import { createClient } from 'redis';

export const RedisConnection = createClient();

RedisConnection.on('error', (err) => console.log('Redis Client Error', err));
