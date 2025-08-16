import { Header } from '@/components/ui';
import HeroSection from '@/components/sections/HeroSection';
import ProblemsSection from '@/components/sections/ProblemsSection';
import EffectsSection from '@/components/sections/EffectsSection';
import FibersSection from '@/components/sections/FibersSection';
import LayersSection from '@/components/sections/LayersSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import RealWorldSection from '@/components/sections/RealWorldSection';
import PlaygroundSection from '@/components/sections/PlaygroundSection';
import FinalSection from '@/components/sections/FinalSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProblemsSection />
      <EffectsSection />
      <FibersSection />
      <LayersSection />
      <ComparisonSection />
      <RealWorldSection />
      <PlaygroundSection />
      <FinalSection />
    </main>
  );
}
