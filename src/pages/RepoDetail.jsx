import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  GitFork, 
  AlertCircle, 
  Code, 
  Loader2,
  ExternalLink,
  BookOpen,
  Map as MapIcon,
  CheckCircle2
} from 'lucide-react';
import { repoAPI, analysisAPI } from '../services/api';
import { formatNumber, getLanguageColor } from '../utils/helpers';
import MindMap from '../components/repo/MindMap';
import AIInsights from '../components/repo/AIInsights';
import ContributionGuide from '../components/repo/ContributionGuide';
import BeginnerIssues from '../components/repo/BeginnerIssues';
import PRChecklist from '../components/repo/PRChecklist';

const RepoDetail = () => {
  const { owner, name } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [repoData, setRepoData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchRepoData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await repoAPI.getAnalysis(owner, name);
      
      if (response.success) {
        setRepoData(response.data);
      }
    } catch (err) {
      console.error('Error fetching repo data:', err);
      setError(err.response?.data?.message || 'Failed to load repository data');
    } finally {
      setLoading(false);
    }
  }, [owner, name]);

  useEffect(() => {
    fetchRepoData();
  }, [fetchRepoData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading repository analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-[#1a2333] border border-[#2d3748] rounded-xl p-8 max-w-md text-center shadow-xl">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Error Loading Repository</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button onClick={fetchRepoData} className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-lg font-medium text-white shadow-lg hover:shadow-blue-500/20 transition-all">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!repoData) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'mindmap', label: 'Mind Map', icon: MapIcon },
    { id: 'insights', label: 'Issues Guide', icon: Code },
    { id: 'contribute', label: 'Contribute', icon: GitFork },
    { id: 'pr-help', label: 'PR Help', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 font-inter bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Repository Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {owner} / <span className="bg-gradient-to-r from-blue-200 to-purple-100 bg-clip-text text-transparent">{name}</span>
              </h1>
              {repoData.description && (
                <p className="text-lg text-gray-400">{repoData.description}</p>
              )}
            </div>
            <a
              href={repoData.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg font-medium text-white flex items-center space-x-2 hover:bg-white/10 transition-all"
            >
              <span>View on GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="font-medium">{formatNumber(repoData.stars)}</span>
              <span className="text-gray-400 text-sm">stars</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg">
              <GitFork className="w-4 h-4 text-blue-400" />
              <span className="font-medium">{formatNumber(repoData.forks)}</span>
              <span className="text-gray-400 text-sm">forks</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg">
              <AlertCircle className="w-4 h-4 text-green-400" />
              <span className="font-medium">{formatNumber(repoData.openIssues)}</span>
              <span className="text-gray-400 text-sm">open issues</span>
            </div>
            {repoData.language && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: getLanguageColor(repoData.language) }}
                />
                <span className="font-medium">{repoData.language}</span>
              </div>
            )}
          </div>

          {/* Topics */}
          {repoData.topics && repoData.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {repoData.topics.map((topic, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {topic}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-200 to-purple-100 text-gray-800 shadow-lg shadow-blue-500/20'
                      : 'bg-white/5 backdrop-blur-md border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <AIInsights owner={owner} name={name} />
            </div>
          )}
          
          {activeTab === 'mindmap' && (
            <MindMap owner={owner} name={name} />
          )}
          
          {activeTab === 'insights' && (
            <BeginnerIssues owner={owner} name={name} />
          )}
          
          {activeTab === 'contribute' && (
            <ContributionGuide owner={owner} name={name} />
          )}
          
          {activeTab === 'pr-help' && (
            <PRChecklist owner={owner} name={name} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RepoDetail;
