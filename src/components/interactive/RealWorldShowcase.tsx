'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Zap, TrendingUp, Database, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface UseCase {
  id: string;
  title: string;
  company: string;
  industry: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
  tech: string[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

const useCases: UseCase[] = [
  {
    id: 'microservices',
    title: 'Microservices Backend',
    company: 'TechCorp',
    industry: 'E-commerce',
    description: 'High-performance microservices handling 100M+ requests daily with complex business logic and external integrations.',
    icon: <Building className="w-6 h-6" />,
    color: 'bg-blue-500',
    benefits: [
      '99.9% uptime with automatic retries and circuit breakers',
      '10x faster development with ZIO Test and layers',
      'Zero memory leaks with structured concurrency',
      '50% reduction in infrastructure costs'
    ],
    tech: ['ZIO HTTP', 'ZIO Streams', 'ZIO Config', 'ZIO Logging'],
    quote: {
      text: "ZIO's structured concurrency eliminated our memory leaks and timeout issues. Our services now handle 10x more load on the same hardware.",
      author: "Sarah Chen",
      role: "Principal Engineer"
    }
  },
  {
    id: 'data-pipeline',
    title: 'Real-time Data Pipeline',
    company: 'DataFlow Inc',
    industry: 'Analytics',
    description: 'Processing millions of events per minute with complex transformations, enrichments, and real-time analytics.',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'bg-green-500',
    benefits: [
      'Process 5M events/minute with ZIO Streams',
      'Automatic backpressure handling',
      'Zero data loss with transactional guarantees',
      'Real-time monitoring and observability'
    ],
    tech: ['ZIO Streams', 'ZIO Kafka', 'ZIO Metrics', 'ZIO AWS'],
    quote: {
      text: "ZIO Streams made our complex event processing pipeline both performant and maintainable. The backpressure handling is magical.",
      author: "Marcus Rodriguez",
      role: "Data Engineering Lead"
    }
  },
  {
    id: 'fintech',
    title: 'Financial Trading System',
    company: 'TradeMax',
    industry: 'Finance',
    description: 'Low-latency trading platform processing thousands of transactions per second with strict regulatory compliance.',
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-yellow-500',
    benefits: [
      'Sub-millisecond latency for critical paths',
      'Bulletproof error handling for financial operations',
      'Complete audit trail with ZIO Logging',
      'Regulatory compliance with typed errors'
    ],
    tech: ['ZIO', 'ZIO Streams', 'ZIO Redis', 'Custom protocols'],
    quote: {
      text: "ZIO's typed errors saved us from catastrophic trading bugs. When money's on the line, you need compile-time guarantees.",
      author: "James Thompson",
      role: "CTO"
    }
  },
  {
    id: 'gaming',
    title: 'Multiplayer Game Backend',
    company: 'GameStudio',
    industry: 'Gaming',
    description: 'Real-time multiplayer game servers handling millions of concurrent players with low latency requirements.',
    icon: <Globe className="w-6 h-6" />,
    color: 'bg-purple-500',
    benefits: [
      '1M+ concurrent players per server',
      'Real-time leaderboards and matchmaking',
      'Automatic player state synchronization',
      '90% reduction in server crashes'
    ],
    tech: ['ZIO', 'ZIO Actors', 'ZIO Redis', 'WebSocket'],
    quote: {
      text: "ZIO fibers let us handle massive player concurrency without the complexity of traditional actor systems. Game-changing, literally.",
      author: "Alex Kim",
      role: "Backend Lead"
    }
  },
  {
    id: 'iot',
    title: 'IoT Data Collection',
    company: 'SmartCity',
    industry: 'Smart Cities',
    description: 'Collecting and processing data from millions of IoT sensors across smart city infrastructure.',
    icon: <Database className="w-6 h-6" />,
    color: 'bg-indigo-500',
    benefits: [
      'Handle 10M sensor readings/hour',
      'Automatic device failure detection',
      'Edge computing with ZIO streams',
      'Real-time city dashboard updates'
    ],
    tech: ['ZIO Streams', 'ZIO MQTT', 'ZIO Metrics', 'ZIO Config'],
    quote: {
      text: "ZIO's resource management ensures our IoT collectors never leak connections, even when sensors go offline unexpectedly.",
      author: "Dr. Emma Watson",
      role: "IoT Platform Architect"
    }
  }
];

export default function RealWorldShowcase() {
  const [selectedCase, setSelectedCase] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setSelectedCase(prev => (prev + 1) % useCases.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentCase = useCases[selectedCase];

  return (
    <div className="space-y-8">
      {/* Case Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {useCases.map((useCase, index) => (
            <motion.button
              key={useCase.id}
              onClick={() => {
                setSelectedCase(index);
                setIsAutoPlaying(false);
              }}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border',
                selectedCase === index
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={cn(
                'p-1 rounded text-white',
                selectedCase === index ? 'bg-white/20' : useCase.color
              )}>
                {useCase.icon}
              </div>
              <span className="hidden sm:inline">{useCase.industry}</span>
            </motion.button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-sm"
        >
          {isAutoPlaying ? 'Pause' : 'Auto Play'}
        </Button>
      </div>

      {/* Main Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className={cn('p-8 text-white', currentCase.color)}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  {currentCase.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{currentCase.title}</h3>
                  <p className="text-white/80">{currentCase.company} • {currentCase.industry}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/80">Case Study</div>
                <div className="text-lg font-semibold">{selectedCase + 1} / {useCases.length}</div>
              </div>
            </div>
            
            <p className="mt-6 text-white/90 text-lg leading-relaxed">
              {currentCase.description}
            </p>
          </div>

          <div className="p-8">
            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-success-500" />
                  Key Benefits
                </h4>
                <ul className="space-y-2">
                  {currentCase.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 bg-success-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary-500" />
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentCase.tech.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border-l-4 border-primary-500"
            >
              <p className="text-gray-700 dark:text-gray-300 italic mb-4 leading-relaxed">
                "{currentCase.quote.text}"
              </p>
              <footer className="flex items-center gap-3">
                <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold', currentCase.color)}>
                  {currentCase.quote.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {currentCase.quote.author}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {currentCase.quote.role}, {currentCase.company}
                  </div>
                </div>
              </footer>
            </motion.blockquote>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="flex justify-center gap-2">
        {useCases.map((_, index) => (
          <motion.div
            key={index}
            className={cn(
              'h-2 rounded-full transition-all',
              selectedCase === index ? 'bg-primary-500 w-8' : 'bg-gray-300 dark:bg-gray-600 w-2'
            )}
            animate={selectedCase === index && isAutoPlaying ? {
              scaleX: [0, 1],
              transformOrigin: 'left'
            } : {}}
            transition={{ duration: 5, ease: 'linear' }}
          />
        ))}
      </div>

      {/* Statistics */}
      <div className="grid sm:grid-cols-3 gap-6 mt-12">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            100M+
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Requests handled daily
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-success-600 dark:text-success-400 mb-2">
            99.9%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Average uptime
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
            50%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Reduced development time
          </div>
        </div>
      </div>
    </div>
  );
}