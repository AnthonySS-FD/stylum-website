// app/layout.js
// Layout con SEO completo — Open Graph, Twitter Cards, metadatos

import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Cart from '@/components/Cart';
import CartFloatingButton from '@/components/CartFloatingButton';
import LoadingScreen from '@/components/LoadingScreen';
import WhatsAppButton from '@/components/WhatsAppButton';

// ── URL base de tu web ── cambia si tienes dominio propio
var BASE_URL = 'https://www.stylum.pe';

export const metadata = {
  // ── Titulo y descripcion ──────────────────────────────────────
  title: {
    default: 'STYLUM | Polos BOXYFIT Streetwear Peru | Compra Online',
    template: '%s | STYLUM',
  },
  description:
    'STYLUM es una marca de streetwear peruana con polos BOXYFIT de corte español. Diseño exclusivo, tela premium y acabados impecables. Envios a todo el Peru.',

  // ── Keywords ─────────────────────────────────────────────────
  keywords: [
    'stylum',
    'stylum peru',
    'streetwear peru',
    'polos boxyfit',
    'polos oversize peru',
    'ropa streetwear lima',
    'polos premium peru',
    'moda urbana peru',
    'boxyfit',
    'polos con diseño',
    'ropa urbana lima',
    'streetwear lima',
  ],

  // ── Autor y marca ─────────────────────────────────────────────
  authors: [{ name: 'STYLUM', url: BASE_URL }],
  creator: 'STYLUM',
  publisher: 'STYLUM',
  category: 'Moda y ropa',

  // ── Open Graph (WhatsApp, Facebook, etc) ─────────────────────
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: BASE_URL,
    siteName: 'STYLUM',
    title: 'STYLUM — Polos BOXYFIT Peru | Streetwear con actitud',
    description:
      'Polos BOXYFIT con diseño exclusivo y tela premium. Marca streetwear peruana. Envios a todo el Peru.',
    images: [
      {
        url: BASE_URL + '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'STYLUM — Streetwear con actitud',
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'STYLUM — Streetwear con actitud',
    description: 'Polos BOXYFIT con diseño exclusivo. Marca streetwear peruana.',
    images: [BASE_URL + '/og-image.jpg'],
  },

  // ── Robots (le dice a Google que indexe) ──────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Canonical URL ─────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Verificacion Google Search Console ───────────────────────
  // Descomenta y pega tu codigo de verificacion cuando lo tengas:
  // verification: {
  //   google: 'TU_CODIGO_DE_VERIFICACION_AQUI',
  // },

  // ── Iconos ────────────────────────────────────────────────────
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Schema.org — datos estructurados para Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ClothingStore',
              name: 'STYLUM',
              description:
                'Marca de streetwear peruana. Polos BOXYFIT con diseño exclusivo y tela premium.',
              url: BASE_URL,
              logo: BASE_URL + '/LOGO STYLUM.png',
              image: BASE_URL + '/og-image.jpg',
              telephone: '+51934357309',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Lima',
                addressCountry: 'PE',
              },
              sameAs: [
                'https://instagram.com/stylum.oficial',
                'https://tiktok.com/@stylum.oficial',
              ],
              priceRange: 'S/. 49 - S/. 99',
              openingHours: 'Mo-Sa 09:00-21:00',
              currenciesAccepted: 'PEN',
              paymentAccepted: 'Yape, Plin, Transferencia, Efectivo',
            }),
          }}
        />
      </head>
      <body className="grain-overlay antialiased">
        <CartProvider>
          <LoadingScreen />
          {children}
          <Cart />
          <CartFloatingButton />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
