import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Sparkles } from 'lucide-react';
import { experienceData } from '../lib/portfolioData';

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-red-600/25 bg-red-600/10 px-4 py-2 text-sm font-medium text-red-400">
              <Sparkles size={16} />
              Experience
            </span>
            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Professional work shaping AI workflows
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-gray-400 md:text-base">
            Hands-on experience across AI automation, LLM experimentation, and production-focused workflow systems.
          </p>
        </motion.div>

        <div className="space-y-5">
          {experienceData.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.title}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-3xl border border-red-900/25 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6 shadow-[0_0_0_1px_rgba(220,38,38,0.04)] md:p-8"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-red-500 to-red-900" />
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-red-600/10 p-3 text-red-400">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-base text-red-400">
                        {item.company}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-3 text-sm leading-7 text-gray-300 md:text-base">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-red-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0 rounded-full border border-zinc-800 bg-black/30 px-4 py-2 text-sm font-medium text-gray-300">
                  {item.dates}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
