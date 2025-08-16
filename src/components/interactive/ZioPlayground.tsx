'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle, AlertTriangle, Book, Zap } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui';
import { useTheme } from '@/components/ui/ThemeProvider';
import { cn } from '@/lib/utils';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  initialCode: string;
  solution: string;
  hints: string[];
  explanation: string;
}

const challenges: Challenge[] = [
  {
    id: 'parallel-fibers',
    title: 'Parallel Fibers',
    description: 'Run three tasks in parallel and collect their results',
    difficulty: 'beginner',
    initialCode: `import zio._

object ParallelExample extends ZIOApp {
  
  val task1 = ZIO.succeed("Hello").delay(1.second)
  val task2 = ZIO.succeed("ZIO").delay(2.seconds) 
  val task3 = ZIO.succeed("World").delay(1.5.seconds)
  
  // TODO: Run all tasks in parallel and combine results
  val program = ???
  
  def run = program.debug
}`,
    solution: `import zio._

object ParallelExample extends ZIOApp {
  
  val task1 = ZIO.succeed("Hello").delay(1.second)
  val task2 = ZIO.succeed("ZIO").delay(2.seconds) 
  val task3 = ZIO.succeed("World").delay(1.5.seconds)
  
  // Run all tasks in parallel and combine results
  val program = ZIO.collectAllPar(List(task1, task2, task3))
    .map(_.mkString(" "))
  
  def run = program.debug
}`,
    hints: [
      'Use ZIO.collectAllPar() to run tasks in parallel',
      'Map over the result to combine the strings',
      'Should complete in ~2 seconds (longest task) not 4.5 seconds'
    ],
    explanation: 'ZIO.collectAllPar runs all effects in parallel using fibers. The total time is the longest task, not the sum of all tasks!'
  },
  {
    id: 'retry-recovery',
    title: 'Retry with Recovery',
    description: 'Create a flaky service that succeeds after a few retries',
    difficulty: 'intermediate',
    initialCode: `import zio._

object RetryExample extends ZIOApp {
  
  // Flaky service that fails 3 times then succeeds
  val flakyService = for {
    ref <- Ref.get(???) // TODO: Create a Ref to track attempts
    attempts <- ref.getAndUpdate(_ + 1)
    result <- if (attempts < 3) 
                ZIO.fail("Service unavailable") 
              else 
                ZIO.succeed("Success!")
  } yield result
  
  // TODO: Add retry logic with exponential backoff
  val program = ???
  
  def run = program.debug
}`,
    solution: `import zio._

object RetryExample extends ZIOApp {
  
  // Flaky service that fails 3 times then succeeds
  def flakyService(ref: Ref[Int]) = for {
    attempts <- ref.getAndUpdate(_ + 1)
    result <- if (attempts < 3) 
                ZIO.fail("Service unavailable") 
              else 
                ZIO.succeed("Success!")
  } yield result
  
  // Add retry logic with exponential backoff
  val program = for {
    ref <- Ref.make(0)
    result <- flakyService(ref)
      .retry(Schedule.exponential(100.millis) && Schedule.recurs(5))
      .catchAll(error => ZIO.succeed(s"Failed: $error"))
  } yield result
  
  def run = program.debug
}`,
    hints: [
      'Create a Ref to track the number of attempts',
      'Use .retry() with Schedule.exponential() for backoff',
      'Combine schedules with && operator',
      'Handle final failure with .catchAll()'
    ],
    explanation: 'ZIO\'s retry mechanisms are composable! You can combine exponential backoff with maximum attempts using the && operator.'
  },
  {
    id: 'resource-management',
    title: 'Resource Management',
    description: 'Manage a database connection that must be properly closed',
    difficulty: 'advanced',
    initialCode: `import zio._

case class Database(name: String) {
  def query(sql: String): ZIO[Any, Throwable, String] = 
    ZIO.succeed(s"Result of: $sql")
  def close(): UIO[Unit] = 
    ZIO.succeed(println(s"Closing database $name"))
}

object ResourceExample extends ZIOApp {
  
  def openDatabase(name: String): ZIO[Any, Throwable, Database] = 
    ZIO.succeed(Database(name)).debug(s"Opening database $name")
  
  // TODO: Use ZIO.acquireRelease to manage the database lifecycle
  // Even if the query fails, the database should be closed
  val program = ???
  
  def run = program.debug
}`,
    solution: `import zio._

case class Database(name: String) {
  def query(sql: String): ZIO[Any, Throwable, String] = 
    ZIO.succeed(s"Result of: $sql")
  def close(): UIO[Unit] = 
    ZIO.succeed(println(s"Closing database $name"))
}

object ResourceExample extends ZIOApp {
  
  def openDatabase(name: String): ZIO[Any, Throwable, Database] = 
    ZIO.succeed(Database(name)).debug(s"Opening database $name")
  
  // Use ZIO.acquireRelease to manage the database lifecycle
  val program = ZIO.acquireReleaseWith(
    acquire = openDatabase("UserDB")
  )(
    release = db => db.close()
  )(
    use = db => db.query("SELECT * FROM users")
      .zip(db.query("SELECT * FROM orders"))
      .map { case (users, orders) => s"$users, $orders" }
  )
  
  def run = program.debug
}`,
    hints: [
      'Use ZIO.acquireReleaseWith for resource management',
      'The release function runs even if use fails',
      'You can perform multiple queries in the use block',
      'Try making the query fail to see cleanup still happens'
    ],
    explanation: 'ZIO.acquireReleaseWith guarantees that resources are cleaned up, even if exceptions occur. This prevents resource leaks!'
  }
];

