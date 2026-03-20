import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { TrustedBrands } from './components/TrustedBrands';
import { Services } from './components/Services';
import { CTA } from './components/CTA';
import { Process } from './components/Process';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { LanguageProvider } from './context/LanguageContext';
import { SEO } from './components/SEO';
import { FloatingContacts } from './components/FloatingContacts';
import { CookieConsent } from './components/CookieConsent';
import { ThankYou } from './components/ThankYou';

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <SEO />
      <div className="min-h-screen overflow-x-hidden w-full relative" style={{ background: '#ffffff' }}>
        <Header />
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <About />
        <TrustedBrands />
        <Services />
        <CTA onOpenModal={() => setIsModalOpen(true)} />
        <Process />
        <FAQ />
        <Contact />
        <Footer />
        <ContactModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        <FloatingContacts />
        <CookieConsent />
      </div>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;