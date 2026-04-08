import { TickerBar } from "./components/TickerBar";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { SocialProofBar } from "./components/SocialProofBar";
import { SymptomsSection } from "./components/SymptomsSection";
import { TickerBar2 } from "./components/TickerBar2";
import { MechanismSection } from "./components/MechanismSection";
import { AuthoritySection } from "./components/AuthoritySection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { OfferSection } from "./components/OfferSection";
import { GuaranteeSection } from "./components/GuaranteeSection";
import { FAQSection } from "./components/FAQSection";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

const App = () => (
  <div className="min-h-screen">
    <TickerBar />
    <Navbar />
    <HeroSection />
    <SocialProofBar />
    <SymptomsSection />
    <TickerBar2 />
    <MechanismSection />
    <AuthoritySection />
    <TestimonialsSection />
    <OfferSection />
    <GuaranteeSection />
    <FAQSection />
    <FinalCTA />
    <Footer />
  </div>
);

export default App;
