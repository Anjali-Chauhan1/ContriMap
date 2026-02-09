import { useState, useEffect, useRef, useCallback } from 'react';
import mermaid from 'mermaid';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, Download } from 'lucide-react';
import { analysisAPI } from '../../services/api';

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  themeVariables: {
    fontSize: '16px',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  flowchart: {
    curve: 'basis',
    padding: 20,
    nodeSpacing: 80,
    rankSpacing: 100
  }
});

const MindMap = ({ owner, name }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mermaidCode, setMermaidCode] = useState('');
  const mermaidRef = useRef(null);

  const fetchAnalysis = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await analysisAPI.getMindMap(owner, name);
      
      console.log('API Response:', response); 
      
      if (response?.data?.mermaidCode) {
        setMermaidCode(response.data.mermaidCode);
      } else if (response?.data) {
        setError('Roadmap needs regeneration. Please analyze this repo again.');
      } else {
        setError('No roadmap data available. Analyze this repo first.');
      }
    } catch (err) {
      console.error('Error fetching mind map:', err);
      setError(err.response?.data?.message || 'Failed to load contributor roadmap');
    } finally {
      setLoading(false);
    }
  }, [owner, name]);

  useEffect(() => {
    if (owner && name) {
      fetchAnalysis();
    }
  }, [owner, name, fetchAnalysis]);

  useEffect(() => {
    if (mermaidCode && mermaidRef.current) {
      mermaidRef.current.innerHTML = '';

      mermaid.render('mermaid-diagram', mermaidCode).then(({ svg }) => {
        mermaidRef.current.innerHTML = svg;
      }).catch((err) => {
        console.error('Mermaid render error:', err);
        setError('Failed to render flowchart');
      });
    }
  }, [mermaidCode]);

  const handleDownload = () => {
    const svgElement = mermaidRef.current?.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}-contributor-roadmap.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
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
            <h3 className="font-semibold text-red-800 dark:text-red-200">Error Loading Roadmap</h3>
            <p className="text-sm text-red-600 dark:text-red-300 mt-1">{error}</p>
            <button
              onClick={fetchAnalysis}
              className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <div className="rounded-xl p-8">
        <div className="text-center space-y-6">
          <div className="inline-flex p-4 rounded-full bg-white/20 backdrop-blur-sm">
            <Download className="w-12 h-12 text-white" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Download Contributor Roadmap
            </h2>
            <p className="text-white/90">
              Get a visual mind map of the repository structure and contribution paths
            </p>
          </div>

          <button
            onClick={handleDownload}
            disabled={!mermaidCode}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg transition font-medium shadow-lg ${
              mermaidCode 
                ? 'bg-white hover:bg-gray-100 text-blue-700' 
                : 'bg-gray-500 cursor-not-allowed text-gray-300'
            }`}
          >
            <Download className="w-5 h-5" />
            <span>{mermaidCode ? 'Download SVG' : 'Roadmap Not Available'}</span>
          </button>
          
          {!mermaidCode && (
            <p className="text-gray-400 text-sm">
              Analyze this repository first to generate the contributor roadmap
            </p>
          )}
        </div>
      </div>

      {/* Hidden diagram for SVG generation */}
      <div 
        ref={mermaidRef}
        className="hidden"
      />
    </motion.div>
  );
};

export default MindMap;
