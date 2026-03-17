// app/page.js
// Pagina principal con todos los componentes


import Navbar           from '@/components/Navbar';
import Hero             from '@/components/Hero';
import Collection       from '@/components/Collection';
import HowToBuy         from '@/components/HowToBuy';
import About            from '@/components/About';
import StreetCulture    from '@/components/StreetCulture';
import Testimonials     from '@/components/Testimonials';
import Contact          from '@/components/Contact';
import Footer           from '@/components/Footer';
import WhatsAppButton   from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <main className="relative bg-brand-black overflow-hidden">
     

      {/* Navbar desplazado por la barra (top-9) */}
      <Navbar />
        <Hero />
        <Collection />
        <HowToBuy />
        <About />
        <StreetCulture />
        <Testimonials />
        <Contact />
        <Footer />
      

      {/* Elementos flotantes */}
      <WhatsAppButton />
    </main>
  );
}
