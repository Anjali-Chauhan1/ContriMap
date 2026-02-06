import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://contrimap.onrender.com/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Repository APIs
export const repoAPI = {
    // Analyze a repository
    analyze: async (repoUrl) => {
        const response = await api.post('/repos/analyze', { repoUrl });
        return response.data;
    },

    // Get analysis status
    getAnalysisStatus: async (analysisId) => {
        const response = await api.get(`/repos/analysis/${analysisId}/status`);
        return response.data;
    },

    // Get repository analysis
    getAnalysis: async (owner, name) => {
        const response = await api.get(`/repos/${owner}/${name}`);
        return response.data;
    },

    // Get beginner-friendly issues
    getBeginnerIssues: async (owner, name) => {
        const response = await api.get(`/repos/${owner}/${name}/issues/beginner`);
        return response.data;
    },

    // Search repositories
    search: async (query) => {
        const response = await api.get(`/repos/search`, { params: { query } });
        return response.data;
    },
};

// Analysis APIs
export const analysisAPI = {
    // Get mind map data
    getMindMap: async (owner, name) => {
        const response = await api.get(`/analysis/${owner}/${name}/mindmap`);
        return response.data;
    },

    // Get AI insights
    getInsights: async (owner, name) => {
        const response = await api.get(`/analysis/${owner}/${name}/insights`);
        return response.data;
    },

    // Generate issue roadmap
    getIssueRoadmap: async (owner, name, issueNumber) => {
        const response = await api.get(`/analysis/${owner}/${name}/issues/${issueNumber}/roadmap`);
        return response.data;
    },

    // Generate PR checklist
    getPRChecklist: async (owner, name, changes) => {
        const response = await api.post(`/analysis/${owner}/${name}/pr-checklist`, { changes });
        return response.data;
    },
};

export default api;
