import { HeroCarousel } from "./components/HeroCarousel";
import { Navbar } from "./components/Navbar";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";

const App = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroCarousel />
    <AboutSection />
    <ServicesSection />
    <TestimonialsSection />
    <ContactSection />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default App;
