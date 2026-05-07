import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Blocks, Wrench } from 'lucide-react';
import { skillsData } from '../lib/portfolioData';

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
  const iconMap = {
    Frontend: Code,
    Backend: Blocks,
    Databases: Database,
    'AI / Systems': Wrench,
    'Tools & Platforms': Wrench,
  };

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Technical <span className="text-red-600">Skills</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-gray-400 md:text-lg">
            A compact snapshot of the tools and systems I use to ship modern software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((category, index) => (
            <SkillCard
              key={category.title}
              {...category}
              icon={iconMap[category.title]}
              delay={0.1 + (index * 0.1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
