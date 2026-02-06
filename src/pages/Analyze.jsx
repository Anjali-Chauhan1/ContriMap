import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  GitBranch, 
  Search, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { repoAPI } from '../services/api';
import { isValidGitHubUrl, parseGitHubUrl } from '../utils/helpers';

const Analyze = () => {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle'); 
  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError('');

    // Validate URL
    if (!repoUrl.trim()) {
      setError('Please enter a repository URL');
      return;
    }

    if (!isValidGitHubUrl(repoUrl)) {
      setError('Please enter a valid GitHub repository URL');
      return;
    }

    try {
      setLoading(true);
      setStatus('analyzing');

      // Parse URL
      const { owner, name } = parseGitHubUrl(repoUrl);

      // Start analysis
      const response = await repoAPI.analyze(repoUrl);

      if (response.success) {
        if (response.cached) {
          // Already analyzed, redirect immediately
          setStatus('success');
          setTimeout(() => {
            navigate(`/repo/${owner}/${name}`);
          }, 1000);
        } else {
          // Start polling for status
          const analysisId = response.data.analysisId;
          setStatus('polling');
          pollAnalysisStatus(analysisId, owner, name);
        }
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.response?.data?.message || 'Failed to analyze repository');
      setStatus('error');
      setLoading(false);
    }
  };

  const pollAnalysisStatus = async (analysisId, owner, name, attempts = 0) => {
    const maxAttempts = 60; 
    const pollInterval = 2000; 

    if (attempts >= maxAttempts) {
      setError('Analysis is taking longer than expected. Please try again later.');
      setStatus('error');
      setLoading(false);
      return;
    }

    try {
      const response = await repoAPI.getAnalysisStatus(analysisId);

      if (response.success) {
        const { status: analysisStatus, error: analysisError } = response.data;

        if (analysisStatus === 'completed') {
          setStatus('success');
          setLoading(false);
          setTimeout(() => {
            navigate(`/repo/${owner}/${name}`);
          }, 1000);
        } else if (analysisStatus === 'failed') {
          setError(analysisError || 'Analysis failed');
          setStatus('error');
          setLoading(false);
        } else {
          
          setTimeout(() => {
            pollAnalysisStatus(analysisId, owner, name, attempts + 1);
          }, pollInterval);
        }
      }
    } catch (err) {
      console.error('Polling error:', err);
      setTimeout(() => {
        pollAnalysisStatus(analysisId, owner, name, attempts + 1);
      }, pollInterval);
    }
  };

 

  return (
    <div className="min-h-screen pt-24 pb-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex mt-20 items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6 font-medium text-white text-sm">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>AI-Powered Repository Analysis</span>
          </div>

          <h1 className="text-4xl md:text-3xl  font-bold mb-4">
            Analyze Any <span className=" bg-clip-text  bg-gradient-to-r from-cyan-50 via-sky-100 to-blue-50 ">GitHub Repository</span>
          </h1>
          <p className="text-sm text-gray-400">
            Get instant insights, visual mind maps, and contribution guidance
          </p>
        </motion.div>

        {/* Analysis Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0c0f0f] border border-[#84a0ac] rounded-xl p-4 mb-8 transition-all duration-300 hover:border-[#4a5568] hover:shadow-xl max-w-2xl mx-auto"
          style={{ transform: 'scale(0.5)' }}
        > 
          <form onSubmit={handleAnalyze} className="space-y-3 ">
            <div>
              <label htmlFor="repo-url" className="block text-sm font-medium text-gray-300 mb-2">
                Repository URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <GitBranch className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="repo-url"
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/owner/repository"
                  className="w-full px-4 py-3 pl-12 rounded-lg bg-[#e8ebf3] border border-[#3d4b5f] text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
                  disabled={loading}
                />
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center space-x-2 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </motion.div>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-0.7rem bg-blue-100 px-5 ml-50 mt-7 py-2 rounded-lg font-medium text-gray-900 flex items-center justify-center space-x-2 text-lg  "
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>
                    {status === 'analyzing' && 'Starting Analysis...'}
                    {status === 'polling' && 'Analyzing Repository...'}
                  </span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Analyze Repository</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </motion.button>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center space-x-2 text-green-400"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Analysis complete! Redirecting...</span>
              </motion.div>
            )}
          </form>
        </motion.div>

     
       
      </div>
    </div>
  );
};

export default Analyze;
