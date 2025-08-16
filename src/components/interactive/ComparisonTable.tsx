'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComparisonFeature {
  id: string;
  category: string;
  feature: string;
  description: string;
  zio: {
    status: 'excellent' | 'good' | 'fair' | 'poor';
    details: string;
    code?: string;
  };
  catsEffect: {
    status: 'excellent' | 'good' | 'fair' | 'poor';
    details: string;
    code?: string;
  };
}

const comparisonData: ComparisonFeature[] = [
  {
    id: 'learning-curve',
    category: 'Getting Started',
    feature: 'Learning Curve',
    description: 'How easy is it for new developers to get productive?',
    zio: {
      status: 'good',
      details: 'Steeper initially but comprehensive docs and built-in everything',
      code: 'ZIOApp.run(Console.printLine("Hello!"))'
    },
    catsEffect: {
      status: 'fair',
      details: 'Need to learn multiple libraries and how they fit together',
      code: 'IOApp.run(IO.println("Hello!"))'
    }
  },
  {
    id: 'batteries-included',
    category: 'Getting Started',
    feature: 'Batteries Included',
    description: 'How much comes out of the box vs needing extra libraries?',
    zio: {
      status: 'excellent',
      details: 'ZIO Test, ZIO Streams, ZIO Config, ZIO Logging, ZIO HTTP all official',
      code: 'import zio.test._ // Testing built-in'
    },
    catsEffect: {
      status: 'fair',
      details: 'Need to piece together: fs2, http4s, weaver-test, circe, etc.',
      code: 'import cats.effect.testing.scalatest._ // External'
    }
  },
  {
    id: 'error-handling',
    category: 'Core Features',
    feature: 'Error Handling',
    description: 'How are errors represented and handled?',
    zio: {
      status: 'excellent',
      details: 'Typed errors in ZIO[R, E, A]. Compiler forces you to handle all cases',
      code: 'ZIO[Any, AppError, User] // E is your error type'
    },
    catsEffect: {
      status: 'good',
      details: 'Throwable-based with MonadError. Good but not as type-safe',
      code: 'IO[User] // Errors are Throwable'
    }
  },
  {
    id: 'dependency-injection',
    category: 'Core Features',
    feature: 'Dependency Injection',
    description: 'How do you manage dependencies and services?',
    zio: {
      status: 'excellent',
      details: 'ZLayer system with compile-time DI resolution',
      code: 'program.provide(DbLayer >>> UserService.live)'
    },
    catsEffect: {
      status: 'fair',
      details: 'No built-in DI. Use cats-tagless or external libraries',
      code: '// Need external library like distage'
    }
  },
  {
    id: 'testing',
    category: 'Developer Experience',
    feature: 'Testing Support',
    description: 'Built-in testing framework and utilities',
    zio: {
      status: 'excellent',
      details: 'ZIO Test with property-based testing, mocking, time travel',
      code: 'test("user creation") { assertTrue(user.name == "John") }'
    },
    catsEffect: {
      status: 'good',
      details: 'Need external libraries like ScalaTest + cats-effect-testing',
      code: 'import cats.effect.testing.scalatest._'
    }
  },
  {
    id: 'concurrency',
    category: 'Performance',
    feature: 'Concurrency Model',
    description: 'How concurrent operations are handled',
    zio: {
      status: 'excellent',
      details: 'Green threads (fibers) with structured concurrency',
      code: 'ZIO.foreachPar(items)(processItem) // Built-in parallel'
    },
    catsEffect: {
      status: 'excellent',
      details: 'Also has fiber-based concurrency with excellent performance',
      code: 'items.parTraverse(processItem) // Need fs2/parallel'
    }
  },
  {
    id: 'streaming',
    category: 'Performance',
    feature: 'Streaming Support',
    description: 'Built-in support for streaming data',
    zio: {
      status: 'excellent',
      details: 'ZIO Streams integrated with resource management',
      code: 'ZStream.fromFile("data.txt").map(_.toUpperCase)'
    },
    catsEffect: {
      status: 'excellent',
      details: 'fs2 is excellent but separate library to learn',
      code: 'Stream.resource(Files.readAll("data.txt")).map(_.toUpperCase)'
    }
  },
  {
    id: 'ecosystem',
    category: 'Ecosystem',
    feature: 'Library Ecosystem',
    description: 'Available third-party libraries and integrations',
    zio: {
      status: 'good',
      details: 'Growing rapidly. Strong official libraries, fewer community ones',
      code: '// ZIO HTTP, ZIO Kafka, ZIO AWS, etc.'
    },
    catsEffect: {
      status: 'excellent',
      details: 'Mature ecosystem with many battle-tested libraries',
      code: '// http4s, fs2, doobie, circe, refined, etc.'
    }
  },
  {
    id: 'interop',
    category: 'Ecosystem',
    feature: 'Interoperability',
    description: 'How well does it play with other Scala libraries?',
    zio: {
      status: 'good',
      details: 'Can interop with cats-effect and Future, but some friction',
      code: 'ZIO.fromFuture(implicit ec => future)'
    },
    catsEffect: {
      status: 'excellent',
      details: 'Natural interop with most Scala ecosystem libraries',
      code: 'IO.fromFuture(IO(future))'
    }
  }
];

