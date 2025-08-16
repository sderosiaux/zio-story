'use client';

import { Section } from '@/components/ui';
import ComparisonTable from '@/components/interactive/ComparisonTable';

export default function ComparisonSection() {
  return (
    <Section id="comparison" background="subtle" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          What About Cats-Effect?
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            "But wait," you say, "what about Cats Effect? Isn't it the functional effects library for Scala?" 
            Fair question! Let's be honest about both.
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border">
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
              <strong>Disclaimer:</strong> Both are excellent libraries with passionate communities. 
              This comparison aims to help you choose based on your team's needs and preferences. 
              No flame wars here! 🕊️
            </p>
          </div>
        </div>
      </div>

      <ComparisonTable />

      {/* Migration Path */}
      <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          🚀 Migration & Interop Strategy
        </h3>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-4">🆕</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              New Projects
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Starting fresh? Consider ZIO for its batteries-included approach and excellent 
              learning materials. Get productive faster with built-in testing, HTTP, and streaming.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl mb-4">🔄</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Existing Cats Effect
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already using Cats Effect? Great! You can gradually introduce ZIO services 
              using interop layers. Or stick with Cats Effect - it's battle-tested and works well.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl mb-4">🏢</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Enterprise Teams
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Large teams often prefer Cats Effect's mature ecosystem and proven interop. 
              But ZIO's opinionated approach can reduce decision fatigue and speed up development.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            🔗 <span>Interop Example</span>
          </h4>
          <div className="bg-gray-900 rounded p-4">
            <pre className="text-sm text-gray-300 leading-relaxed">
              <code>{`// Use both in the same project!
import zio._
import cats.effect.IO

// Convert between ZIO and IO
val zioTask: ZIO[Any, Throwable, String] = ZIO.succeed("Hello ZIO")
val catsTask: IO[String] = IO.pure("Hello Cats")

// ZIO -> Cats Effect
val zioToCats: IO[String] = zioTask.to(catsRuntime)

// Cats Effect -> ZIO  
val catsToZio: ZIO[Any, Throwable, String] = ZIO.fromCatsEffect(catsTask)

// Best of both worlds!`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Community Quote */}
      <div className="mt-12 text-center">
        <blockquote className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-950/20 dark:to-purple-950/20 rounded-xl p-8 border border-primary-200 dark:border-primary-800 max-w-3xl mx-auto">
          <p className="text-lg text-gray-800 dark:text-gray-200 italic mb-4">
            "The Scala ecosystem is strongest when we have multiple excellent choices. 
            ZIO and Cats Effect push each other to be better, and developers win."
          </p>
          <footer className="text-sm text-gray-600 dark:text-gray-400">
            — The collective wisdom of the Scala community
          </footer>
        </blockquote>
      </div>
    </Section>
  );
}