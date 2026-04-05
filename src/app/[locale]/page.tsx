import Hero3D from '@/components/sections/Hero3D';
import SocialProof from '@/components/sections/SocialProof';
import ROICalculator from '@/components/sections/ROICalculator';
import Portfolio from '@/components/sections/Portfolio';
import Features from '@/components/sections/Features';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative flex flex-col pb-0">
      <Hero3D />


      <SocialProof />
      <ROICalculator />
      <Portfolio />
      <Features />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
