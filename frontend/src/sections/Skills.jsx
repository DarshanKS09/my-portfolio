import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Blocks, Wrench } from 'lucide-react';
import { fadeInUp } from '../utils/motionVariants';

const SkillCard = ({ title, skills, icon: Icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 rounded-2xl border border-red-900/20 hover:border-red-600/40 transition-all duration-300 group"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-red-600/10 rounded-xl group-hover:bg-red-600/20 transition-colors duration-300">
          <Icon size={28} className="text-red-500" />
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + (index * 0.05), duration: 0.3 }}
            className="px-4 py-2 bg-zinc-800/50 rounded-lg text-sm text-gray-400 border border-zinc-800 hover:border-red-600/30 hover:text-red-400 transition-all duration-300"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: 'Web Development',
      icon: Code,
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'REST API'],
      delay: 0.1,
    },
    {
      title: 'Blockchain',
      icon: Blocks,
      skills: ['Solidity', 'Web3.js', 'Ethers.js', 'MetaMask', 'BNB Chain', 'Smart Contracts'],
      delay: 0.2,
    },
    {
      title: 'Databases',
      icon: Database,
      skills: ['MongoDB', 'SQL', 'RDBMS', 'IPFS'],
      delay: 0.3,
    },
    {
      title: 'Tools & Languages',
      icon: Wrench,
      skills: ['Git', 'GitHub', 'VS Code', 'C', 'Java', 'Python', 'Ganache'],
      delay: 0.4,
    },
  ];

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Technical <span className="text-red-600">Expertise</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Comprehensive toolkit for building modern full-stack and blockchain applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;