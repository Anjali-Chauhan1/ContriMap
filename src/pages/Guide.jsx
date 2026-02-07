import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Map, 
  Lightbulb, 
  Rocket, 
  Settings, 
  Github, 
  Link as LinkIcon,
  Search,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Guide = () => {
  const steps = [
    {
      icon: LinkIcon,
      title: 'Enter Repository URL',
      description: 'Find a project you want to contribute to on GitHub and paste its URL into the Analyze page.',
      color: 'blue'
    },
    {
      icon: Search,
      title: 'Wait for AI Analysis',
      description: 'Our AI engine deep-scans the codebase, parses the structure, and builds a comprehensive mental model.',
      color: 'purple'
    },
    {
      icon: Map,
      title: 'Explore the Mind Map',
      description: 'Visualize the project architecture. Find "beginner-friendly" zones highlighted in green.',
      color: 'green'
    },
    {
      icon: Rocket,
      title: 'Start Contributing',
      description: 'Follow the step-by-step contribution guide and tackle beginner-ready issues.',
      color: 'orange'
    }
  ];

  const faqs = [
    {
      q: 'Which repositories can I analyze?',
      a: 'Any public GitHub repository can be analyzed. Private repositories are not supported yet.'
    },
    {
      q: 'How long does the analysis take?',
      a: 'Typically between 30 seconds and 2 minutes, depending on the repository size and complexity.'
    },
    {
      q: 'What is a "Beginner-Friendly" area?',
      a: 'These are directories or components that our AI identifies as having cleaner abstractions or being less critical to the core engine, making them safer and easier for new contributors.'
    },
    {
      q: 'Does it cost anything?',
      a: 'ContriMap is currently free to use during our beta phase.'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Documentation & Help</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How to use <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ContriMap</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your roadmap from "What is this repo?" to "My first Pull Request".
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative bg-[#141414] border border-white/10 p-8 rounded-2xl hover:border-blue-500/30 transition-all group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent rounded-2xl pointer-events-none" />
                <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br transition-all group-hover:scale-110 ${
                  step.color === 'blue' ? 'from-blue-600 to-blue-400' :
                  step.color === 'purple' ? 'from-purple-600 to-purple-400' :
                  step.color === 'green' ? 'from-green-600 to-green-400' :
                  'from-orange-600 to-orange-400'
                }`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="relative z-10 text-xl font-bold text-white mb-3">
                  <span className="text-gray-600 mr-2">{index + 1}.</span> {step.title}
                </h3>
                <p className="relative z-10 text-gray-400 leading-relaxed italic">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Features Highlights */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 rounded-3xl p-8 md:p-12 mb-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-6">Key UI Features</h2>
              <ul className="space-y-6 text-gray-400">
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Visual Architecture Map</strong>
                    Don't get lost in folders. Our interactive mind map shows how modules connect.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <strong className="text-white block mb-1">AI Data Flow Insights</strong>
                    Understand how data moves from user input to database outputs without reading every line.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <strong className="text-white block mb-1">Contribution Roadmap</strong>
                    Step-by-step tasks tailored to your skill level and the project's specific needs.
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20" />
                <BookOpen className="w-48 h-48 text-blue-500 relative z-10 animate-pulse-slow" />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <HelpCircle className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="relative p-6 bg-[#141414] border border-white/10 rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent rounded-xl pointer-events-none" />
                <h4 className="relative z-10 text-white font-bold mb-3">{faq.q}</h4>
                <p className="relative z-10 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[#111827] border border-white/5 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to try it out?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto italic">
            Pick a repository and see how AI can transform your contribution experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/analyze"
              className="bg-white px-8 py-4 rounded-xl font-bold text-black flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-blue-500/20"
            >
              <Lightbulb className="w-5 h-5" />
              Analyze a Repository
            </Link>
            <Link
              to="/analyze"
              className="bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-bold text-white hover:bg-white/10 transition-all flex items-center gap-2"
            >
              Browse Examples
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
