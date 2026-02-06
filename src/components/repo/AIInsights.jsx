import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Loader2, 
  AlertCircle, 
  Lightbulb, 
  Code2, 
  Layers, 
  FolderTree,
  FileCode,
  Workflow
} from 'lucide-react';
import { analysisAPI } from '../../services/api';

const AIInsights = ({ owner, name, detailed = false }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    fetchInsights();
  }, [owner, name]);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const response = await analysisAPI.getInsights(owner, name);
      
      if (response.success) {
        setInsights(response.data);
      }
    } catch (err) {
      console.error('Error fetching insights:', err);
      setError(err.response?.data?.message || 'Failed to load insights');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#1a2333] border border-[#dee4ee] rounded-xl flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-3" />
          <p className="text-gray-400">Generating AI insights...</p>
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

  if (!insights?.aiInsights) return null;

  const { aiInsights } = insights;

  const sections = [
    {
      icon: Lightbulb,
      title: 'Overview',
      content: aiInsights.overview,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      icon: Code2,
      title: 'Purpose',
      content: aiInsights.purpose,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Layers,
      title: 'Tech Stack',
      content: aiInsights.techStack,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      isList: true,
    },
    {
      icon: FolderTree,
      title: 'Main Components',
      content: aiInsights.mainComponents,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      isList: true,
    },
    {
      icon: Workflow,
      title: 'Data Flow',
      content: aiInsights.dataFlow,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
    },
    {
      icon: FolderTree,
      title: 'Key Folders',
      content: aiInsights.keyFolders,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      isList: true,
    },
    {
      icon: FileCode,
      title: 'Important Files',
      content: aiInsights.importantFiles,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      isList: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-400 to-blue-200 shadow-lg shadow-purple-500/20">
          <Lightbulb className="w-6 h-6 text-gray-900" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">AI-Powered Insights</h2>
          <p className="text-gray-400 italic">Intelligent analysis of repository structure and purpose</p>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${detailed ? 'lg:grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 auto-rows-auto`}>
        {sections.map((section, index) => {
          const Icon = section.icon;
          
          if (!section.content) return null;

          const cardSizeClasses = !detailed && [
            'md:col-span-2 md:row-span-2', 
            'md:col-span-1 md:row-span-1', 
            'md:col-span-1 md:row-span-2', 
            'md:col-span-2 md:row-span-1', 
            'md:col-span-1 md:row-span-1', 
            'md:col-span-2 md:row-span-1', 
            'md:col-span-3 md:row-span-1', 
          ];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-[#141414] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group relative overflow-hidden ${!detailed && cardSizeClasses ? cardSizeClasses[index] : ''}`}
            >

              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-start space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${section.bgColor} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${section.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold flex-1 text-white">{section.title}</h3>
                </div>

                {section.isList && Array.isArray(section.content) ? (
                  <ul className="space-y-2">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2 text-gray-400 text-sm">
                        <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 leading-relaxed text-sm">{section.content}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-white">Powered by AI</div>
            <div className="text-xs text-gray-400">
              These insights are generated using advanced language models
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
