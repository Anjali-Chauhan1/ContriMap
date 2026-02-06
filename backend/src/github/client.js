import { graphql } from '@octokit/graphql';
import axios from 'axios';
import { config } from '../config.js';

class GitHubClient {
    constructor() {
        this.token = config.GITHUB_TOKEN;
        console.log("TOKEN in constructor:", this.token ? 'LOADED ' : 'UNDEFINED ');
        
        this.restClient = axios.create({
            baseURL: 'https://api.github.com',
            headers: {
                'Authorization': `token ${this.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
    }

    getGraphQLClient() {
        return graphql.defaults({
            headers: {
                authorization: `token ${this.token}`,
            },
        });
    }

  
    parseRepoUrl(url) {
        const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
        const match = url.match(regex);

        if (!match) {
            throw new Error('Invalid GitHub repository URL');
        }

        return {
            owner: match[1],
            name: match[2].replace('.git', '')
        };
    }

    async getRepoInfo(owner, name) {
        try {
            const graphqlWithAuth = this.getGraphQLClient();
            const { repository } = await graphqlWithAuth(
                `
        query($owner: String!, $name: String!) {
          repository(owner: $owner, name: $name) {
            name
            description
            url
            stargazerCount
            forkCount
            openIssues: issues(states: OPEN) {
              totalCount
            }
            primaryLanguage {
              name
            }
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                node {
                  name
                }
                size
              }
            }
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
            defaultBranchRef {
              name
            }
          }
        }
        `,
                { owner, name }
            );

            return {
                name: repository.name,
                description: repository.description,
                url: repository.url,
                stars: repository.stargazerCount,
                forks: repository.forkCount,
                openIssues: repository.openIssues.totalCount,
                primaryLanguage: repository.primaryLanguage?.name,
                languages: repository.languages.edges.map(edge => edge.node.name),
                topics: repository.repositoryTopics.nodes.map(node => node.topic.name),
                defaultBranch: repository.defaultBranchRef?.name || 'main'
            };
        } catch (error) {
            console.error('Error fetching repo info:', error);
            throw new Error(`Failed to fetch repository information: ${error.message}`);
        }
    }

   
    async getRepoTree(owner, name, branch = 'main') {
        try {
            const response = await this.restClient.get(
                `/repos/${owner}/${name}/git/trees/${branch}?recursive=1`
            );

            return response.data.tree;
        } catch (error) {
            console.error('Error fetching repo tree:', error);
            throw new Error(`Failed to fetch repository tree: ${error.message}`);
        }
    }

    // Get file content
    async getFileContent(owner, name, path, branch = 'main') {
        try {
            const response = await this.restClient.get(
                `/repos/${owner}/${name}/contents/${path}?ref=${branch}`
            );

            if (response.data.content) {
                return Buffer.from(response.data.content, 'base64').toString('utf-8');
            }

            return null;
        } catch (error) {
            console.error(`Error fetching file ${path}:`, error.message);
            return null;
        }
    }

    // Get repository issues
    async getIssues(owner, name, state = 'open', labels = null) {
        try {
            let url = `/repos/${owner}/${name}/issues?state=${state}&per_page=100`;

            if (labels) {
                url += `&labels=${labels}`;
            }

            const response = await this.restClient.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching issues:', error);
            throw new Error(`Failed to fetch issues: ${error.message}`);
        }
    }

    async getBeginnerIssues(owner, name) {
        const beginnerLabels = [
            'good first issue',
            'beginner-friendly',
            'easy',
            'starter',
            'help wanted'
        ];

        try {
            const allIssues = [];

            for (const label of beginnerLabels) {
                try {
                    const issues = await this.getIssues(owner, name, 'open', label);
                    allIssues.push(...issues);
                } catch (err) {
                    continue;
                }
            }

            const uniqueIssues = Array.from(
                new Map(allIssues.map(issue => [issue.id, issue])).values()
            );

            return uniqueIssues;
        } catch (error) {
            console.error('Error fetching beginner issues:', error);
            return [];
        }
    }


    async getReadme(owner, name) {
        try {
            const response = await this.restClient.get(
                `/repos/${owner}/${name}/readme`
            );

            if (response.data.content) {
                return Buffer.from(response.data.content, 'base64').toString('utf-8');
            }

            return null;
        } catch (error) {
            console.error('Error fetching README:', error.message);
            return null;
        }
    }

    async getContributing(owner, name) {
        const possiblePaths = [
            'CONTRIBUTING.md',
            'CONTRIBUTING',
            '.github/CONTRIBUTING.md',
            'docs/CONTRIBUTING.md'
        ];

        for (const path of possiblePaths) {
            const content = await this.getFileContent(owner, name, path);
            if (content) {
                return content;
            }
        }

        return null;
    }

   
    async getMaintainerStats(owner, name) {
        try {
            const graphqlWithAuth = this.getGraphQLClient();
            
           
            const { repository } = await graphqlWithAuth(
                `
                query($owner: String!, $name: String!) {
                    repository(owner: $owner, name: $name) {
                        pullRequests(states: [MERGED, CLOSED], last: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
                            nodes {
                                createdAt
                                closedAt
                                reviews(first: 1) {
                                    nodes {
                                        createdAt
                                    }
                                }
                            }
                        }
                        issues(states: [CLOSED], last: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
                            nodes {
                                createdAt
                                closedAt
                                comments(first: 1) {
                                    nodes {
                                        createdAt
                                    }
                                }
                            }
                        }
                    }
                }
                `,
                { owner, name }
            );

            // Calculate average response time
            const prs = repository.pullRequests.nodes;
            const issues = repository.issues.nodes;

            let totalResponseTime = 0;
            let count = 0;

            // Analyze PRs
            prs.forEach(pr => {
                if (pr.reviews.nodes.length > 0) {
                    const created = new Date(pr.createdAt);
                    const firstReview = new Date(pr.reviews.nodes[0].createdAt);
                    const responseHours = (firstReview - created) / (1000 * 60 * 60);
                    totalResponseTime += responseHours;
                    count++;
                }
            });

            // Analyze Issues
            issues.forEach(issue => {
                if (issue.comments.nodes.length > 0) {
                    const created = new Date(issue.createdAt);
                    const firstComment = new Date(issue.comments.nodes[0].createdAt);
                    const responseHours = (firstComment - created) / (1000 * 60 * 60);
                    totalResponseTime += responseHours;
                    count++;
                }
            });

            const avgResponseHours = count > 0 ? totalResponseTime / count : 48;
            const avgResponseDays = Math.ceil(avgResponseHours / 24);

            return {
                avgResponseDays,
                avgResponseHours: Math.round(avgResponseHours),
                activityLevel: avgResponseDays <= 1 ? 'very-active' : 
                               avgResponseDays <= 3 ? 'active' : 
                               avgResponseDays <= 7 ? 'moderate' : 'slow'
            };
        } catch (error) {
            console.error('Error fetching maintainer stats:', error.message);
            return {
                avgResponseDays: 3,
                avgResponseHours: 72,
                activityLevel: 'moderate'
            };
        }
    }
}

export default new GitHubClient();
