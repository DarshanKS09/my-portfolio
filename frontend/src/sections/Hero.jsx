import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Button from '../components/Button';
import { fadeInUp, staggerContainer } from '../utils/motionVariants';
import profileImg from '../imgs/img new.png';
import { SOCIAL_LINKS } from '../lib/socialLinks';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-96 h-96">
              {/* Red glow backdrop */}
              <div className="absolute inset-0 bg-gradient-radial from-red-600/30 via-red-900/10 to-transparent rounded-full blur-3xl" />
              
              {/* Inner red circle */}
              <div className="absolute inset-12 bg-gradient-to-br from-red-600/40 to-red-900/20 rounded-full" />
              
              {/* Portrait circle */}
              <div className="absolute inset-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border-2 border-red-600/30 flex items-center justify-center overflow-hidden">
                <img
                  src={profileImg}
                  alt="DKS"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <motion.p
              variants={fadeInUp}
              className="text-red-500 font-medium tracking-wide"
            >
              Hi, I'm
            </motion.p>
            
            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-7xl font-bold text-white leading-tight"
            >
              Darshan K S
            </motion.h1>
            
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl text-gray-400 font-light"
            >
              Full Stack Web3 Developer
            </motion.h2>
            
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 text-lg leading-relaxed max-w-xl"
            >
              Building impactful web and blockchain solutions with expertise in MERN stack and smart contract development. 
              Transforming ideas into scalable, production-ready applications.
            </motion.p>
            
            {/* Social Links */}
            <motion.div
              variants={fadeInUp}
              className="flex gap-4 pt-4"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, color: '#dc2626' }}
                    className="text-gray-500 hover:text-red-600 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={24} />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="pt-4 flex gap-4">
             <a
  href="/resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button variant="outline">Resume</Button>
</a>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;