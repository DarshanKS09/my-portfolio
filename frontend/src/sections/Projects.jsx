import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Button from '../components/Button';

const ProjectCard = ({
  title,
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
  const projects = [
    {
      title: 'Fitness Tracker App',
      description:
        'Full-stack MERN fitness tracker with personalized diet recommendations, workout logging, calorie tracking, and secure JWT-based authentication with protected routes.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
      githubUrl:
        'https://github.com/DarshanKS09/FitnessTracker',
      liveUrl:
        'https://fitnesstracker-lyart.vercel.app/',
      delay: 0.1,
    },
    {
      title:
        'PropertyHub – Production-Grade Real Estate Marketplace',
      description:
        'Full-stack MERN real estate platform with role-based authentication, secure JWT (HTTP-only cookies), OTP email verification, Cloudinary image uploads, advanced property filtering, notifications, and dynamic property detail pages. Deployed with distributed frontend/backend architecture (Vercel + Render).',
      tech: [
        'MongoDB',
        'Express',
        'React (Vite)',
        'Node.js',
        'JWT',
        'Cloudinary',
      ],
      githubUrl:
        'https://github.com/DarshanKS09/real-estate-project',
      liveUrl:
        'https://real-estate-project-psi-sage.vercel.app/',
      delay: 0.2,
    },
    {
      title: 'Token Management & Risk Analyzer',
      description:
        'BEP-20 token deployment system on BNB Smart Chain with comprehensive dashboard for supply monitoring and risk engine for detecting unusual transfers.',
      tech: [
        'Solidity',
        'BNB Chain',
        'Web3.js',
        'React',
        'MongoDB',
      ],
      githubUrl:
        'https://github.com/DarshanKS09/Project-DRG',
      delay: 0.3,
    },
  ];

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Featured{' '}
            <span className="text-red-600">
              Projects
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Building impactful solutions with modern web and
            blockchain technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
