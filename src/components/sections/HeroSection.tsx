'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Section, Container, Button } from '@/components/ui';

interface LeakyBucketProps {
  className?: string;
}

const LeakyBucket = ({ className }: LeakyBucketProps) => (
  <motion.div 
    className={`relative ${className}`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5, duration: 0.6 }}
  >
    <div className="relative">
      {/* Bucket */}
      <div className="w-24 h-32 bg-gray-300 dark:bg-gray-600 rounded-b-2xl border-4 border-gray-400 dark:border-gray-500 relative">
        <div className="absolute top-2 left-2 right-2 h-20 bg-gradient-to-b from-blue-400 to-blue-600 rounded-sm opacity-60" />
        
        {/* Leaks */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-8 bg-blue-400 ${i === 0 ? 'left-2' : i === 1 ? 'left-6' : 'right-2'} bottom-${i * 2 + 4}`}
            animate={{ 
              height: [8, 12, 8],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
      
      {/* Label */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <span className="text-sm font-mono text-danger-600 dark:text-danger-400">Future</span>
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Leaky & Eager</div>
      </div>
      
      {/* Error indicators */}
      <motion.div
        className="absolute -top-4 -right-2 text-danger-500"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ⚠️
      </motion.div>
    </div>
  </motion.div>
);

const SealedVault = ({ className }: LeakyBucketProps) => (
  <motion.div 
    className={`relative ${className}`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.8, duration: 0.6 }}
  >
    <div className="relative">
      {/* Vault */}
      <div className="w-24 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl border-4 border-primary-500 relative overflow-hidden shadow-xl">
        <div className="absolute inset-2 bg-gradient-to-b from-primary-300/50 to-primary-700/50 rounded-xl" />
        
        {/* Lock */}
        <motion.div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-400 rounded-full border-2 border-accent-500"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="absolute top-1 left-1 w-4 h-4 border-2 border-accent-600 rounded-full border-b-transparent" />
        </motion.div>
        
        {/* Plumbing pipes */}
        <div className="absolute -bottom-2 left-6 w-3 h-6 bg-gray-400 dark:bg-gray-500 rounded-t-sm" />
        <div className="absolute -bottom-2 right-6 w-3 h-6 bg-gray-400 dark:bg-gray-500 rounded-t-sm" />
      </div>
      
      {/* Label */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <span className="text-sm font-mono text-primary-600 dark:text-primary-400">ZIO</span>
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Pure & Lazy</div>
      </div>
      
      {/* Success indicator */}
      <motion.div
        className="absolute -top-4 -right-2 text-success-500"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ✨
      </motion.div>
    </div>
  </motion.div>
);

export default function HeroSection() {
  return (
    <Section id="hero" className="min-h-screen flex items-center" background="accent" padding="none">
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ZIO is what{' '}
            <span className="text-danger-500 relative">
              Future
              <motion.div
                className="absolute -inset-1 bg-danger-500/10 rounded-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </span>
            {' '}wishes it could be
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            If Future is a leaky bucket, ZIO is a vault with plumbing. 
            Learn functional effects that are{' '}
            <span className="font-semibold text-primary-600 dark:text-primary-400">pure</span>,{' '}
            <span className="font-semibold text-primary-600 dark:text-primary-400">type-safe</span>, and{' '}
            <span className="font-semibold text-primary-600 dark:text-primary-400">composable</span>.
          </motion.p>
          
          {/* Visual Metaphor */}
          <div className="flex items-center justify-center gap-12 mb-16">
            <LeakyBucket />
            
            <motion.div
              className="text-4xl text-gray-400 dark:text-gray-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              →
            </motion.div>
            
            <SealedVault />
          </div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Button 
              size="lg"
              onClick={() => document.getElementById('what-is-zio')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-8 py-4"
            >
              Start Learning ZIO
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-8 py-4"
            >
              Try in Playground
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </Container>
    </Section>
  );
}