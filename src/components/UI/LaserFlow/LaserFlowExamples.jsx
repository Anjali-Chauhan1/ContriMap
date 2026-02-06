import { useRef } from 'react';
import LaserFlow from './LaserFlow';

// Basic Usage Example
export const BasicLaserFlowExample = () => {
  return (
    <div 
      className="relative overflow-hidden"
      style={{ height: '500px' }}
    >
      <LaserFlow />
    </div>
  );
};

// Interactive Reveal Effect Example
export const LaserFlowRevealExample = () => {
  const revealImgRef = useRef(null);

  return (
    <div 
      className="relative overflow-hidden bg-gray-900"
      style={{ height: '800px' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', `${x}px`);
          el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
        }
      }}
      onMouseLeave={() => {
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', '-9999px');
          el.style.setProperty('--my', '-9999px');
        }
      }}
    >
      <LaserFlow
        horizontalBeamOffset={0.1}
        verticalBeamOffset={0.0}
        color="#c2e2ea"
        horizontalSizing={2}
        verticalSizing={0.1}
        wispDensity={1.7}
        wispSpeed={12}
        wispIntensity={9.7}
        flowSpeed={0.35}
        flowStrength={0.11}
        fogIntensity={0.67}
        fogScale={0.3}
        fogFallSpeed={0.86}
        decay={0.81}
        falloffStart={1.44}
      />
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 h-3/5 bg-gray-900 rounded-3xl border-2 border-pink-500 flex items-center justify-center text-white text-2xl z-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Interactive LaserFlow
          </h2>
          <p className="text-lg text-gray-300">
            Move your mouse to reveal hidden content
          </p>
        </div>
      </div>

      <div
        ref={revealImgRef}
        className="absolute w-full h-full top-0 left-0 z-5 pointer-events-none opacity-40"
        style={{
          background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 8s ease infinite',
          mixBlendMode: 'screen',
          '--mx': '-9999px',
          '--my': '-9999px',
          WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
      />
      
      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

// Hero Section Integration Example
export const LaserFlowHeroExample = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <LaserFlow
        color="#FF79C6"
        wispDensity={1.2}
        fogIntensity={0.5}
        wispSpeed={8}
        flowSpeed={0.3}
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

// Custom Color Variants Grid
export const LaserFlowVariants = () => {
  const variants = [
    { name: 'Cyber Pink', color: '#FF0080', wispDensity: 1.5, fogIntensity: 0.3 },
    { name: 'Electric Blue', color: '#00BFFF', wispDensity: 2.0, fogIntensity: 0.6 },
    { name: 'Neon Green', color: '#39FF14', wispDensity: 0.8, fogIntensity: 0.4 },
    { name: 'Golden Glow', color: '#FFD700', wispDensity: 1.3, fogIntensity: 0.5 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {variants.map((variant, index) => (
        <div key={index} className="h-80 relative overflow-hidden rounded-xl border-2" style={{ borderColor: `${variant.color}40` }}>
          <LaserFlow
            color={variant.color}
            wispDensity={variant.wispDensity}
            fogIntensity={variant.fogIntensity}
            wispSpeed={10 + index * 2}
            flowSpeed={0.2 + index * 0.1}
          />
          <div className="absolute bottom-5 left-5 text-white text-xl font-bold z-10" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            {variant.name}
          </div>
        </div>
      ))}
    </div>
  );
};

// Performance Optimized Example
export const LaserFlowOptimized = () => {
  return (
    <div className="h-96 relative overflow-hidden">
      <LaserFlow
        wispDensity={0.5}
        fogIntensity={0.2}
        wispSpeed={5}
        verticalSizing={1.0}
        horizontalSizing={0.3}
        dpr={1} // Force lower DPR for better performance
      />
      <div className="absolute inset-0 flex items-center justify-center z-10 text-white text-center">
        <div>
          <h3 className="text-2xl font-bold mb-2">Performance Mode</h3>
          <p className="text-gray-400">Optimized for mobile devices</p>
        </div>
      </div>
    </div>
  );
};

export default {
  BasicLaserFlowExample,
  LaserFlowRevealExample,
  LaserFlowHeroExample,
  LaserFlowVariants,
  LaserFlowOptimized
};