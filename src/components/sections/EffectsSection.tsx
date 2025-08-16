'use client';

import { Section } from '@/components/ui';
import EffectSlider from '@/components/interactive/EffectSlider';

export default function EffectsSection() {
  return (
    <Section id="effects" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Meet ZIO Effects
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            <code className="px-2 py-1 bg-primary-100 dark:bg-primary-900 rounded font-mono text-primary-800 dark:text-primary-200">
              ZIO[R, E, A]
            </code> is like a Swiss Army knife that tells you exactly what tools it has.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left mt-8">
            <div className="bg-primary-50 dark:bg-primary-950/20 rounded-xl p-6">
              <div className="text-2xl mb-3">🔧</div>
              <h3 className="font-semibold text-primary-800 dark:text-primary-200 mb-2">
                R - Environment
              </h3>
              <p className="text-sm text-primary-700 dark:text-primary-300">
                What this effect needs to run. Database? HTTP client? Configuration? 
                It's all explicit in the type.
              </p>
            </div>
            <div className="bg-danger-50 dark:bg-danger-950/20 rounded-xl p-6">
              <div className="text-2xl mb-3">⚠️</div>
              <h3 className="font-semibold text-danger-800 dark:text-danger-200 mb-2">
                E - Error
              </h3>
              <p className="text-sm text-danger-700 dark:text-danger-300">
                How this effect can fail. Network timeout? Parse error? 
                The compiler helps you handle every case.
              </p>
            </div>
            <div className="bg-success-50 dark:bg-success-950/20 rounded-xl p-6">
              <div className="text-2xl mb-3">✨</div>
              <h3 className="font-semibold text-success-800 dark:text-success-200 mb-2">
                A - Value
              </h3>
              <p className="text-sm text-success-700 dark:text-success-300">
                What this effect produces when successful. User data? File content? 
                You know exactly what you'll get.
              </p>
            </div>
          </div>
        </div>
      </div>

      <EffectSlider />

      {/* Key Benefits */}
      <div className="mt-16 grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Why This Matters
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-primary-600 rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  No More Hidden Dependencies
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Unlike Future's hidden ExecutionContext, ZIO makes all dependencies explicit. 
                  Testing becomes trivial because you can mock exactly what you need.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-danger-100 dark:bg-danger-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-danger-600 rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Compile-Time Error Handling
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  The compiler forces you to handle all possible errors. 
                  No more runtime surprises from exceptions you forgot about.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-success-600 rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Perfect Documentation
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  The type signature is living documentation. 
                  You know exactly what an effect does just by looking at its type.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Mental Model
          </h3>
          
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <code className="px-2 py-1 bg-white dark:bg-gray-800 rounded font-mono text-xs">
                ZIO[Any, Nothing, Int]
              </code>
              <span className="text-gray-600 dark:text-gray-400">
                = "I'm a pure value, can't fail"
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <code className="px-2 py-1 bg-white dark:bg-gray-800 rounded font-mono text-xs">
                ZIO[Console, IOException, String]
              </code>
              <span className="text-gray-600 dark:text-gray-400">
                = "I read from console, might fail with IO error"
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <code className="px-2 py-1 bg-white dark:bg-gray-800 rounded font-mono text-xs">
                ZIO[DB & HTTP, AppError, User]
              </code>
              <span className="text-gray-600 dark:text-gray-400">
                = "I need DB and HTTP, might fail with app error"
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-950/20 rounded-lg border border-primary-200 dark:border-primary-800">
            <p className="text-sm text-primary-800 dark:text-primary-200">
              💡 <strong>Pro tip:</strong> Think of ZIO types as contracts. 
              They tell you exactly what to expect, making your code predictable and maintainable.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}