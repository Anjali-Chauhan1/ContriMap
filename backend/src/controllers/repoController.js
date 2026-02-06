import RepoAnalysis from '../models/RepoAnalysis.js';
import githubClient from '../github/client.js';
import { analysisQueue } from '../queues/analysisQueue.js';

// Analyze repository
export const analyzeRepository = async (req, res) => {
    try {
        const { repoUrl } = req.body;

        if (!repoUrl) {
            return res.status(400).json({
                success: false,
                message: 'Repository URL is required'
            });
        }
        const { owner, name } = githubClient.parseRepoUrl(repoUrl);
        let analysis = await RepoAnalysis.findOne({ repoUrl });

        if (analysis && analysis.analysisStatus === 'completed') {
            return res.json({
                success: true,
                message: 'Repository already analyzed',
                data: analysis,
                cached: true
            });
        }
        if (!analysis) {
            analysis = new RepoAnalysis({
                repoUrl,
                owner,
                name,
                fullName: `${owner}/${name}`,
                analysisStatus: 'processing'
            });
            await analysis.save();
        } else {
            analysis.analysisStatus = 'processing';
            await analysis.save();
        }

        // ADD TO BULLMQ QUEUE
        await analysisQueue.add(`analyze-${owner}-${name}`, {
            analysisId: analysis._id,
            owner,
            name
        });

        res.json({
            success: true,
            message: 'Analysis queued successfully',
            data: {
                analysisId: analysis._id,
                status: 'processing'
            }
        });

    } catch (error) {
        console.error('Error in analyzeRepository:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to analyze repository'
        });
    }
};

// Get analysis status
export const getAnalysisStatus = async (req, res) => {
    try {
        const { analysisId } = req.params;

        const analysis = await RepoAnalysis.findById(analysisId);

        if (!analysis) {
            return res.status(404).json({
                success: false,
                message: 'Analysis not found'
            });
        }

        res.json({
            success: true,
            data: {
                status: analysis.analysisStatus,
                error: analysis.analysisError,
                lastAnalyzedAt: analysis.lastAnalyzedAt
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get repository analysis
export const getRepoAnalysis = async (req, res) => {
    try {
        const { owner, name } = req.params;
        const fullName = `${owner}/${name}`;

        const analysis = await RepoAnalysis.findOne({ fullName });

        if (!analysis) {
            return res.status(404).json({
                success: false,
                message: 'Repository not analyzed yet'
            });
        }

        res.json({
            success: true,
            data: analysis
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get beginner-friendly issues
export const getBeginnerIssues = async (req, res) => {
    try {
        const { owner, name } = req.params;

        const issues = await githubClient.getBeginnerIssues(owner, name);

        res.json({
            success: true,
            data: issues
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Search repositories
export const searchRepositories = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        // Search in analyzed repositories
        const results = await RepoAnalysis.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { topics: { $in: [new RegExp(query, 'i')] } }
            ],
            analysisStatus: 'completed'
        }).limit(20);

        res.json({
            success: true,
            data: results
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
