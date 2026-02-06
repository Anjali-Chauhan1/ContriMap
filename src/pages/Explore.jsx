import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  GitBranch, 
  Star, 
  GitFork, 
  Eye, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { repoAPI } from '../services/api';
import { formatNumber } from '../utils/helpers';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [featuredRepos, setFeaturedRepos] = useState([
    {
      owner: 'facebook',
      name: 'react',
      description: 'The library for web and native user interfaces',
      stars: 215000,
      forks: 44000,
      language: 'JavaScript',
    },
    {
      owner: 'vercel',
      name: 'next.js',
      description: 'The React Framework',
      stars: 112000,
      forks: 25000,
      language: 'TypeScript',
    },
    {
      owner: 'tailwindlabs',
      name: 'tailwindcss',
      description: 'A utility-first CSS framework for rapid UI development.',
      stars: 72000,
      forks: 4000,
      language: 'HTML',
    },
    {
      owner: 'microsoft',
      name: 'vscode',
      description: 'Visual Studio Code',
      stars: 152000,
      forks: 28000,
      language: 'TypeScript',
    }
  ]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const response = await repoAPI.search(searchQuery);
      if (response.success) {
        setRepos(response.data);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Explore <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Open Source</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Discover popular projects and beginner-friendly repositories analyzed by AI.
          </motion.p>
        </div>

        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for repositories by name, language, or topic..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-xl transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 rounded-xl font-medium hover:scale-105 transition-all shadow-lg shadow-blue-500/20"
            >
              Search
            </button>
          </form>
        </motion.div>

        {/* Search Results / Featured */}
        <div className="space-y-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-400">Searching repositories...</p>
            </div>
          ) : searchQuery && repos.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Search className="w-6 h-6 text-blue-400" />
                Search Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo, index) => (
                  <RepoCard key={index} repo={repo} />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Featured Section */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                    Popular Repositories
                  </h2>
                  <Link to="/analyze" className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 group">
                    Analyze yours <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredRepos.map((repo, index) => (
                    <RepoCard key={index} repo={repo} />
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                {['JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'Next.js', 'Tailwind', 'AI'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSearchQuery(cat)}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 transition-all text-white font-medium flex items-center justify-between group"
                  >
                    <span>{cat}</span>
                    <Sparkles className="w-4 h-4 text-gray-500 group-hover:text-yellow-400 transition-colors" />
                  </button>
                ))}
              </div>
            </>
          )}

          {searchQuery && !loading && repos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-4">No repositories found matching your search.</p>
              <Link
                to="/analyze"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-white hover:bg-white/10 transition-all"
              >
                <Sparkles className="w-5 h-5 text-blue-400" />
                Analyze a new repository
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RepoCard = ({ repo }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative bg-[#141414] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      <div className="relative z-10 p-6">
        <Link 
          to={`/repo/${repo.owner}/${repo.name}`}
          className="flex items-center space-x-3 mb-4 group/title"
        >
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 transition-transform group-hover/title:scale-110">
            <GitBranch className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-bold truncate transition-colors group-hover/title:text-blue-400">
              {repo.owner} / {repo.name}
            </h3>
            <div className="text-xs text-gray-500">{repo.language}</div>
          </div>
        </Link>
        
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 h-10 italic">
          {repo.description || 'No description available for this repository.'}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-400 text-xs">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{formatNumber(repo.stars)}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-xs">
              <GitFork className="w-4 h-4 text-blue-500" />
              <span>{formatNumber(repo.forks)}</span>
            </div>
          </div>
          <Link 
            to={`/repo/${repo.owner}/${repo.name}`}
            className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-xs font-bold"
          >
            <span>Analyze</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Explore;
