import { useEffect, useState } from 'react';
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
import { FloatingContacts } from './components/FloatingContacts';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = 'ro';
    document.title = 'LEX BUSINESS HUB - Înregistrarea afacerii în România | Consultanță pentru antreprenori';

    const metaTags = [
      { name: 'description', content: 'Servicii profesionale pentru lansarea și dezvoltarea afacerii în România. Înregistrare companii, contabilitate, asistență juridică, permis de ședere.' },
      { name: 'keywords', content: 'înregistrare afacere România, deschide companie București, contabilitate pentru ucraineni în România, permis de ședere România, servicii juridice România, consultanță antreprenori, SRL înregistrare, relocare în România, LEX BUSINESS HUB' },
      { name: 'geo.region', content: 'RO' },
      { name: 'geo.placename', content: 'București' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'LEX BUSINESS HUB' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'LEX BUSINESS HUB - Înregistrarea afacerii în România' },
      { property: 'og:description', content: 'Servicii profesionale pentru lansarea și dezvoltarea afacerii în România.' },
      { property: 'og:locale', content: 'ro_RO' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'LEX BUSINESS HUB - Înregistrarea afacerii în România' },
    ];

    metaTags.forEach(({ name, property, content }: { name?: string; property?: string; content: string }) => {
      const existingTag = name
        ? document.querySelector(`meta[name="${name}"]`)
        : document.querySelector(`meta[property="${property}"]`);

      if (existingTag) {
        existingTag.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        if (name) meta.setAttribute('name', name);
        if (property) meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    });
  }, []);

  return (
    <LanguageProvider>
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
      </div>
    </LanguageProvider>
  );
}

export default App;