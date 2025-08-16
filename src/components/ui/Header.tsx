'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Container from './Container';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        'sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-900/80',
        className
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white font-bold">
              Z
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              ZIO Academy
            </span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { href: '#problems', label: 'Problems' },
              { href: '#effects', label: 'Effects' },
              { href: '#fibers', label: 'Fibers' },
              { href: '#layers', label: 'Layers' },
              { href: '#comparison', label: 'vs Cats' },
              { href: '#playground', label: 'Try it' },
            ].map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                whileHover={{ y: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </Container>
    </motion.header>
  );
}