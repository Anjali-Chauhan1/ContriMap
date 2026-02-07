import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ 
  text, 
  speed = 100, 
  className = "", 
  onComplete = () => {},
  startDelay = 0 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(startDelay === 0);

  useEffect(() => {
    if (startDelay > 0) {
      const delayTimeout = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);
      return () => clearTimeout(delayTimeout);
    }
  }, [startDelay]);

  useEffect(() => {
    if (!hasStarted) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true);
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete, isComplete, hasStarted]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="inline-block w-[3px] h-[1em] bg-blue-400 ml-1"
        />
      )}
    </span>
  );
};

const TypewriterSequence = ({ onComplete, lines: customLines, align = 'center' }) => {
  const [currentLine, setCurrentLine] = useState(0);
  
  const defaultLines = [
    { 
      text: "Understand Any Repo", 
      className: "text-5xl md:text-7xl font-bold text-white",
      delay: 500
    },
    { 
      text: "Contribute with Confidence", 
      className: "text-5xl md:text-7xl font-bold text-blue-200",
      delay: 800
    }
  ];

  const lines = customLines || defaultLines;

  const handleLineComplete = () => {
    if (currentLine < lines.length - 1) {
      setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 500);
    } else {
      if (onComplete) {
        setTimeout(onComplete, 500); 
      }
    }
  };

  return (
    <div className={`flex flex-col ${align === 'left' ? 'items-start' : 'items-center'} justify-center`}>
      {lines.map((line, index) => (
        <div key={index} className="mb-4">
          {index <= currentLine && (
            <TypewriterText
              text={line.text}
              className={line.className}
              speed={80}
              startDelay={index === 0 ? line.delay : 0}
              onComplete={index === currentLine ? handleLineComplete : () => {}}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TypewriterSequence;
