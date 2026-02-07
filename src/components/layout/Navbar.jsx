import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GitBranch, Home, Search, BookOpen, Sparkles } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Guide', href: '/guide' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
    >
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 shadow-xl shadow-white/5">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="relative bg-gradient-to-r from-[#6d4af7] to-[#5d7ad3] p-2 rounded-lg group-hover:opacity-80 transition-all">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-blue-300">ContriMap</span>
              <span className="text-xs text-gray-300">AI Contribution Assistant</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  location.pathname === item.href ? 'text-blue-300' : 'text-gray-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/analyze"
              className="bg-white px-6 py-2 rounded-full font-medium text-black flex items-center space-x-2 text-sm hover:bg-gray-100 transition-all shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Repo</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
