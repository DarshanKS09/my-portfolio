import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Code2, Briefcase, GraduationCap } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, suffix = '', delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-4 p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full"
        >
          <Icon size={40} className="text-cyan-400" />
        </motion.div>
        <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          {count}{suffix}
        </h3>
        <p className="text-gray-400 font-medium">{label}</p>
      </div>
    </motion.div>
  );
};

const Stats = () => {
  const stats = [
    { icon: GraduationCap, value: '8', suffix: '.35', label: 'CGPA', delay: 0.1 },
    { icon: Code2, value: '15', suffix: '+', label: 'Technologies', delay: 0.2 },
    { icon: Briefcase, value: '10', suffix: '+', label: 'Major Projects', delay: 0.3 },
    { icon: Award, value: '6', suffix: '+', label: 'Languages Known', delay: 0.4 },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;