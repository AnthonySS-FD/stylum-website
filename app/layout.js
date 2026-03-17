// app/layout.js
// Root layout con CartProvider + LoadingScreen

import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Cart from '@/components/Cart';
import CartFloatingButton from '@/components/CartFloatingButton';
import LoadingScreen from '@/components/LoadingScreen';

export const metadata = {
  title: 'STYLUM - Streetwear with Attitude',
  description: 'Polos BOXYFIT autenticos, minimalistas y con identidad.',
  keywords: ['stylum', 'streetwear', 'boxyfit', 'polos', 'moda urbana'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="grain-overlay antialiased">
        <CartProvider>
          <LoadingScreen />
          {children}
          <Cart />
          <CartFloatingButton />
        </CartProvider>
      </body>
    </html>
  );
}
