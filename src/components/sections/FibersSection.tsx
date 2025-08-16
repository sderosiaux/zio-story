'use client';

import { Section } from '@/components/ui';
import FiberComparison from '@/components/interactive/FiberComparison';

export default function FibersSection() {
  return (
    <Section id="fibers" background="subtle" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Fibers Are Not Threads
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Think of threads as heavy trucks on a busy highway, and fibers as lightweight drones in open sky. 
            Same destination, completely different approach.
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🚛</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">OS Threads</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Heavy, expensive to create and switch between. Each thread needs ~2MB of stack space. 
                  When one blocks (waiting for I/O), it sits there doing nothing, wasting resources.
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🛸</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">ZIO Fibers</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lightweight, use only ~4KB each. When one needs to wait, it yields control and another 
                  fiber runs. Millions can run concurrently on just a few OS threads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FiberComparison />

      {/* Technical Deep Dive */}
      <div className="mt-16 grid lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="text-2xl mb-4">🔄</div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Cooperative Multitasking
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Instead of the OS forcibly switching between threads (preemptive), fibers voluntarily 
            yield control when they need to wait. This eliminates expensive context switches and 
            makes concurrency much more efficient.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="text-2xl mb-4">🎯</div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Structured Concurrency
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Fibers form a hierarchy where parent fibers can manage child fibers. When a parent 
            completes or fails, all its children are automatically cleaned up. No more leaked 
            background tasks or zombie processes.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="text-2xl mb-4">⚡</div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Interruption & Cancellation
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Every fiber can be interrupted safely at any point. ZIO automatically handles resource 
            cleanup during interruption, ensuring your system stays in a consistent state even 
            when operations are cancelled.
          </p>
        </div>
      </div>

      {/* Code Example */}
      <div className="mt-12 bg-gray-900 rounded-xl overflow-hidden">
        <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
          <h3 className="font-mono text-sm text-gray-300">Real-World Example: Parallel Processing</h3>
        </div>
        
        <div className="p-6">
          <pre className="text-sm text-gray-300 leading-relaxed">
            <code>{`// Process 10,000 items in parallel - try this with threads!
val items = (1 to 10000).toList

val processAllItems = 
  ZIO.foreachPar(items) { item =>
    processItem(item)
      .timeout(30.seconds)
      .retry(Schedule.exponential(1.second) && Schedule.recurs(3))
  }

// Each item gets its own fiber
// If one times out, only that fiber is interrupted
// Total memory usage: ~40MB (10,000 × 4KB)
// With threads this would need: ~20GB (10,000 × 2MB)`}</code>
          </pre>
        </div>
      </div>

      {/* Performance Comparison */}
      <div className="mt-12 bg-gradient-to-br from-primary-50 to-success-50 dark:from-primary-950/20 dark:to-success-950/20 rounded-xl p-8 border border-primary-200 dark:border-primary-800">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          The Numbers Don't Lie
        </h3>
        
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              500×
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
              More Memory Efficient
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              4KB vs 2MB per unit
            </div>
          </div>
          
          <div>
            <div className="text-3xl font-bold text-success-600 dark:text-success-400 mb-2">
              1000×
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
              Higher Concurrency
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Millions vs thousands
            </div>
          </div>
          
          <div>
            <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
              100×
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
              Faster Context Switch
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Nanoseconds vs microseconds
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            💡 <strong>Bottom line:</strong> ZIO fibers let you write simple, sequential-looking code 
            that scales to handle massive concurrency without the complexity of traditional thread management.
          </p>
        </div>
      </div>
    </Section>
  );
}