import express from 'express';
import {
    analyzeRepository,
    getAnalysisStatus,
    getRepoAnalysis,
    getBeginnerIssues,
    searchRepositories
} from '../controllers/repoController.js';

const router = express.Router();

router.post('/analyze', analyzeRepository);

router.get('/analysis/:analysisId/status', getAnalysisStatus);

router.get('/:owner/:name', getRepoAnalysis);

router.get('/:owner/:name/issues/beginner', getBeginnerIssues);

router.get('/search', searchRepositories);

export default router;
