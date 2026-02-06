import express from 'express';
import {
    generateIssueRoadmap,
    generatePRChecklist,
    getMindMap,
    getAIInsights
} from '../controllers/analysisController.js';

const router = express.Router();

router.get('/:owner/:name/mindmap', getMindMap);

router.get('/:owner/:name/insights', getAIInsights);

router.get('/:owner/:name/issues/:issueNumber/roadmap', generateIssueRoadmap);

router.post('/:owner/:name/pr-checklist', generatePRChecklist);

export default router;