const statusConfig = {
  excellent: { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/20', icon: Check },
  good: { color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/20', icon: Check },
  fair: { color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-950/20', icon: AlertTriangle },
  poor: { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/20', icon: X },
};

export default function ComparisonTable() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(comparisonData.map(item => item.category)))];
  
  const filteredData = selectedCategory === 'all' 
    ? comparisonData 
    : comparisonData.filter(item => item.category === selectedCategory);

  const StatusIndicator = ({ status, details }: { status: keyof typeof statusConfig; details: string }) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <div className={cn('flex items-center gap-2 p-3 rounded-lg', config.bg)}>
        <Icon className={cn('w-4 h-4', config.color)} />
        <span className={cn('text-sm font-medium capitalize', config.color)}>
          {status}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map(category => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all border',
              selectedCategory === category
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {category === 'all' ? 'All Features' : category}
          </motion.button>
        ))}
      </div>

      {/* Table Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">Feature</h3>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-primary-600 dark:text-primary-400">ZIO</h3>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-purple-600 dark:text-purple-400">Cats Effect</h3>
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <AnimatePresence>
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                onMouseEnter={() => setHoveredFeature(item.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Feature Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-3">
                      <Info className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                          {item.feature}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                        {item.category !== selectedCategory && selectedCategory !== 'all' && (
                          <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ZIO */}
                  <div className="space-y-3">
                    <StatusIndicator status={item.zio.status} details={item.zio.details} />
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {item.zio.details}
                    </p>
                    {item.zio.code && (
                      <div className="bg-gray-900 rounded p-2">
                        <code className="text-xs text-green-400 font-mono">
                          {item.zio.code}
                        </code>
                      </div>
                    )}
                  </div>

                  {/* Cats Effect */}
                  <div className="space-y-3">
                    <StatusIndicator status={item.catsEffect.status} details={item.catsEffect.details} />
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {item.catsEffect.details}
                    </p>
                    {item.catsEffect.code && (
                      <div className="bg-gray-900 rounded p-2">
                        <code className="text-xs text-purple-400 font-mono">
                          {item.catsEffect.code}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-950/20 dark:to-purple-950/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          🤝 The Honest Truth
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <h4 className="font-medium text-primary-600 dark:text-primary-400">
              Choose ZIO if you want:
            </h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-300">
              <li>• <strong>Everything in one box</strong> - testing, streaming, HTTP, etc.</li>
              <li>• <strong>Type-safe error handling</strong> - know exactly what can fail</li>
              <li>• <strong>Built-in dependency injection</strong> - no extra libraries</li>
              <li>• <strong>Beginner-friendly docs</strong> - comprehensive learning path</li>
              <li>• <strong>Rapid prototyping</strong> - batteries included approach</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-purple-600 dark:text-purple-400">
              Choose Cats Effect if you want:
            </h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-300">
              <li>• <strong>Mature ecosystem</strong> - battle-tested libraries everywhere</li>
              <li>• <strong>Seamless interop</strong> - works with all Scala libraries</li>
              <li>• <strong>Functional purity</strong> - clean category theory foundations</li>
              <li>• <strong>Composable abstractions</strong> - mix and match what you need</li>
              <li>• <strong>Industry adoption</strong> - widely used in production</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Plot twist:</strong> You can use both! ZIO and Cats Effect can interop. 
            Start with one, migrate gradually, or use ZIO for new services and Cats Effect 
            for existing ones. The Scala ecosystem wins when we have choices! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}