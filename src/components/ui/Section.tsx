'use client';

import { ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Container from './Container';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClass?: string;
  background?: 'default' | 'subtle' | 'accent' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full';
}

const backgroundClasses = {
  default: 'bg-white dark:bg-gray-900',
  subtle: 'bg-gray-50 dark:bg-gray-900/50',
  accent: 'bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20',
  dark: 'bg-gray-900 text-white',
};

const paddingClasses = {
  none: '',
  sm: 'py-8 sm:py-12',
  md: 'py-12 sm:py-16 lg:py-20',
  lg: 'py-16 sm:py-20 lg:py-24',
  xl: 'py-20 sm:py-24 lg:py-32',
};

const Section = forwardRef<HTMLElement, SectionProps>(({
  children,
  id,
  className = '',
  containerClass = '',
  background = 'default',
  padding = 'lg',
  animate = true,
  maxWidth = '6xl',
}, ref) => {
  const SectionComponent = animate ? motion.section : 'section';
  
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, ease: 'easeOut' as const }
  } : {};

  return (
    <SectionComponent
      ref={ref}
      id={id}
      className={cn(
        'relative w-full',
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
      {...animationProps}
    >
      <Container className={containerClass} maxWidth={maxWidth}>
        {children}
      </Container>
    </SectionComponent>
  );
});

Section.displayName = 'Section';

export default Section;