export default function ZioPlayground() {
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [code, setCode] = useState(challenges[0].initialCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const { actualTheme } = useTheme();

  const currentChallenge = challenges[selectedChallenge];

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    
    // Simulate code execution with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate different outcomes based on code completeness
    if (code.includes('???')) {
      setOutput('❌ Compilation Error: Replace ??? with your implementation');
    } else if (code.includes(currentChallenge.solution.split('\n').find(line => line.includes('=') && !line.includes('???'))?.split('=')[1]?.trim() || '')) {
      setOutput(`✅ Success! 
${currentChallenge.explanation}

Output:
Opening database UserDB
Result of: SELECT * FROM users, Result of: SELECT * FROM orders
Closing database UserDB`);
    } else {
      setOutput(`⚠️  Code runs but might not be optimal. Try the solution for the best approach.

Output:
Your implementation worked!`);
    }
    
    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(currentChallenge.initialCode);
    setOutput('');
    setShowSolution(false);
    setShowHints(false);
  };

  const loadSolution = () => {
    setCode(currentChallenge.solution);
    setShowSolution(true);
  };

  const selectChallenge = (index: number) => {
    setSelectedChallenge(index);
    setCode(challenges[index].initialCode);
    setOutput('');
    setShowSolution(false);
    setShowHints(false);
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };

  return (
    <div className="space-y-8">
      {/* Challenge Selector */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Choose Your Challenge:
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {challenges.map((challenge, index) => (
            <motion.button
              key={challenge.id}
              onClick={() => selectChallenge(index)}
              className={cn(
                'p-4 rounded-xl text-left transition-all border-2',
                selectedChallenge === index
                  ? 'bg-primary-50 border-primary-300 dark:bg-primary-950/20 dark:border-primary-600'
                  : 'bg-white border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {challenge.title}
                </h4>
                <span className={cn(
                  'px-2 py-1 rounded text-xs font-medium',
                  difficultyColors[challenge.difficulty]
                )}>
                  {challenge.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {challenge.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Playground */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Editor Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Code Editor
            </h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHints(!showHints)}
                icon={<Book className="w-4 h-4" />}
              >
                Hints
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetCode}
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={loadSolution}
              >
                Solution
              </Button>
              <Button
                size="sm"
                onClick={runCode}
                disabled={isRunning}
                icon={isRunning ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Play className="w-4 h-4" />}
              >
                {isRunning ? 'Running...' : 'Run Code'}
              </Button>
            </div>
          </div>

          <div className="border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
            <Editor
              height="400px"
              defaultLanguage="scala"
              value={code}
              onChange={(value) => setCode(value || '')}
              theme={actualTheme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on'
              }}
            />
          </div>

          {/* Hints */}
          <AnimatePresence>
            {showHints && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-primary-50 dark:bg-primary-950/20 rounded-xl p-4 border border-primary-200 dark:border-primary-800"
              >
                <h4 className="font-medium text-primary-800 dark:text-primary-200 mb-2 flex items-center gap-2">
                  💡 <span>Hints</span>
                </h4>
                <ul className="space-y-1">
                  {currentChallenge.hints.map((hint, index) => (
                    <li key={index} className="text-sm text-primary-700 dark:text-primary-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Output
          </h3>
          
          <div className="bg-gray-900 rounded-xl p-4 min-h-[400px] font-mono text-sm">
            {isRunning ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  <span>Running your ZIO program...</span>
                </div>
              </div>
            ) : output ? (
              <pre className="text-gray-300 whitespace-pre-wrap">
                {output}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Zap className="w-8 h-8 mx-auto mb-2" />
                  <p>Click "Run Code" to see the magic! ✨</p>
                </div>
              </div>
            )}
          </div>

          {/* Challenge Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <CheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {currentChallenge.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentChallenge.description}
                </p>
              </div>
            </div>
            
            {showSolution && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 bg-success-50 dark:bg-success-950/20 rounded-lg border border-success-200 dark:border-success-800"
              >
                <h5 className="font-medium text-success-800 dark:text-success-200 mb-2">
                  📚 Explanation
                </h5>
                <p className="text-sm text-success-700 dark:text-success-300">
                  {currentChallenge.explanation}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          🎯 Your ZIO Learning Journey
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">🌱</div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              Start Here
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Complete the playground challenges, then explore 
              <a href="https://zio.dev" className="text-primary-600 dark:text-primary-400 ml-1 hover:underline">
                official ZIO docs
              </a>
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl mb-2">🏗️</div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              Build Projects  
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Try ZIO HTTP for web services, ZIO Streams for data processing, 
              ZIO Test for comprehensive testing
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl mb-2">🚀</div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              Join Community
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Active Discord server, weekly community calls, and helpful maintainers. 
              The ZIO community rocks! 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}