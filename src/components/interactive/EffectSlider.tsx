'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EffectExample {
  r: string;
  e: string;
  a: string;
  code: string;
  description: string;
  realWorld: string;
}

const effectExamples: EffectExample[] = [
  {
    r: 'Any',
    e: 'Nothing',
    a: 'Int',
    code: 'ZIO.succeed(42)',
    description: 'Pure value - no environment needed, cannot fail, returns an Int',
    realWorld: 'Constants, pure computations, successful results'
  },
  {
    r: 'Console',
    e: 'IOException',
    a: 'String',
    code: 'Console.readLine',
    description: 'Reads from console - needs Console service, can fail with IOException, returns String',
    realWorld: 'Reading user input, CLI applications'
  },
  {
    r: 'DatabaseService',
    e: 'SqlError',
    a: 'User',
    code: 'ZIO.serviceWithZIO[DatabaseService](_.findUser(id))',
    description: 'Database query - needs DB service, can fail with SQL errors, returns User',
    realWorld: 'CRUD operations, data persistence'
  },
  {
    r: 'HttpClient',
    e: 'HttpError',
    a: 'Response',
    code: 'ZIO.serviceWithZIO[HttpClient](_.get(url))',
    description: 'HTTP request - needs HTTP client, can fail with network errors, returns Response',
    realWorld: 'API calls, microservice communication'
  },
  {
    r: 'Logger & Config',
    e: 'AppError',
    a: 'Unit',
    code: 'ZIO.serviceWithZIO[Logger](_.info("Processing..."))',
    description: 'Logging operation - needs Logger & Config, can fail with app errors, returns Unit',
    realWorld: 'Structured logging, monitoring, observability'
  },
];

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  label: string;
  color: string;
}

const Slider = ({ value, onChange, max, label, color }: SliderProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <div className="relative">
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={cn(
          "w-full h-2 rounded-lg appearance-none cursor-pointer slider",
          `slider-${color}`
        )}
      />
      <div 
        className={cn(
          "absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg pointer-events-none",
          color === 'r' && "bg-primary-500",
          color === 'e' && "bg-danger-500",
          color === 'a' && "bg-success-500"
        )}
        style={{ 
          left: `calc(${(value / max) * 100}% - 8px)` 
        }}
      />
    </div>
  </div>
);

export default function EffectSlider() {
  const [selectedExample, setSelectedExample] = useState(0);
  const currentExample = effectExamples[selectedExample];

  return (
    <div className="space-y-8">
      {/* ZIO Type Signature Display */}
      <div className="bg-gray-900 rounded-2xl p-8 text-center">
        <div className="text-2xl font-mono text-white mb-4">
          <span className="text-gray-400">ZIO[</span>
          <motion.span 
            key={currentExample.r}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary-400 font-bold"
          >
            {currentExample.r}
          </motion.span>
          <span className="text-gray-400">, </span>
          <motion.span 
            key={currentExample.e}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-danger-400 font-bold"
          >
            {currentExample.e}
          </motion.span>
          <span className="text-gray-400">, </span>
          <motion.span 
            key={currentExample.a}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-success-400 font-bold"
          >
            {currentExample.a}
          </motion.span>
          <span className="text-gray-400">]</span>
        </div>
        
        {/* Type explanations */}
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="bg-primary-950/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-primary-400 rounded-full" />
              <span className="font-semibold text-primary-400">Environment (R)</span>
            </div>
            <p className="text-gray-300">What this effect needs to run</p>
          </div>
          
          <div className="bg-danger-950/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-danger-400 rounded-full" />
              <span className="font-semibold text-danger-400">Error (E)</span>
            </div>
            <p className="text-gray-300">How this effect can fail</p>
          </div>
          
          <div className="bg-success-950/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-success-400 rounded-full" />
              <span className="font-semibold text-success-400">Value (A)</span>
            </div>
            <p className="text-gray-300">What this effect produces</p>
          </div>
        </div>
      </div>

      {/* Example Selector */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Choose an Example:
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {effectExamples.map((example, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedExample(index)}
              className={cn(
                "p-4 rounded-xl text-left transition-all border-2",
                selectedExample === index 
                  ? "bg-primary-50 border-primary-200 dark:bg-primary-950/20 dark:border-primary-800" 
                  : "bg-white border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-1">
                ZIO[{example.r}, {example.e}, {example.a}]
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {example.realWorld}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Current Example Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedExample}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4"
        >
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
            Example: {currentExample.realWorld}
          </h4>
          
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-green-400 font-mono text-sm">
              <code>{currentExample.code}</code>
            </pre>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {currentExample.description}
          </p>
          
          {/* Swiss Army Knife Analogy */}
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20 rounded-lg p-4 border border-primary-200 dark:border-primary-800">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔧</div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                  Swiss Army Knife Analogy
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Like a Swiss Army knife that tells you exactly what tools it has, 
                  ZIO effects tell you exactly what they need (R), how they can fail (E), 
                  and what they produce (A). No surprises, no hidden requirements!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}