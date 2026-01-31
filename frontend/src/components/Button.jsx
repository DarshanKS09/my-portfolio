import React from 'react';
import { motion } from 'framer-motion';
import { glowOnHover } from '../utils/motionVariants';

const Button = ({ children, variant = 'primary', onClick, href, download, className = '' }) => {
  const baseStyles = 'px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2';
  
  const variants = {
    primary: 'bg-red-600 text-white hover:bg-red-700 border-2 border-red-600',
    outline: 'bg-transparent text-red-500 border-2 border-red-500 hover:bg-red-500/10',
    ghost: 'bg-transparent text-gray-300 hover:text-white hover:bg-white/5'
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href, target: '_blank', rel: 'noopener noreferrer', ...(download ? { download } : {}) } : { onClick };

  return (
    <Component
      {...props}
      {...glowOnHover}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  );
};

export default Button;