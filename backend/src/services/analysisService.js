import RepoAnalysis from '../models/RepoAnalysis.js';
import githubClient from '../github/client.js';
import structureParser from '../analysis/structureParser.js';
import mindmapBuilder from '../analysis/mindmapBuilder.js';
import codeParser from '../analysis/codeParser.js';
import aiService from '../ai/aiService.js';

class AnalysisService {
  async performAnalysis(analysisId, owner, repoName) {
    try {
      const analysis = await RepoAnalysis.findById(analysisId);
      if (!analysis) throw new Error('Analysis not found');

      /* ---------- 1. Repo Info ---------- */
      const repo = await githubClient.getRepoInfo(owner, repoName);

      Object.assign(analysis, {
        description: repo.description,
        stars: repo.stars,
        forks: repo.forks,
        openIssues: repo.openIssues,
        language: repo.primaryLanguage,
        languages: repo.languages,
        topics: repo.topics,
      });

      /* ---------- 2. Repo Structure ---------- */
      const tree = await githubClient.getRepoTree(
        owner,
        repoName,
        repo.defaultBranch
      );

      const structure = structureParser.parseRepoStructure(tree);
      analysis.structure = structure;

      /* ---------- 3. Deep Code Parsing ---------- */
      console.log(' Parsing important files...');
      const importantFiles =
        structureParser.identifyImportantFiles(structure).slice(0, 5);

      const codeAnalysis = {};

      for (const file of importantFiles) {
        const content = await githubClient.getFileContent(
          owner,
          repoName,
          file,
          repo.defaultBranch
        );

        if (!content) continue;

        const ext = file.split('.').pop();
        const parsed = await codeParser.parseFile(content, ext);

        if (parsed) codeAnalysis[file] = parsed;
      }

      analysis.codeAnalysis = codeAnalysis;

      /* ---------- 4. Maintainer Analysis ---------- */
      console.log('👥 Analyzing maintainer response time...');
      const maintainerStats = await githubClient.getMaintainerStats(owner, repoName);

      /* ---------- 5. Mind Map ---------- */
      analysis.mindMapData = mindmapBuilder.buildMindMap(
        structure,
        repoName,
        {
          repo,
          maintainerStats,
          languages: repo.languages,
          openIssues: repo.openIssues
        }
      );

      /* ---------- 5. Docs ---------- */
      const readme = await githubClient.getReadme(owner, repoName);
      const contributing = await githubClient.getContributing(
        owner,
        repoName
      );

      /* ---------- 6. AI Insights ---------- */
      analysis.aiInsights = await aiService.explainRepository({
        name: repoName,
        description: repo.description,
        languages: repo.languages,
        topics: repo.topics,
        structure,
        readme,
        codeAnalysis: analysis.codeAnalysis
      });

      /* ---------- 7. Contribution Guide ---------- */
      analysis.contributionGuide =
        await aiService.generateContributionGuide({
          name: repoName,
          languages: repo.languages,
          structure,
          contributing,
          readme,
          codeAnalysis: analysis.codeAnalysis
        });

      /* ---------- 8. PR Preparation Help ---------- */
      analysis.prPreparationHelp = await aiService.generatePRChecklist({
        name: repoName,
        languages: repo.languages,
        structure,
        codeAnalysis: analysis.codeAnalysis
      });

      //---------- Done ---------- */
      analysis.analysisStatus = 'completed';
      analysis.lastAnalyzedAt = new Date();

      await analysis.save();

      console.log(` Analysis completed: ${owner}/${repoName}`);
      return analysis;
    } catch (error) {
      console.error('Analysis failed:', error);

      const analysis = await RepoAnalysis.findById(analysisId);
      if (analysis) {
        analysis.analysisStatus = 'failed';
        analysis.analysisError = error.message;
        await analysis.save();
      }

      throw error;
    }
  }
}

export default new AnalysisService();
