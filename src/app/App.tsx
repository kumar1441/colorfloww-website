import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { HowItWorks } from './components/HowItWorks';
import { FeatureShowcase } from './components/FeatureShowcase';
import { Benefits } from './components/Benefits';
import { CommunityFeatures } from './components/CommunityFeatures';
import { FAQ } from './components/FAQ';
import { EmailCTA } from './components/EmailCTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <FeatureShowcase />
      <Benefits />
      <CommunityFeatures />
      <FAQ />
      <EmailCTA />
      <Footer />
    </div>
  );
}
