'use client';

import { Section } from '@/components/ui';
import CodeComparison from '@/components/interactive/CodeComparison';

const futureExample = {
  id: 'future-problems',
  language: 'scala' as const,
  code: `import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

// Trying to fetch user data and posts
def getUserWithPosts(userId: String): Future[UserWithPosts] = {
  val userFuture = fetchUser(userId)
  val postsFuture = fetchUserPosts(userId)
  
  for {
    user <- userFuture
    posts <- postsFuture
  } yield UserWithPosts(user, posts)
}

// What could go wrong? 🤔
val result = getUserWithPosts("123")
println(s"Got result: $result") // Future(<not completed>)`,
  issues: [
    {
      line: 5,
      type: 'error' as const,
      message: 'Futures are eager! Both requests start immediately, even if you never use the result.'
    },
    {
      line: 6,
      type: 'warning' as const,
      message: 'No way to cancel these requests once started. They will run forever if they hang.'
    },
    {
      line: 9,
      type: 'error' as const,
      message: 'Error handling is not typed. Exceptions get swallowed into Future[_] and you lose type information.'
    },
    {
      line: 13,
      type: 'warning' as const,
      message: 'Implicit ExecutionContext requirement makes testing and reasoning harder.'
    },
    {
      line: 14,
      type: 'error' as const,
      message: 'No way to know if this completed, failed, or is still running without blocking or callbacks.'
    },
  ]
};

const zioExample = {
  id: 'zio-solution',
  language: 'scala' as const,
  code: `import zio._

// Same goal, better approach
def getUserWithPosts(userId: String): ZIO[UserService & PostService, AppError, UserWithPosts] = {
  for {
    user  <- ZIO.serviceWithZIO[UserService](_.fetchUser(userId))
    posts <- ZIO.serviceWithZIO[PostService](_.fetchUserPosts(userId))
  } yield UserWithPosts(user, posts)
}

// Now we can reason about it!
val program = getUserWithPosts("123")
  .timeout(30.seconds)
  .retry(Schedule.exponential(1.second) && Schedule.recurs(3))
  .catchAll(error => ZIO.logError(s"Failed to get user: $error") *> ZIO.fail(error))`,
  benefits: [
    {
      line: 4,
      type: 'success' as const,
      message: 'ZIO is lazy! Nothing executes until you explicitly run it. Pure description of computation.'
    },
    {
      line: 4,
      type: 'info' as const,
      message: 'Type tells you everything: needs UserService & PostService, can fail with AppError, returns UserWithPosts.'
    },
    {
      line: 5,
      type: 'success' as const,
      message: 'Service pattern makes dependencies explicit and testable. No hidden global ExecutionContext.'
    },
    {
      line: 11,
      type: 'success' as const,
      message: 'Built-in timeout support. No more hanging requests!'
    },
    {
      line: 12,
      type: 'success' as const,
      message: 'Composable retry logic with built-in schedules. Exponential backoff made easy.'
    },
    {
      line: 13,
      type: 'info' as const,
      message: 'Structured error handling. You know exactly what can go wrong and how to handle it.'
    },
  ]
};

export default function ProblemsSection() {
  return (
    <Section id="problems" background="subtle" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          What's Wrong with Future?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Scala's <code className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded font-mono text-sm">Future</code> seemed 
          like a good idea, but it has some fundamental problems that make complex async code a nightmare to maintain.
        </p>
      </div>

      <CodeComparison 
        futureCode={futureExample}
        zioCode={zioExample}
        title="The Same Task, Two Approaches"
      />

      {/* Summary */}
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <div className="bg-danger-50 dark:bg-danger-950/20 rounded-xl p-6 border border-danger-200 dark:border-danger-800/30">
          <h3 className="text-lg font-semibold text-danger-800 dark:text-danger-200 mb-4">
            😰 Future Problems
          </h3>
          <ul className="space-y-2 text-danger-700 dark:text-danger-300">
            <li>• <strong>Eager execution</strong> - runs immediately</li>
            <li>• <strong>Not cancelable</strong> - no way to stop</li>
            <li>• <strong>Poor error handling</strong> - types don't help</li>
            <li>• <strong>Hidden dependencies</strong> - ExecutionContext magic</li>
            <li>• <strong>Hard to test</strong> - global state everywhere</li>
          </ul>
        </div>

        <div className="bg-success-50 dark:bg-success-950/20 rounded-xl p-6 border border-success-200 dark:border-success-800/30">
          <h3 className="text-lg font-semibold text-success-800 dark:text-success-200 mb-4">
            🎉 ZIO Benefits
          </h3>
          <ul className="space-y-2 text-success-700 dark:text-success-300">
            <li>• <strong>Lazy evaluation</strong> - pure descriptions</li>
            <li>• <strong>Built-in cancellation</strong> - timeout & interruption</li>
            <li>• <strong>Typed errors</strong> - know what can fail</li>
            <li>• <strong>Explicit dependencies</strong> - easy to mock & test</li>
            <li>• <strong>Composable</strong> - retry, timeout, race, etc.</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}