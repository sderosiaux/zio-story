'use client';

import { Section } from '@/components/ui';
import ZioPlayground from '@/components/interactive/ZioPlayground';

export default function PlaygroundSection() {
  return (
    <Section id="playground" background="subtle" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Try It Yourself
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Ready to get your hands dirty? Here are three progressively challenging ZIO exercises. 
            No installation required - just your browser and curiosity! 🧠
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border">
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-semibold text-xs">1</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">Beginner</div>
                  <div className="text-gray-600 dark:text-gray-400">Learn fiber basics</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 dark:text-yellow-400 font-semibold text-xs">2</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">Intermediate</div>
                  <div className="text-gray-600 dark:text-gray-400">Master error handling</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-400 font-semibold text-xs">3</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">Advanced</div>
                  <div className="text-gray-600 dark:text-gray-400">Resource management</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-950/20 rounded-lg">
              <p className="text-sm text-primary-800 dark:text-primary-200">
                💡 <strong>Pro tip:</strong> Each challenge builds on the previous one. 
                Start with "Parallel Fibers" even if you're experienced - 
                it's designed to showcase ZIO's elegance, not test your patience!
              </p>
            </div>
          </div>
        </div>
      </div>

      <ZioPlayground />

      {/* Next Steps */}
      <div className="mt-16 grid lg:grid-cols-2 gap-8">
        {/* Local Setup */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            💻 <span>Ready for Local Development?</span>
          </h3>
          
          <div className="space-y-4">
            <div className="bg-gray-900 rounded p-4">
              <pre className="text-sm text-green-400">
                <code>{`// Add to your build.sbt
libraryDependencies ++= Seq(
  "dev.zio" %% "zio"         % "2.0.21",
  "dev.zio" %% "zio-streams" % "2.0.21",
  "dev.zio" %% "zio-test"    % "2.0.21" % Test
)`}</code>
              </pre>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p>🎯 <strong>Quick Start Template:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Use the official ZIO quickstart: <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">zio-sbt-project.g8</code></li>
                <li>• Or try ZIO HTTP template for web services</li>
                <li>• IntelliJ IDEA has excellent Scala support</li>
                <li>• VS Code works great with Metals extension</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Community Resources */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            🎓 <span>Continue Learning</span>
          </h3>
          
          <div className="space-y-3 text-sm">
            {[
              { emoji: '📚', title: 'ZIO Documentation', desc: 'Comprehensive guides and API docs' },
              { emoji: '💬', title: 'Discord Community', desc: '3K+ developers helping each other' },
              { emoji: '🎥', title: 'YouTube Tutorials', desc: 'Video courses and conference talks' },
              { emoji: '📝', title: 'ZIO Blog', desc: 'Latest features and best practices' },
              { emoji: '🏗️', title: 'Example Projects', desc: 'Real-world ZIO applications on GitHub' },
              { emoji: '🎪', title: 'ZIO World Conference', desc: 'Annual conference with the core team' }
            ].map((resource, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-lg">{resource.emoji}</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{resource.title}</div>
                  <div className="text-gray-600 dark:text-gray-400">{resource.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="mt-12 bg-gradient-to-br from-success-50 to-primary-50 dark:from-success-950/20 dark:to-primary-950/20 rounded-xl p-8 border border-success-200 dark:border-success-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          🌟 From Playground to Production
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6 text-center text-sm">
          <div>
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-semibold text-success-800 dark:text-success-200 mb-1">
              2 Weeks Later
            </div>
            <div className="text-success-700 dark:text-success-300">
              "I refactored our Future-based service to ZIO. The code is cleaner and performance improved 3x!"
            </div>
          </div>
          
          <div>
            <div className="text-3xl mb-2">🏗️</div>
            <div className="font-semibold text-primary-800 dark:text-primary-200 mb-1">
              1 Month Later
            </div>
            <div className="text-primary-700 dark:text-primary-300">
              "Built our entire microservice architecture with ZIO HTTP and ZIO Streams. Team loves the testing story!"
            </div>
          </div>
          
          <div>
            <div className="text-3xl mb-2">🚀</div>
            <div className="font-semibold text-purple-800 dark:text-purple-200 mb-1">
              6 Months Later
            </div>
            <div className="text-purple-700 dark:text-purple-300">
              "We're processing 10M events/day with ZIO. Convinced my team to adopt it for all new projects!"
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            💡 <strong>Your journey starts here:</strong> Complete the challenges above, 
            then join thousands of developers building amazing things with ZIO! 🎯
          </p>
        </div>
      </div>
    </Section>
  );
}