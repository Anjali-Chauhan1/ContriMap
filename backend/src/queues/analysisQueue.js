import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const connection = new IORedis(process.env.REDIS_HOST || 'redis://127.0.0.1:6379', {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    maxRetriesPerRequest: null,
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    },
    tls: process.env.REDIS_HOST?.includes('upstash.io') ? {} : undefined,
    family: 0, 
});


connection.on('connect', () => {
    console.log(' Redis connected successfully');
});

connection.on('error', (err) => {
    console.error(' Redis connection error:', err.message);
});

connection.on('ready', () => {
    console.log(' Redis is ready');
});

export const analysisQueue = new Queue('repo-analysis', {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 5000,
        },
        removeOnComplete: true,
        removeOnFail: false,
    },
});

export { connection };
