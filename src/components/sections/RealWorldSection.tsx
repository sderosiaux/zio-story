'use client';

import { Section } from '@/components/ui';
import RealWorldShowcase from '@/components/interactive/RealWorldShowcase';

export default function RealWorldSection() {
  return (
    <Section id="real-world" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Real World Use
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            ZIO isn't just academic theory - it's powering production systems at scale. 
            From fintech trading platforms to multiplayer game servers, here are real companies 
            solving real problems with ZIO.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 text-sm">
            <div className="bg-primary-50 dark:bg-primary-950/20 rounded-xl p-4">
              <div className="text-2xl mb-2">🏗️</div>
              <div className="font-semibold text-primary-800 dark:text-primary-200 mb-1">
                Microservices
              </div>
              <div className="text-primary-700 dark:text-primary-300">
                High-performance backends handling millions of requests with structured concurrency
              </div>
            </div>
            
            <div className="bg-success-50 dark:bg-success-950/20 rounded-xl p-4">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold text-success-800 dark:text-success-200 mb-1">
                Data Pipelines
              </div>
              <div className="text-success-700 dark:text-success-300">
                Real-time event processing with automatic backpressure and error recovery
              </div>
            </div>
            
            <div className="bg-accent-50 dark:bg-accent-950/20 rounded-xl p-4">
              <div className="text-2xl mb-2">🎮</div>
              <div className="font-semibold text-accent-800 dark:text-accent-200 mb-1">
                Gaming & IoT
              </div>
              <div className="text-accent-700 dark:text-accent-300">
                Low-latency systems with millions of concurrent connections and real-time updates
              </div>
            </div>
          </div>
        </div>
      </div>

      <RealWorldShowcase />

      {/* Community & Ecosystem */}
      <div className="mt-16 bg-gradient-to-br from-primary-50 to-success-50 dark:from-primary-950/20 dark:to-success-950/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-800">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Growing Ecosystem
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Companies */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              🏢 <span>Companies Using ZIO</span>
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Ziverge', 'Disney Streaming', 'Kaizen Gaming', 'Wolt',
                'Colisweb', 'Septeni', 'LeadIQ', 'Scalac',
                'DevInsight', 'AutoScout24', 'Rudder', 'Conduktor'
              ].map((company) => (
                <div
                  key={company}
                  className="text-sm bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-center border border-gray-200 dark:border-gray-700"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>

          {/* Libraries */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              📦 <span>Official Libraries</span>
            </h4>
            <div className="space-y-2 text-sm">
              {[
                { name: 'ZIO HTTP', desc: 'High-performance HTTP server and client' },
                { name: 'ZIO Streams', desc: 'Composable, resource-safe streaming' },
                { name: 'ZIO Test', desc: 'Property-based testing with time travel' },
                { name: 'ZIO Kafka', desc: 'Type-safe Kafka client' },
                { name: 'ZIO Redis', desc: 'Redis client with connection pooling' },
                { name: 'ZIO AWS', desc: 'AWS services integration' }
              ].map((lib) => (
                <div key={lib.name} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-primary-600 dark:text-primary-400">
                      {lib.name}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      - {lib.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="mt-8 pt-6 border-t border-primary-200 dark:border-primary-800">
          <div className="grid sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                15K+
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                GitHub Stars
              </div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-success-600 dark:text-success-400 mb-1">
                3K+
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Discord Members
              </div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-accent-600 dark:text-accent-400 mb-1">
                500+
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Contributors
              </div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                100+
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Ecosystem Libraries
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            💡 <strong>Join the community:</strong> Active Discord server, weekly community calls, 
            and comprehensive documentation. The ZIO community is welcoming and helpful! 🚀
          </p>
        </div>
      </div>
    </Section>
  );
}