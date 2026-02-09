import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, 
  AlertCircle, 
  ExternalLink, 
  Tag,
  Calendar,
  MessageSquare,
  Route,
  X,
  ChevronRight,
  BookOpen,
  FileCode,
  TestTube,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { repoAPI, analysisAPI } from '../../services/api';
import { formatDate } from '../../utils/helpers';

const BeginnerIssues = ({ owner, name }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [issues, setIssues] = useState([]);
  const [roadmapLoading, setRoadmapLoading] = useState(null);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  const fetchIssues = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await repoAPI.getBeginnerIssues(owner, name);
      
      if (response.success) {
        setIssues(response.data.slice(0, 6)); 
        if (response.data.length === 0) {
          setError('No beginner-friendly issues found. This repository may not have issues labeled as "good first issue" or similar.');
        }
      } else {
        setError('Failed to fetch beginner issues. Repository may not exist or may be private.');
      }
    } catch (err) {
      console.error('Error fetching beginner issues:', err);
      if (err.response?.status === 404) {
        setError('Repository not found. Please check if the repository exists and is public.');
      } else if (err.response?.status === 403) {
        setError('Access denied. This repository may be private or rate limit exceeded.');
      } else {
        setError('Failed to load beginner issues. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, [owner, name]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const handleGenerateRoadmap = async (issueNumber) => {
    try {
      setRoadmapLoading(issueNumber);
      const response = await analysisAPI.getIssueRoadmap(owner, name, issueNumber);
      
      if (response.success) {
        setSelectedRoadmap(response.data);
      } else {
        console.error('Failed to generate roadmap:', response.message);
      }
    } catch (err) {
      console.error('Error generating roadmap:', err);
      if (err.response?.status === 404) {
        alert('Repository not analyzed yet. Please analyze the repository first to generate issue roadmaps.');
      } else {
        alert('Failed to generate roadmap. Please try again.');
      }
    } finally {
      setRoadmapLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#1a2333] border border-[#2d3748] rounded-xl flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-3" />
          <p className="text-gray-400">Finding beginner-friendly issues...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6"
      >
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-800 dark:text-red-200">Unable to Load Issues</h3>
            <p className="text-sm text-red-600 dark:text-red-300 mt-1">{error}</p>
            <button
              onClick={fetchIssues}
              className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#171515] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-semibold mb-1 text-white flex items-center gap-2">
            <Route className="w-5 h-5 text-green-400" />
            Beginner-Friendly Issues
          </h3>
          <p className="text-gray-400 text-sm italic">Great starting points for your first contribution</p>
        </div>
        <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
          {issues.length} {issues.length === 1 ? 'issue' : 'issues'}
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {issues.length === 0 && !error ? (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 mb-2">No beginner-friendly issues found</p>
            <p className="text-gray-500 text-sm">This repository may not have issues labeled with "good first issue", "beginner-friendly", or similar tags.</p>
          </div>
        ) : (
          issues.map((issue, index) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#0a0a0a] border border-white/10 p-5 rounded-xl hover:border-white/20 transition-all group"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-500">#{issue.number}</span>
                    {issue.labels && issue.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {issue.labels.slice(0, 2).map((label) => (
                          <span
                            key={label.id}
                            className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                            style={{
                              backgroundColor: `#${label.color}15`,
                              color: `#${label.color}`,
                              border: `1px solid #${label.color}30`
                            }}
                          >
                            {label.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-semibold text-white hover:text-blue-400 transition-colors text-sm md:text-base mb-3 leading-tight"
                  >
                    {issue.title}
                  </a>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(issue.created_at)}</span>
                    </div>
                    {issue.comments > 0 && (
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{issue.comments} comments</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleGenerateRoadmap(issue.number)}
                    disabled={roadmapLoading === issue.number}
                    className="flex items-center justify-center space-x-2 bg-white hover:bg-gray-100 px-4 py-2 rounded-lg text-xs font-bold text-blue-700 hover:scale-105 transition-all shadow-lg disabled:opacity-50"
                  >
                    {roadmapLoading === issue.number ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Zap className="w-3.5 h-3.5" />
                    )}
                    <span>AI Roadmap</span>
                  </button>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-slate-700/50 border border-slate-600/50 px-4 py-2 rounded-lg text-xs font-bold text-white hover:bg-slate-600/50 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </div>

      <AnimatePresence>
        {selectedRoadmap && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRoadmap(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col"
            >
          
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-200 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">
                    <Zap className="w-4 h-4" />
                    AI-Generated Roadmap
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                    #{selectedRoadmap.issueNumber}: {selectedRoadmap.issueTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedRoadmap(null)}
                  className="p-2 rounded-full hover:bg-gray-200 transition-all"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6 bg-gray-50">

                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-blue-600 mb-4 uppercase tracking-wider">
                    <Route className="w-4 h-4" /> Implementation Steps
                  </h4>
                  <div className="space-y-3">
                    {selectedRoadmap.roadmap.steps.map((step, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-[10px] font-bold text-blue-700 group-hover:scale-110 transition-all">
                            {i + 1}
                          </div>
                          {i !== selectedRoadmap.roadmap.steps.length - 1 && (
                            <div className="w-0.5 h-full bg-blue-200 mt-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-green-700 mb-4 uppercase tracking-wide">
                      <div className="p-1.5 bg-green-200 rounded-lg">
                        <BookOpen className="w-4 h-4 text-green-700" />
                      </div>
                      Modules to Study
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedRoadmap.roadmap.modulesToUnderstand.map((m, i) => (
                        <li key={i} className="text-sm text-gray-800 flex items-start gap-2 bg-white border border-green-100 px-3 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                          <ChevronRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="font-semibold">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-purple-700 mb-4 uppercase tracking-wide">
                      <div className="p-1.5 bg-purple-200 rounded-lg">
                        <FileCode className="w-4 h-4 text-purple-700" />
                      </div>
                      Probable Edits
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedRoadmap.roadmap.filesToChange.map((f, i) => (
                        <li key={i} className="text-sm text-gray-800 flex items-start gap-2 bg-white border border-purple-100 px-3 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:border-purple-200 transition-all">
                          <ChevronRight className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <code className="bg-purple-100 px-2 py-1 rounded-md text-purple-900 font-mono text-xs font-bold border border-purple-200">{f}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>


                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 p-5 rounded-2xl shadow-md">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-orange-700 mb-3 uppercase tracking-wide">
                      <div className="p-1.5 bg-orange-200 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-orange-700" />
                      </div>
                      Common Pitfalls
                    </h4>
                    <ul className="space-y-2">
                      {selectedRoadmap.roadmap.commonMistakes.map((m, i) => (
                        <li key={i} className="text-sm text-gray-800 flex items-start gap-3 bg-white border border-orange-100 px-4 py-3 rounded-lg shadow-sm hover:shadow-md hover:border-orange-200 transition-all">
                          <span className="text-orange-600 font-bold text-lg leading-none">•</span>
                          <span className="font-medium">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 p-5 rounded-2xl shadow-md">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-teal-700 mb-3 uppercase tracking-wide">
                      <div className="p-1.5 bg-teal-200 rounded-lg">
                        <TestTube className="w-4 h-4 text-teal-700" />
                      </div>
                      Testing Area
                    </h4>
                    <ul className="space-y-2">
                      {selectedRoadmap.roadmap.testingAreas.map((t, i) => (
                        <li key={i} className="text-sm text-gray-800 flex items-start gap-3 bg-white border border-teal-100 px-4 py-3 rounded-lg shadow-sm hover:shadow-md hover:border-teal-200 transition-all">
                          <span className="text-teal-600 font-bold text-lg leading-none">•</span>
                          <span className="font-medium">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

   
              <div className="p-6 bg-white border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedRoadmap(null)}
                  className="px-6 py-2 rounded-xl text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
                >
                  Close
                </button>
                <a
                  href={`https://github.com/${owner}/${name}/issues/${selectedRoadmap.issueNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-100 px-6 py-2 rounded-xl text-sm font-bold text-blue-700 flex items-center gap-2 transition-all shadow-lg"
                >
                  Start Working
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mt-8 text-center relative z-10">
        <a
          href={`https://github.com/${owner}/${name}/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest"
        >
          <span>Explore all 24+ beginner issues</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

export default BeginnerIssues;
