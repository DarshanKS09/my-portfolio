import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare } from 'lucide-react';
import Button from '../components/Button';
import { fadeInUp } from '../utils/motionVariants';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for reaching out!');
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Get In <span className="text-red-600">Touch</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Let's discuss your next project
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-10 rounded-2xl border border-red-900/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <User size={20} className="absolute left-4 top-4 text-gray-600" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-gray-600 outline-none focus:border-red-600 transition-colors duration-300"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-4 text-gray-600" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-gray-600 outline-none focus:border-red-600 transition-colors duration-300"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <MessageSquare size={20} className="absolute left-4 top-4 text-gray-600" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows="6"
                  className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-gray-600 outline-none focus:border-red-600 transition-colors duration-300 resize-none"
                />
              </div>
            </div>

            <Button variant="primary" className="w-full justify-center">
              <Send size={20} />
              Send Message
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
            <p className="text-gray-500">
              Or email me directly at{' '}
              <a
                href="mailto:darshuks09@gmail.com"
                className="text-red-500 hover:text-red-400 transition-colors duration-300"
              >
                darshuks09@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;