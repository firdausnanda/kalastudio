import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import DetailedFeatures from '../components/DetailedFeatures';
import IndustryUseCases from '../components/IndustryUseCases';
import Testimonials from '../components/Testimonials';
import BottomCTA from '../components/BottomCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-white text-slate-900 font-display transition-colors duration-300 dark:bg-slate-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <DetailedFeatures />
        <IndustryUseCases />
        <Testimonials />
        <BottomCTA />
      </main>
      <Footer />
    </div>
  );
}
