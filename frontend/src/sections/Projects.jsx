import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Button from '../components/Button';
import { projectsData } from '../lib/portfolioData';

const ProjectCard = ({
  title,
  subtitle,
  description,
  tech,
  delay,
  githubUrl,
  liveUrl,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-red-900/20 hover:border-red-600/40 transition-all duration-300 overflow-hidden group"
    >
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors duration-300">
          {title}
        </h3>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-red-400">
          {subtitle}
        </p>

        <p className="text-gray-500 leading-relaxed mb-6">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tech.map((t, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-red-600/10 border border-red-600/20 rounded-full text-sm text-red-400 font-medium"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {/* GitHub Button */}
          <Button
            variant="outline"
            className="text-sm px-5 py-2"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={16} />
            View Code
          </Button>

          {/* Live Demo Button */}
          {liveUrl && (
            <Button
              className="text-sm px-5 py-2 bg-red-600 hover:bg-red-700"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} />
              Live
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Selected <span className="text-red-600">Projects</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-gray-400 md:text-lg">
            Concise, production-oriented work focused on secure platforms and intelligent automation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
