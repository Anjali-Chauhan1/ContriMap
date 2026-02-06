import RepoAnalysis from '../models/RepoAnalysis.js';
import githubClient from '../github/client.js';
import aiService from '../ai/aiService.js';


export const generateIssueRoadmap = async (req, res) => {
    try {
        const { owner, name, issueNumber } = req.params;
          const analysis = await RepoAnalysis.findOne({ fullName: `${owner}/${name}` });

        if (!analysis) {
            return res.status(404).json({
                success: false,
                message: 'Repository not analyzed yet. Please analyze the repository first.'
            });
        }

        const existingRoadmap = analysis.issueRoadmaps.find(
            r => r.issueNumber === parseInt(issueNumber)
        );

        if (existingRoadmap) {
            return res.json({
                success: true,
                data: existingRoadmap,
                cached: true
            });
        }


        const issueResponse = await githubClient.restClient.get(
            `/repos/${owner}/${name}/issues/${issueNumber}`
        );
        const issue = issueResponse.data;

        const roadmap = await aiService.generateIssueRoadmap(issue, {
            name: analysis.name,
            languages: analysis.languages,
            structure: analysis.structure,
            codeAnalysis: analysis.codeAnalysis
        });


        analysis.issueRoadmaps.push({
            issueNumber: parseInt(issueNumber),
            issueTitle: issue.title,
            roadmap,
            generatedAt: new Date()
        });
        await analysis.save();

        res.json({
            success: true,
            data: {
                issueNumber: parseInt(issueNumber),
                issueTitle: issue.title,
                roadmap
            }
        });

    } catch (error) {
        console.error('Error generating issue roadmap:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate issue roadmap'
        });
    }
};

// Generate PR checklist
export const generatePRChecklist = async (req, res) => {
    try {
        const { owner, name } = req.params;
        const { changes } = req.body;

        if (!changes) {
            return res.status(400).json({
                success: false,
                message: 'Changes description is required'
            });
        }

        // Get repository analysis
        const analysis = await RepoAnalysis.findOne({ fullName: `${owner}/${name}` });

        if (!analysis) {
            return res.status(404).json({
                success: false,
                message: 'Repository not analyzed yet'
            });
        }

        // Generate PR checklist
        const checklist = await aiService.generatePRChecklist({
            name: analysis.name,
            languages: analysis.languages,
            structure: analysis.structure,
            codeAnalysis: analysis.codeAnalysis
        }, changes);

        res.json({
            success: true,
            data: checklist
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get mind map data
export const getMindMap = async (req, res) => {
    try {
        const { owner, name } = req.params;

        const analysis = await RepoAnalysis.findOne({ fullName: `${owner}/${name}` });

        if (!analysis) {
            return res.status(404).json({
                success: false,
                message: 'Repository not analyzed yet'
            });
        }

        res.json({
            success: true,
            data: analysis.mindMapData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get AI insights
export const getAIInsights = async (req, res) => {
    try {
        const { owner, name } = req.params;

        const analysis = await RepoAnalysis.findOne({ fullName: `${owner}/${name}` });

        if (!analysis) {
            return res.status(404).json({
                success: false,
                message: 'Repository not analyzed yet'
            });
        }

        res.json({
            success: true,
            data: {
                aiInsights: analysis.aiInsights,
                contributionGuide: analysis.contributionGuide
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
