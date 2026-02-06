import { motion } from 'framer-motion';
import { Github, Twitter, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const leftLinks = [
    { label: 'Explore', href: '/explore' },
    { label: 'Analyze', href: '/analyze' },
    { label: 'Guide', href: '/guide' },
    { label: 'Features', href: '/#features' },
    { label: 'About', href: '/#about' },
    { label: 'GitHub', href: 'https://github.com' },
  ];

  const rightLinks = [
    { label: 'Examples', href: '/explore' },
    { label: 'Community', href: '#community' },
    { label: 'Support', href: '#support' },
  ];

  return (
    <footer className="relative mt-5 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div>
            <p className="text-gray-500 text-base mb-4">Experience liftoff</p>
          </div>
          <div className="flex flex-col space-y-3">
            {leftLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-gray-400 hover:text-white text-base transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col space-y-3">
            {rightLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-white text-base transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mb-32 flex justify-center">
          <h2 className="text-[6rem] md:text-[10rem] lg:text-[14rem] xl:text-[18rem]  leading-none text-white tracking-tight text-center">
            ContriMap
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
           
            <span className="text-xl font-bold text-white">ContriMap</span>
          </div>

          <div className="flex items-center space-x-8">
            <a href="#about" className="text-gray-500 hover:text-white text-sm transition-colors">
              About ContriMap
            </a>
            <a href="#products" className="text-gray-500 hover:text-white text-sm transition-colors">
              Products
            </a>
            <a href="#privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy
            </a>
            <a href="#terms" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
