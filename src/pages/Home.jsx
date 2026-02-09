import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  GitBranch, 
  Map, 
  Lightbulb, 
  Target, 
  Zap, 
  Shield,
  ArrowRight,
  Sparkles,
  Code,
  Users,
  TrendingUp
} from 'lucide-react';
import TypewriterSequence from '../components/UI/TypewriterSequence';
import InsightRobot from '../components/UI/ThreeD/InsightRobot';
import Logo3D from '../components/UI/ThreeD/Logo3D';
import LaserFlow from '../components/UI/LaserFlow/LaserFlow';
import  LiquidEther from '../components/UI/LiquidEther/LiquidEther';


const Home = ({ onIntroComplete }) => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  const handleSequenceComplete = () => {
    setShowContent(true);
    if (onIntroComplete) onIntroComplete();
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section  */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-screen">
        {/* LaserFlow Background */}
        <div className="absolute inset-x-0 bottom-[-27vh] pointer-events-none">
          <div className="relative h-[55vh]">
            <LaserFlow 
              color="#c3f7f9"
              wispDensity={1}
              fogIntensity={1.25}
              wispSpeed={15}
              flowSpeed={0.03}
              horizontalBeamOffset={0.1}
              verticalBeamOffset={0.0}
              horizontalSizing={4}
              verticalSizing={5}
              wispIntensity={6.0}
              flowStrength={0.25}
              fogScale={0.2}
              fogFallSpeed={0.7}
              decay={1.1}
              falloffStart={1.8}
              dpr={0.8}
              mouseSmoothTime={0.15}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent" />
          </div>
        </div>
        {/* LiquidEther hero aura */}
        <div
          className="pointer-events-none absolute "
          
        >
          <div
            className="relative w-[min(1300vw,1800px)] max-w-[1500px] -top-10 opacity-60 mix-blend-screen"
            style={{ aspectRatio: '1 / 1', filter: 'drop-shadow(0 0 80px rgba(140,115,242,0.25))' }}
          >
            <LiquidEther
              mouseForce={8}
              cursorSize={70}
              isViscous
              viscous={20}
              colors={["#8c73f2","#c8d4ee","#d9d0fb"]}
              autoDemo
              autoSpeed={0.8}
              autoIntensity={2.5}
              isBounce={false}
              resolution={0.25}
              iterationsViscous={16}
              iterationsPoisson={16}
              dt={0.016}
              BFECC={false}
              className="w-full h-full"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.95 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="inline-flex items-center space-x-2 px-4 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">AI-Powered Open Source Assistant</span>
            </motion.div>

            {/* Heading with Typewriter Effect */}
            <TypewriterSequence onComplete={handleSequenceComplete} />

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
            >
              ContriMap analyzes GitHub repositories and provides AI-powered guidance to help you understand, navigate, and contribute to open-source projects.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
               transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
               className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/analyze')}
                className="bg-white px-8 py-4 rounded-2xl font-medium text-black flex items-center justify-center space-x-2 text-lg hover:bg-gray-100 transition-all sm:mr-4"
              >
                <span>Get Started</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/guide')}
                className="bg-transparent border-2 border-white/20 px-8 py-4 rounded-2xl font-medium text-white/70 flex items-center justify-center space-x-2 text-lg hover:bg-white/5 transition-all"
              >
                <span>Learn More</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3D Logo Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
        className="py-24 bg-gradient-to-r from-cyan-50 via-sky-100 to-blue-50 relative overflow-hidden"
      >
        {/* Light gradient glow effect */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-white/60 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-cyan-200/40 rounded-full blur-[80px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-8">
                Everything You Need to <span className="text-slate-900">Contribute.</span>
              </h2>
              <p className="text-xl text-slate-700 max-w-lg">
                Powerful features designed to make open-source contribution accessible to everyone.
              </p>
            </motion.div>
            
            <div className="hidden md:block">
              <Logo3D />
            </div>
          </div>
        </div>
      </motion.section>

      {/* AI Powered Insights Section  */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.9, ease: "easeInOut" }}
        className="py-24 bg-black relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Robot */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <InsightRobot />
            </motion.div>

            {/* Right side - Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2 text-left"
            >
              <TypewriterSequence 
                lines={[
                  { 
                    text: "AI Powered Insights", 
                    className: "text-white leading-tight text-5xl md:text-6xl font-bold",
                    delay: 5
                  }
                ]}
                align="left"
              />
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-gray-300 text-xl mt-6 max-w-lg"
              >
                Get intelligent explanation of repository, architecture, dataflow and key components. Our AI assistant helps you navigate complex foundations with ease.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-8 space-y-4 text-gray-400 text-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Beginner-Friendly Issues</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Architecture Mapping</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>Interactive Walkthroughs</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
        className="py-32 bg-black"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-black border border-white/10 rounded-2xl p-6 text-center relative overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 py-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Contributing?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Analyze your first repository and get AI-powered guidance in seconds
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/analyze')}
                className="bg-white px-8 py-4 ml-70 rounded-2xl font-medium text-black flex items-center justify-center space-x-2 text-lg hover:bg-gray-100 transition-all"
              >
                Get Started Free
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
