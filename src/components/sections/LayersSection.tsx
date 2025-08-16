'use client';

import { Section } from '@/components/ui';
import LayerBuilder from '@/components/interactive/LayerBuilder';

export default function LayersSection() {
  return (
    <Section id="layers" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Layers, Resources, Magic
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            ZIO's dependency injection system is like having a personal assistant who knows exactly 
            what you need and when you need it. No more manual wiring or configuration hell.
          </p>
          
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
            <div className="grid md:grid-cols-3 gap-4 text-left text-sm">
              <div>
                <div className="font-semibold text-primary-800 dark:text-primary-200 mb-1 flex items-center gap-2">
                  🔧 <span>ZLayer</span>
                </div>
                <p className="text-primary-700 dark:text-primary-300">
                  Describes how to construct a service. Think of it as a recipe.
                </p>
              </div>
              
              <div>
                <div className="font-semibold text-accent-800 dark:text-accent-200 mb-1 flex items-center gap-2">
                  🧹 <span>ZManaged</span>
                </div>
                <p className="text-accent-700 dark:text-accent-300">
                  Handles resource lifecycle. Automatically cleans up when done.
                </p>
              </div>
              
              <div>
                <div className="font-semibold text-success-800 dark:text-success-200 mb-1 flex items-center gap-2">
                  🏗️ <span>Composition</span>
                </div>
                <p className="text-success-700 dark:text-success-300">
                  Layers compose automatically. Dependencies resolved at compile time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LayerBuilder />

      {/* Why This Matters */}
      <div className="mt-16 space-y-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Why Traditional DI Sucks
        </h3>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Traditional Way */}
          <div className="bg-danger-50 dark:bg-danger-950/20 rounded-xl p-6 border border-danger-200 dark:border-danger-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">😤</div>
              <h4 className="font-semibold text-danger-800 dark:text-danger-200">
                Traditional Dependency Injection
              </h4>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="bg-gray-900 rounded p-3">
                <code className="text-gray-300 text-xs">{`// Spring/Guice style - runtime magic
@Inject DatabaseService dbService;
@Inject HttpClient httpClient;
@Inject Logger logger;

// What could go wrong? 🤔
// - Circular dependencies (runtime error)
// - Missing dependencies (runtime error)  
// - Resource leaks (forgot to close)
// - Initialization order issues
// - No compile-time safety`}</code>
              </div>
              
              <ul className="space-y-1 text-danger-700 dark:text-danger-300">
                <li>• Runtime errors for missing dependencies</li>
                <li>• No guarantee resources get cleaned up</li>
                <li>• Magic annotations everywhere</li>
                <li>• Hard to test and reason about</li>
                <li>• Configuration files become massive</li>
              </ul>
            </div>
          </div>

          {/* ZIO Way */}
          <div className="bg-success-50 dark:bg-success-950/20 rounded-xl p-6 border border-success-200 dark:border-success-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">✨</div>
              <h4 className="font-semibold text-success-800 dark:text-success-200">
                ZIO Layers - The Better Way
              </h4>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="bg-gray-900 rounded p-3">
                <code className="text-gray-300 text-xs">{`// ZIO style - explicit and type-safe
val program = for {
  user <- UserService.getUser(id)
  _    <- Logger.info(s"Got user: \${user.name}")
} yield user

// Provide dependencies
program.provide(
  UserService.live,
  DatabaseService.live,
  Logger.live
)`}</code>
              </div>
              
              <ul className="space-y-1 text-success-700 dark:text-success-300">
                <li>• Compile-time dependency resolution</li>
                <li>• Automatic resource management</li>
                <li>• No magic - everything is explicit</li>
                <li>• Easy to test with mock layers</li>
                <li>• Composable and modular</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Testing Benefits */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Testing Becomes Trivial
        </h3>
        
        <div className="bg-gray-900 rounded-lg p-4">
          <pre className="text-sm text-gray-300 leading-relaxed">
            <code>{`// Production layers
val prodLayers = DatabaseService.postgres >>> UserService.live

// Test layers - swap out real DB with in-memory
val testLayers = DatabaseService.inMemory >>> UserService.live  

// Same business logic, different dependencies!
val test = for {
  _    <- UserService.createUser("test@example.com")
  user <- UserService.getUser("test@example.com")
} yield assert(user.email == "test@example.com")

test.provide(testLayers) // Runs against in-memory DB`}</code>
          </pre>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            💡 <strong>The magic:</strong> Your business logic doesn't change. 
            Only the layers change. This makes testing fast, reliable, and easy.
          </p>
        </div>
      </div>
    </Section>
  );
}