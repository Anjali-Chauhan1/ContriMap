import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Loader2, 
  AlertCircle, 
  Rocket, 
  CheckCircle2, 
  Code, 
  BookOpen 
} from 'lucide-react';
import { analysisAPI } from '../../services/api';

const ContributionGuide = ({ owner, name }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [guide, setGuide] = useState(null);

  const fetchGuide = useCallback(async () => {
    try {
      setLoading(true);
      const response = await analysisAPI.getInsights(owner, name);
      
      if (response.success) {
        setGuide(response.data.contributionGuide);
      }
    } catch (err) {
      console.error('Error fetching contribution guide:', err);
      setError(err.response?.data?.message || 'Failed to load contribution guide');
    } finally {
      setLoading(false);
    }
  }, [owner, name]);

  useEffect(() => {
    fetchGuide();
  }, [fetchGuide]);

  if (loading) {
    return (
      <div className="bg-[#1a2333] border border-[#2d3748] rounded-xl flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-3" />
          <p className="text-gray-400">Loading contribution guide...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1a2333] border border-[#2d3748] rounded-xl flex items-center justify-center py-12">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!guide) return null;

  const sections = [
    {
      icon: Rocket,
      title: 'Getting Started',
      items: guide.gettingStarted,
      color: 'blue',
      description: 'First steps to start contributing',
    },
    {
      icon: Code,
      title: 'Beginner-Friendly Areas',
      items: guide.beginnerFriendlyAreas,
      color: 'green',
      description: 'Best places to start for new contributors',
    },
    {
      icon: CheckCircle2,
      title: 'Setup Steps',
      items: guide.setupSteps,
      color: 'purple',
      description: 'How to set up the project locally',
    },
    {
      icon: BookOpen,
      title: 'Common Patterns',
      items: guide.commonPatterns,
      color: 'orange',
      description: 'Code patterns used in this project',
    },
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
    },
    green: {
      bg: 'bg-green-500/10',
      text: 'text-green-400',
      border: 'border-green-500/30',
    },
    purple: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
    },
    orange: {
      bg: 'bg-orange-500/10',
      text: 'text-orange-400',
      border: 'border-orange-500/30',
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-green-600 to-teal-600 shadow-lg shadow-green-500/20">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Contribution Guide</h2>
          <p className="text-gray-400 italic">Your personalized roadmap to contributing</p>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const colors = colorClasses[section.color];

          if (!section.items || section.items.length === 0) return null;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#141414] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all relative overflow-hidden"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                {/* Section Header */}
                <div className="flex items-start space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 text-white">{section.title}</h3>
                    <p className="text-xs text-gray-500">{section.description}</p>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {section.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center mt-0.5`}>
                          <span className={`text-xs font-bold ${colors.text}`}>{i + 1}</span>
                        </div>
                        <p className="text-gray-400 text-sm flex-1">{item}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tips Card */}
      <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <div className="relative z-10">
          <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2 text-white">
            <span className="text-xl">💡</span>
            <span>Pro Tips</span>
          </h3>
          <ul className="space-y-3 text-gray-400">
            {[
              "Start with documentation improvements or fixing typos - they're great first contributions",
              "Look for issues labeled \"good first issue\" or \"beginner-friendly\"",
              "Read the CONTRIBUTING.md file if available for project-specific guidelines",
              "Don't hesitate to ask questions in issues or discussions"
            ].map((tip, i) => (
              <li key={i} className="flex items-start space-x-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContributionGuide;
