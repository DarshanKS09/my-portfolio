import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../lib/socialLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' },
    { icon: Mail, href: SOCIAL_LINKS.email, label: 'Email' },
  ];

  return (
    <footer className="bg-black border-t border-red-900/20 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-1">Darshan K S</h3>
            <p className="text-gray-600 text-sm">Full Stack & Blockchain Developer</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex gap-4"
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
                  className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-red-600/40 text-gray-500 transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mt-8 pt-8 border-t border-zinc-900"
        >
          <p className="text-gray-600 text-sm">
            © {currentYear} Darshan K S. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;