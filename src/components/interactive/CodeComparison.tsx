'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeExample {
  id: string;
  language: 'scala';
  code: string;
  issues?: Array<{
    line: number;
    type: 'error' | 'warning' | 'info';
    message: string;
  }>;
  benefits?: Array<{
    line: number;
    type: 'success' | 'info';
    message: string;
  }>;
}

interface CodeComparisonProps {
  futureCode: CodeExample;
  zioCode: CodeExample;
  title?: string;
  className?: string;
}

const getIconByType = (type: string) => {
  switch (type) {
    case 'error':
      return <AlertTriangle className="w-4 h-4 text-danger-500" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 text-accent-500" />;
    case 'success':
      return <CheckCircle className="w-4 h-4 text-success-500" />;
    case 'info':
    default:
      return <Info className="w-4 h-4 text-primary-500" />;
  }
};

const CodeBlock = ({ 
  example, 
  title, 
  variant = 'future' 
}: { 
  example: CodeExample; 
  title: string; 
  variant?: 'future' | 'zio';
}) => {
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const lines = example.code.split('\n');
  const annotations = variant === 'future' ? example.issues || [] : example.benefits || [];

  return (
    <div className={cn(
      "relative bg-gray-900 rounded-xl overflow-hidden",
      variant === 'future' && "border-2 border-danger-500/20",
      variant === 'zio' && "border-2 border-success-500/20"
    )}>
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between px-4 py-3 border-b",
        variant === 'future' && "bg-danger-500/10 border-danger-500/20",
        variant === 'zio' && "bg-success-500/10 border-success-500/20"
      )}>
        <h3 className="font-mono text-sm font-medium text-white">{title}</h3>
        <span className={cn(
          "px-2 py-1 rounded text-xs font-medium",
          variant === 'future' && "bg-danger-500/20 text-danger-300",
          variant === 'zio' && "bg-success-500/20 text-success-300"
        )}>
          {variant === 'future' ? 'Problematic' : 'Better with ZIO'}
        </span>
      </div>

      {/* Code */}
      <div className="relative">
        <pre className="p-4 text-sm overflow-x-auto">
          {lines.map((line, index) => {
            const lineNumber = index + 1;
            const annotation = annotations.find(a => a.line === lineNumber);
            const hasAnnotation = !!annotation;

            return (
              <motion.div
                key={lineNumber}
                className={cn(
                  "relative flex items-start group",
                  hasAnnotation && "bg-gray-800/50"
                )}
                onMouseEnter={() => setHoveredLine(lineNumber)}
                onMouseLeave={() => setHoveredLine(null)}
                whileHover={{ x: hasAnnotation ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Line number */}
                <span className="inline-block w-8 text-gray-500 text-right pr-4 select-none">
                  {lineNumber}
                </span>
                
                {/* Code */}
                <code className="text-gray-300 flex-1">
                  {line || ' '}
                </code>

                {/* Annotation indicator */}
                {hasAnnotation && (
                  <div className="ml-2 flex-shrink-0">
                    {getIconByType(annotation.type)}
                  </div>
                )}

                {/* Tooltip */}
                <AnimatePresence>
                  {hasAnnotation && hoveredLine === lineNumber && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className={cn(
                        "absolute left-full ml-4 top-0 z-10 px-3 py-2 rounded-lg text-sm font-medium shadow-xl border min-w-[200px] max-w-[300px]",
                        annotation.type === 'error' && "bg-danger-50 border-danger-200 text-danger-800 dark:bg-danger-950 dark:border-danger-800 dark:text-danger-200",
                        annotation.type === 'warning' && "bg-accent-50 border-accent-200 text-accent-800 dark:bg-accent-950 dark:border-accent-800 dark:text-accent-200",
                        annotation.type === 'success' && "bg-success-50 border-success-200 text-success-800 dark:bg-success-950 dark:border-success-800 dark:text-success-200",
                        annotation.type === 'info' && "bg-primary-50 border-primary-200 text-primary-800 dark:bg-primary-950 dark:border-primary-800 dark:text-primary-200"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        {getIconByType(annotation.type)}
                        <span>{annotation.message}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};

export default function CodeComparison({ 
  futureCode, 
  zioCode, 
  title = "Code Comparison",
  className = ""
}: CodeComparisonProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Hover over the warning icons to see what's problematic
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <CodeBlock 
            example={futureCode}
            title="Future - The Leaky Bucket"
            variant="future"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CodeBlock 
            example={zioCode}
            title="ZIO - The Sealed Vault"
            variant="zio"
          />
        </motion.div>
      </div>
    </div>
  );
}