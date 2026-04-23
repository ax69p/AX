import dynamic from 'next/dynamic';
import Hero3D from '@/components/sections/Hero3D';

const SocialProof = dynamic(() => import('@/components/sections/SocialProof'));
const ROICalculator = dynamic(() => import('@/components/sections/ROICalculator'));
const Portfolio = dynamic(() => import('@/components/sections/Portfolio'));
const Features = dynamic(() => import('@/components/sections/Features'));
const Pricing = dynamic(() => import('@/components/sections/Pricing'));
const FAQ = dynamic(() => import('@/components/sections/FAQ'));
const FinalCTA = dynamic(() => import('@/components/sections/FinalCTA'));

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
