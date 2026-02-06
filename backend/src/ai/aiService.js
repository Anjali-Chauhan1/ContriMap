import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

class AIService {
    constructor() {
        this.model = 'llama-3.3-70b-versatile'; 
    }

    async explainRepository(repoData) {
        const { name, description, languages, topics, structure, readme, codeAnalysis } = repoData;

        const structureSummary = this._getStructureSummary(structure);
        const codeSummary = this._getCodeSummary(codeAnalysis);

        const prompt = `You are a Senior Software Architect. Your task is to analyze the following repository and provide a deep, insightful explanation for a new developer.

Repository: ${name}
Description: ${description || 'No description provided'}
Main Languages: ${languages.slice(0, 5).join(', ')}
Key Topics: ${topics.slice(0, 10).join(', ')}

--- REPOSITORY STRUCTURE ---
${structureSummary}

--- CODE INTELLIGENCE (Main Functions & Classes) ---
${codeSummary}

--- README EXCERPT ---
${readme ? readme.substring(0, 1500) : 'No README available'}

Based on this data, provide a highly professional analysis in JSON format:
{
  "overview": "A clear, 3-sentence summary of what this project does and why it exists.",
  "purpose": "The core problem this project solves and its primary use cases.",
  "techStack": ["The main technologies, frameworks, and tools used, inferred from the code and structure."],
  "mainComponents": [
    "List of 3-5 major modules/components. For each, explain its role (e.g., 'Auth Service: Handles JWT validation in src/middleware')."
  ],
  "dataFlow": "A step-by-step explanation of how a typical request or data package moves through the system.",
  "keyFolders": [
    "Identify 4-6 critical folders. Explain what logic lives there (e.g., 'src/models: Defines the MongoDB schema for users')."
  ],
  "importantFiles": [
    "List 5-7 most important files. Explain why they are critical (e.g., 'src/server.js: Entry point where express and middlewares are initialized')."
  ]
}

Focus on technical accuracy and architectural clarity. Do not use generic filler text.`;

        try {
            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert software architect providing repository insights. Respond only with valid JSON.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                model: this.model,
                temperature: 0.2, 
                max_tokens: 2500,
                response_format: { type: 'json_object' }
            });

