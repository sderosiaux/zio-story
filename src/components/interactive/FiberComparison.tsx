'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface Vehicle {
  id: string;
  x: number;
  y: number;
  speed: number;
  color: string;
  size: 'large' | 'small';
  type: 'thread' | 'fiber';
}

const ThreadVehicle = ({ vehicle, isRunning }: { vehicle: Vehicle; isRunning: boolean }) => (
  <motion.div
    className={cn(
      "absolute rounded-lg flex items-center justify-center font-bold text-white shadow-lg",
      vehicle.size === 'large' ? "w-16 h-8" : "w-8 h-4",
      vehicle.color
    )}
    animate={isRunning ? {
      x: [vehicle.x, 400, vehicle.x],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    } : { x: vehicle.x }}
    style={{
      top: vehicle.y,
      left: vehicle.x,
    }}
  >
    🚛
  </motion.div>
);

const FiberVehicle = ({ vehicle, isRunning }: { vehicle: Vehicle; isRunning: boolean }) => (
  <motion.div
    className={cn(
      "absolute rounded-full flex items-center justify-center font-bold text-white shadow-lg",
      vehicle.size === 'small' ? "w-6 h-6" : "w-8 h-8",
      vehicle.color
    )}
    animate={isRunning ? {
      x: [vehicle.x, 400, vehicle.x],
      y: vehicle.y + Math.sin(vehicle.x * 0.01) * 20,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    } : { x: vehicle.x, y: vehicle.y }}
    style={{
      top: vehicle.y,
      left: vehicle.x,
    }}
  >
    🛸
  </motion.div>
);

export default function FiberComparison() {
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'threads' | 'fibers'>('threads');

  // Thread vehicles (heavy trucks on highway lanes)
  const threadVehicles: Vehicle[] = [
    { id: 't1', x: 0, y: 40, speed: 1, color: 'bg-red-600', size: 'large', type: 'thread' },
    { id: 't2', x: -100, y: 80, speed: 1, color: 'bg-blue-600', size: 'large', type: 'thread' },
    { id: 't3', x: -200, y: 120, speed: 1, color: 'bg-green-600', size: 'large', type: 'thread' },
    { id: 't4', x: -300, y: 160, speed: 1, color: 'bg-purple-600', size: 'large', type: 'thread' },
  ];

  // Fiber vehicles (lightweight drones)
  const fiberVehicles: Vehicle[] = Array.from({ length: 12 }, (_, i) => ({
    id: `f${i}`,
    x: -i * 40,
    y: 40 + Math.random() * 120,
    speed: 2 + Math.random() * 2,
    color: `bg-primary-${400 + (i % 3) * 100}`,
    size: 'small' as const,
    type: 'fiber' as const,
  }));

  const currentVehicles = mode === 'threads' ? threadVehicles : fiberVehicles;

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMode(mode === 'threads' ? 'fibers' : 'threads')}
            className="min-w-[120px]"
          >
            {mode === 'threads' ? '🚛 Threads' : '🛸 Fibers'}
          </Button>
          
          <Button
            variant={isRunning ? 'secondary' : 'primary'}
            size="sm"
            onClick={() => setIsRunning(!isRunning)}
            icon={isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsRunning(false)}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Reset
          </Button>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Click "🚛 Threads" or "🛸 Fibers" to compare
        </div>
      </div>

      {/* Animation Area */}
      <div className="relative h-64 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden border">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          {mode === 'threads' ? (
            // Highway lanes for threads
            <div className="w-full h-full">
              {[40, 80, 120, 160].map((y, i) => (
                <div
                  key={i}
                  className="absolute w-full border-t-2 border-dashed border-gray-400"
                  style={{ top: y + 16 }}
                />
              ))}
            </div>
          ) : (
            // Open sky for fibers
            <div className="w-full h-full bg-gradient-to-t from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10" />
          )}
        </div>

        {/* Vehicles */}
        <AnimatePresence mode="wait">
          <motion.div key={mode} className="relative w-full h-full">
            {currentVehicles.map((vehicle) => (
              mode === 'threads' ? (
                <ThreadVehicle key={vehicle.id} vehicle={vehicle} isRunning={isRunning} />
              ) : (
                <FiberVehicle key={vehicle.id} vehicle={vehicle} isRunning={isRunning} />
              )
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Mode Label */}
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full text-sm font-medium">
          {mode === 'threads' ? '🚛 OS Threads Highway' : '🛸 ZIO Fibers Sky'}
        </div>

        {/* Performance Counter */}
        <motion.div 
          className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 px-3 py-2 rounded-lg text-sm"
          key={`${mode}-counter`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="font-mono">
            {mode === 'threads' ? '4 threads' : '12 fibers'}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {mode === 'threads' ? '~8MB RAM' : '~48KB RAM'}
          </div>
        </motion.div>
      </div>

      {/* Comparison Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          className={cn(
            "rounded-xl p-6 border-2 transition-all",
            mode === 'threads' 
              ? "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800" 
              : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          )}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">🚛</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              OS Threads
            </h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Memory per thread:</span>
              <span className="font-mono text-red-600 dark:text-red-400">~2MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Context switching:</span>
              <span className="font-mono text-red-600 dark:text-red-400">Expensive</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Max concurrent:</span>
              <span className="font-mono text-red-600 dark:text-red-400">~1000s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Blocking:</span>
              <span className="font-mono text-red-600 dark:text-red-400">Blocks OS thread</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={cn(
            "rounded-xl p-6 border-2 transition-all",
            mode === 'fibers' 
              ? "bg-primary-50 border-primary-200 dark:bg-primary-950/20 dark:border-primary-800" 
              : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          )}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">🛸</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              ZIO Fibers
            </h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Memory per fiber:</span>
              <span className="font-mono text-primary-600 dark:text-primary-400">~4KB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Context switching:</span>
              <span className="font-mono text-primary-600 dark:text-primary-400">Nearly free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Max concurrent:</span>
              <span className="font-mono text-primary-600 dark:text-primary-400">~millions</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Blocking:</span>
              <span className="font-mono text-primary-600 dark:text-primary-400">Cooperative</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Why This Matters for Your App
            </h4>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <strong className="text-gray-900 dark:text-white">With Threads:</strong>
                <br />Your server can handle maybe 200 concurrent users before running out of memory.
              </div>
              <div>
                <strong className="text-gray-900 dark:text-white">With Fibers:</strong>
                <br />Your server can handle 200,000+ concurrent users on the same hardware.
              </div>
            </div>
            <div className="mt-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Real example:</strong> A typical web server handling file uploads. With threads, 
                each upload blocks a 2MB thread. With fibers, thousands of uploads can share a few OS threads, 
                using only 4KB per upload. Same functionality, 500x more efficient!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}