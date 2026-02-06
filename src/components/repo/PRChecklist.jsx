import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  FileCheck, 
  ShieldCheck, 
  TestTube, 
  FileText, 
  Zap,
  Info,
  Rocket,
  ExternalLink
} from 'lucide-react';
import { repoAPI } from '../../services/api';

const PRChecklist = ({ owner, name }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checklist, setChecklist] = useState(null);

  useEffect(() => {
    fetchChecklist();
  }, [owner, name]);

  const fetchChecklist = async () => {
    try {
      setLoading(true);
      const response = await repoAPI.getAnalysis(owner, name);
      
      if (response.success && response.data.prPreparationHelp) {
        setChecklist(response.data.prPreparationHelp);
      } else if (response.success && response.data.analysisStatus === 'completed') {
        setError('PR preparation help not available for this repository.');
      } else if (response.success && response.data.analysisStatus === 'processing') {
        setError('Repository analysis is still in progress. Please wait and try again.');
      } else {
        setError('Repository not analyzed yet. Please analyze this repository first to get PR preparation help.');
      }
    } catch (err) {
      console.error('Error fetching PR checklist:', err);
      if (err.response?.status === 404) {
        setError('Repository not found or not analyzed yet. Please analyze this repository first.');
      } else {
        setError('Failed to load PR preparation help. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#1a2333] border border-[#2d3748] rounded-xl flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-3" />
          <p className="text-gray-400">Loading PR preparation guide...</p>
        </div>
      </div>
    );
  }

  if (error || !checklist) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a2333] border border-[#2d3748] rounded-xl flex flex-col items-center justify-center py-12 px-6 text-center"
      >
        <div className="p-3 rounded-full bg-yellow-500/10 mb-4 border border-yellow-500/20">
          <Info className="w-8 h-8 text-yellow-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">No PR Checklist Available</h3>
        <p className="text-gray-400 max-w-md mb-4">
          {error || 'The analysis for this repository is older and doesn\'t include the new PR Help data. Try re-analyzing the repository.'}
        </p>
        <button
          onClick={fetchChecklist}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  const sections = [
    {
      title: 'Pre-Submit Checks',
      icon: ShieldCheck,
      items: checklist.preSubmitChecks,
      color: 'blue',
      description: 'Ensure these tasks are done before opening your PR.'
    },
    {
      title: 'Code Quality Tips',
      icon: FileCheck,
      items: checklist.codeQualityTips,
      color: 'teal',
      description: 'Project-specific tips for better code.'
    },
    {
      title: 'Testing Recommendations',
      icon: TestTube,
      items: checklist.testingRecommendations,
      color: 'green',
      description: 'Verify your changes with these tests.'
    },
    {
      title: 'Documentation Needs',
      icon: FileText,
      items: checklist.documentationNeeds,
      color: 'purple',
      description: 'Make sure the documentation stays up to date.'
    },
    {
      title: 'Impacted Areas',
      icon: Zap,
      items: checklist.impactedAreas,
      color: 'orange',
      description: 'Review these areas for potential regressions.'
    }
  ];

  const colorMap = {
    blue: { text: 'text-blue-400', icon: 'bg-blue-500/20 border-blue-500/30', dot: 'bg-blue-400' },
    orange: { text: 'text-orange-400', icon: 'bg-orange-500/20 border-orange-500/30', dot: 'bg-orange-400' },
    green: { text: 'text-green-400', icon: 'bg-green-500/20 border-green-500/30', dot: 'bg-green-400' },
    purple: { text: 'text-purple-400', icon: 'bg-purple-500/20 border-purple-500/30', dot: 'bg-purple-400' },
    teal: { text: 'text-teal-400', icon: 'bg-teal-500/20 border-teal-500/30', dot: 'bg-teal-400' },
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-green-600 to-teal-600 shadow-lg shadow-green-500/20">
          <CheckCircle2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">PR Preparation Help</h2>
          <p className="text-gray-500 italic">Get your contribution ready for a smooth merge</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          const colors = colorMap[section.color];

          if (!section.items || section.items.length === 0) return null;

       
          const isMiddleCard = (idx % 3 === 1);
          const spanClass = isMiddleCard ? 'md:row-span-2' : '';

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-[#141414] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group relative overflow-hidden ${spanClass}`}
            >
       
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="relative z-10 h-full flex flex-col">
       
                <div className={`flex justify-center ${isMiddleCard ? 'mb-8' : 'mb-6'}`}>
                  <div className={`p-3 rounded-xl ${colors.icon} border group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                </div>

          
                <div className={`text-center ${isMiddleCard ? 'mb-8' : 'mb-6'}`}>
                  <h3 className="text-lg font-bold text-white mb-2">{section.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{section.description}</p>
                </div>

                <div className={`flex-grow ${isMiddleCard ? 'space-y-4' : 'space-y-3'}`}>
                  {section.items.map((item, i) => (
                    <div 
                      key={i}
                      className={`flex items-start gap-3 ${isMiddleCard ? 'text-base' : 'text-sm'} text-gray-400 hover:text-gray-300 transition-colors`}
                    >
                      <div className={`${isMiddleCard ? 'w-2 h-2' : 'w-1.5 h-1.5'} rounded-full ${colors.dot} mt-2 flex-shrink-0`} />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12">
          <Rocket className="w-24 h-24 text-white" />
        </div>
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2 text-white">Ready to submit?</h3>
          <p className="text-gray-500 text-sm max-w-2xl mb-4">
            A clean, well-tested Pull Request has a much higher chance of being accepted. Double-check your branch name, commit messages, and ensure you've linked the relevant issues in your PR description.
          </p>
          <a
            href={`https://github.com/${owner}/${name}/compare`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-white text-gray-900 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-all shadow-lg"
          >
            <span>Create Pull Request</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PRChecklist;
