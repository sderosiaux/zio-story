'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, MessageCircle, Book, Zap, Heart } from 'lucide-react';
import { Section, Button } from '@/components/ui';

export default function FinalSection() {
  return (
    <Section id="final" className="py-20">
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Now go fix your{' '}
            <span className="text-danger-500 relative">
              Future
              <motion.div
                className="absolute inset-0 bg-danger-500/10 rounded-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
            You've learned why ZIO exists, how it works, and seen it in action. 
            The functional effects revolution is here - are you ready to join it? 🚀
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button 
            size="xl"
            className="text-lg px-8 py-4 group"
            onClick={() => window.open('https://zio.dev/guides/', '_blank')}
            icon={<Book className="w-5 h-5" />}
          >
            Start Building with ZIO
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline"
            size="xl"
            className="text-lg px-8 py-4"
            onClick={() => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' })}
            icon={<Zap className="w-5 h-5" />}
          >
            Try Playground Again
          </Button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="grid sm:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="https://github.com/zio/zio"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gray-900 rounded-lg">
                <Github className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                GitHub Repository
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Star the repo, explore the source code, and contribute to the ecosystem. 
              15K+ stars can't be wrong!
            </p>
            <div className="mt-3 text-xs text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform">
              github.com/zio/zio →
            </div>
          </motion.a>

          <motion.a
            href="https://discord.gg/2ccFBr4"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Discord Community
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Join 3K+ developers helping each other. Ask questions, share projects, 
              and learn from ZIO experts.
            </p>
            <div className="mt-3 text-xs text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform">
              discord.gg/2ccFBr4 →
            </div>
          </motion.a>

          <motion.a
            href="https://zio.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary-500 rounded-lg">
                <Book className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Official Documentation
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Comprehensive guides, tutorials, and API references. 
              Everything you need to become a ZIO expert.
            </p>
            <div className="mt-3 text-xs text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform">
              zio.dev →
            </div>
          </motion.a>
        </motion.div>

        {/* Thank You */}
        <motion.div
          className="bg-gradient-to-r from-primary-50 to-success-50 dark:from-primary-950/20 dark:to-success-950/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-red-500" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Made with Love for the Scala Community
            </h3>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            This interactive guide was created to make ZIO more approachable and exciting. 
            Special thanks to the ZIO team for building such an elegant library, 
            and to the community for sharing their knowledge.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-primary-500 rounded-full" />
              <span>Built with Next.js & Tailwind</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-success-500 rounded-full" />
              <span>Animations by Framer Motion</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-accent-500 rounded-full" />
              <span>Code editing with Monaco</span>
            </div>
          </div>
        </motion.div>

        {/* Final Quote */}
        <motion.blockquote
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">
            "The best time to start using ZIO was yesterday. 
            The second best time is now."
          </p>
          <footer className="text-sm text-gray-500 dark:text-gray-500">
            — Every developer who switched from Future 😄
          </footer>
        </motion.blockquote>
      </div>
    </Section>
  );
}