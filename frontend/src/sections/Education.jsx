import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { educationData } from '../lib/portfolioData';

const Education = () => {
  return (
    <section id="education" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Education
          </h2>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-3xl border border-red-900/25 bg-gradient-to-br from-zinc-950 to-zinc-900 p-6 md:p-8"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-red-600/10 p-3 text-red-400">
                <GraduationCap size={22} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {educationData.degree}
                </h3>
                <p className="mt-2 text-gray-300">{educationData.institution}</p>
              </div>
            </div>
            <div className="rounded-full border border-zinc-800 bg-black/30 px-4 py-2 text-sm font-medium text-gray-300">
              {educationData.dates}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {educationData.meta.map((item) => (
              <span
                key={item}
                className="rounded-full border border-red-600/20 bg-red-600/10 px-4 py-2 text-sm text-red-300"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default Education;
