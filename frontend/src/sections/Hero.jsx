import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/motionVariants';
import profileImg from '../imgs/img new.png';
import { SOCIAL_LINKS } from '../lib/socialLinks';
import { heroData } from '../lib/portfolioData';

const Hero = () => {
  const socialLinks = [
    { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: SOCIAL_LINKS.email, label: 'Email' },
  ];

  return (
    <section id="home" className="flex items-center pt-24 pb-12 md:min-h-0 md:pt-28">
      <div className="max-w-6xl mx-auto w-full px-6">
        <div className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-5"
          >
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full border border-red-600/25 bg-red-600/10 px-4 py-2 font-medium text-red-400">
                Portfolio
              </span>
              <span className="text-gray-500">AI systems, full-stack development, workflow automation</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold leading-tight text-white md:text-6xl"
            >
              {heroData.name}
            </motion.h1>

            <motion.h2
              variants={fadeInUp}
              className="text-xl font-medium text-gray-300 md:text-2xl"
            >
              {heroData.role}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="max-w-xl text-sm leading-7 text-gray-500 md:text-base"
            >
              AI systems, full-stack development, and practical workflow automation.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-1">
              {heroData.quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="rounded-full border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-gray-300 transition-colors duration-300 hover:border-red-600/40 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex gap-4 pt-1"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    whileHover={{ y: -3, color: '#dc2626' }}
                    className="text-gray-500 transition-colors duration-300 hover:text-red-600"
                    aria-label={social.label}
                  >
                    <Icon size={22} />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative flex items-center justify-center md:justify-end"
          >
            <div className="relative h-72 w-72 sm:h-80 sm:w-80">
              <div className="absolute inset-0 bg-gradient-radial from-red-600/30 via-red-900/10 to-transparent rounded-full blur-3xl" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-red-600/30 to-red-950/10" />
              <div className="absolute inset-8 overflow-hidden rounded-full border border-red-600/25 bg-gradient-to-br from-gray-800 to-gray-950 flex items-center justify-center">
                <img
                  src={profileImg}
                  alt="DKS"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
