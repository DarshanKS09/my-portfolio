import React from 'react';
import { motion } from 'framer-motion';
import { heroData } from '../lib/portfolioData';

const Summary = () => {
  return (
    <section id="summary" className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-red-900/20 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-6 md:p-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Summary
            </h2>
            <p className="max-w-4xl text-base leading-7 text-gray-300 md:text-lg">
              {heroData.summary}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Summary;
