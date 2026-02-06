import mongoose from 'mongoose';

const repoAnalysisSchema = new mongoose.Schema({
    repoUrl: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    owner: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    description: String,

    // Basic repo info
    stars: Number,
    forks: Number,
    openIssues: Number,
    language: String,
    languages: [String],
    topics: [String],

    // Structure analysis
    structure: mongoose.Schema.Types.Mixed,

    // Tree-sitter code analysis
    codeAnalysis: mongoose.Schema.Types.Mixed,

    // Mind map data
    mindMapData: mongoose.Schema.Types.Mixed,

    // AI-generated insights
    aiInsights: {
        overview: String,
        purpose: String,
        techStack: [String],
        mainComponents: [String],
        dataFlow: String,
        keyFolders: [String],
        importantFiles: [String]
    },

    // Contribution guidance
    contributionGuide: {
        gettingStarted: [String],
        beginnerFriendlyAreas: [String],
        setupSteps: [String],
        commonPatterns: [String]
    },

    // PR preparation help
    prPreparationHelp: {
        preSubmitChecks: [String],
        impactedAreas: [String],
        testingRecommendations: [String],
        documentationNeeds: [String],
        codeQualityTips: [String]
    },
    // Issue roadmaps 
    issueRoadmaps: [{
        issueNumber: Number,
        issueTitle: String,
        roadmap: {
            steps: [String],
            modulesToUnderstand: [String],
            filesToChange: [String],
            testingAreas: [String],
            commonMistakes: [String]
        },
        generatedAt: Date
    }],

    // Analysis metadata
    analysisStatus: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    analysisError: String,
    lastAnalyzedAt: Date,

}, {
    timestamps: true
});

// Indexes for faster queries
repoAnalysisSchema.index({ repoUrl: 1 });
repoAnalysisSchema.index({ fullName: 1 });
repoAnalysisSchema.index({ owner: 1, name: 1 });

const RepoAnalysis = mongoose.model('RepoAnalysis', repoAnalysisSchema);

export default RepoAnalysis;
