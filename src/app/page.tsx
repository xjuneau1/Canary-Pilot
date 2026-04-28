import HeroSection from "../components/hero-section";
import FinalCta from "../components/final-cta";
import HowItWorks from "../components/how-it-works";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#030712]">
      <div className="max-w-5xl mx-auto">     
        <HeroSection />    
        <HowItWorks />
        <FinalCta />     
      </div>
    </main>
  );
}
