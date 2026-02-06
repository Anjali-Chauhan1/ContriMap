import { Worker } from 'bullmq';
import { connection } from '../queues/analysisQueue.js';
import analysisService from '../services/analysisService.js';

const worker = new Worker(
    'repo-analysis',
    async (job) => {
        const { analysisId, owner, name } = job.data;
        console.log(` Processing analysis job ${job.id} for ${owner}/${name}`);

        try {
            await analysisService.performAnalysis(analysisId, owner, name);
            console.log(` Completed analysis job ${job.id}`);
        } catch (error) {
            console.error(` Job ${job.id} failed:`, error.message);
            throw error; 
        }
    },
    { connection }
);

worker.on('completed', (job) => {
    console.log(` Job ${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.log(` Job ${job.id} has failed with ${err.message}`);
});

export default worker;