            const response = completion.choices[0]?.message?.content;
            return JSON.parse(response);
        } catch (error) {
            console.error('Error generating repo explanation:', error);
            throw new Error('Failed to generate repository explanation');
        }
    }


    async generateContributionGuide(repoData) {
        const { name, languages, structure, contributing, readme, codeAnalysis } = repoData;

        const prompt = `You are an Open-Source Mentor. Help a developer contribute to "${name}".

Languages: ${languages.join(', ')}
Has CONTRIBUTING.md: ${contributing ? 'Yes' : 'No'}

--- STRUCTURE ---
${this._getStructureSummary(structure)}

--- RELEVANT CODE ---
${this._getCodeSummary(codeAnalysis)}

Generate a practical, step-by-step contribution guide in JSON:
{
  "gettingStarted": ["High-level steps to get involved in the community/project."],
  "beginnerFriendlyAreas": [
    "Specific modules or folders where a beginner can safely make changes without breaking core logic."
  ],
  "setupSteps": ["Actionable, technical steps to set up the dev environment (e.g., npm install, env setup)."],
  "commonPatterns": [
    "Code patterns used (e.g., 'Uses functional components with hooks', 'Follows MVC architecture', 'Asynchronous error handling pattern')."
  ],
  "whereToStart": [
     "Suggest 3 specific entry-level tasks for this repository."
  ]
}

Be specific to the technology stack found in the code.`;

        try {
            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful open-source mentor. Respond only with valid JSON.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                model: this.model,
                temperature: 0.3,
                max_tokens: 1500,
                response_format: { type: 'json_object' }
            });

            const response = completion.choices[0]?.message?.content;
            return JSON.parse(response);
        } catch (error) {
            console.error('Error generating contribution guide:', error);
            throw new Error('Failed to generate contribution guide');
        }
    }

    async generateIssueRoadmap(issueData, repoContext) {
        const { title, body, labels } = issueData;
        const { name, languages, structure, codeAnalysis } = repoContext;

        const prompt = `You are a Tech Lead. Create a technical roadmap for this GitHub issue:

Issue: ${title}
Details: ${body || 'No description'}
Labels: ${labels.map(l => l.name).join(', ')}

Repository Context (${name}):
Languages: ${languages.join(', ')}
Structure: ${this._getStructureSummary(structure)}
Code Intelligence: ${this._getCodeSummary(codeAnalysis)}

Create a detailed roadmap in JSON:
{
  "steps": ["Step 1: Locate X", "Step 2: Modify Y", "Step 3: Add test Z"],
  "modulesToUnderstand": ["Which folders/files contain the logic relevant to this issue"],
  "filesToChange": ["Probable files that need edits based on the issue description"],
  "testingAreas": ["Exactly what to test to ensure the fix works"],
  "commonMistakes": ["Specific technical pitfalls in this repo for this type of change"]
}

Base your advice on the actual files and structure mentioned above.`;

        try {
            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert Tech Lead. Respond only with valid JSON.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                model: this.model,
                temperature: 0.2,
                max_tokens: 1500,
                response_format: { type: 'json_object' }
            });

            const response = completion.choices[0]?.message?.content;
            return JSON.parse(response);
        } catch (error) {
            console.error('Error generating issue roadmap:', error);
            throw new Error('Failed to generate issue roadmap');
        }
    }

  
    async generatePRChecklist(repoContext, proposedChanges = "General bug fix or feature") {
        const { name, languages, structure, codeAnalysis } = repoContext;

        const prompt = `You are an expert Code Reviewer. Prepare a PR checklist for a developer contributing to "${name}".

Languages: ${languages.join(', ')}
Proposed Changes: ${proposedChanges}

--- CONTEXT ---
${this._getStructureSummary(structure)}
${this._getCodeSummary(codeAnalysis)}

Generate a checklist in JSON:
{
  "preSubmitChecks": ["Mandatory checks like linting, build, or formatting."],
  "impactedAreas": ["Which parts of the system might break if these files are changed?"],
  "testingRecommendations": ["Specific tests to run (unit, integration, or manual)."],
  "documentationNeeds": ["Which docs need updating (README, inline comments, or tutorials)?"],
  "codeQualityTips": ["Repo-specific style tips based on the current code structure."]
}

Focus on preventing regressions and maintaining code quality.`;

        try {
            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'You are a meticulous code reviewer. Respond only with valid JSON.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                model: this.model,
                temperature: 0.3,
                max_tokens: 1200,
                response_format: { type: 'json_object' }
            });

            const response = completion.choices[0]?.message?.content;
            return JSON.parse(response);
        } catch (error) {
            console.error('Error generating PR checklist:', error);
            throw new Error('Failed to generate PR checklist');
        }
    }

    _getStructureSummary(structure) {
        if (!structure) return "No structure data.";
        const dirs = Object.keys(structure.directories || {}).slice(0, 15);
        const files = Object.keys(structure.files || {}).slice(0, 20);
        return `Folders: ${dirs.join(', ')}\nFiles: ${files.join(', ')}`;
    }


    _getCodeSummary(codeAnalysis) {
        if (!codeAnalysis) return "No code analysis data.";
        let summary = "";
        for (const [file, data] of Object.entries(codeAnalysis)) {
            summary += `File: ${file}\n`;
            if (data.classes?.length) summary += `  Classes: ${data.classes.join(', ')}\n`;
            if (data.functions?.length) summary += `  Functions: ${data.functions.join(', ')}\n`;
            if (data.imports?.length) summary += `  Imports: ${data.imports.slice(0, 5).join(', ')}\n`;
        }
        return summary || "Basic file structure identified.";
    }
}

export default new AIService();
