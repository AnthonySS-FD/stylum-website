# STYLUM — Streetwear Web

Página web premium para la marca de streetwear STYLUM.  
Construida con **Next.js 14**, **Tailwind CSS** y **Framer Motion**.

---

## 🗂 Estructura de carpetas

```
stylum/
├── app/
│   ├── globals.css        ← Estilos base, variables CSS, grain overlay
│   ├── layout.js          ← Root layout (metadatos, fuentes)
│   └── page.js            ← Página principal
├── components/
│   ├── Navbar.jsx         ← Navbar sticky con menú mobile
│   ├── Hero.jsx           ← Hero fullscreen con animaciones
│   ├── Collection.jsx     ← Grid de productos con hover effects
│   ├── About.jsx          ← Sección "Sobre STYLUM"
│   ├── StreetCulture.jsx  ← Sección visual con parallax
│   ├── Contact.jsx        ← Botones Instagram + WhatsApp
│   └── Footer.jsx         ← Footer con wordmark gigante
├── public/                ← Imágenes estáticas (coloca tus fotos aquí)
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## ⚡ Instalación y ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 3. Build para producción

```bash
npm run build
npm start
```

---

## 🎨 Personalización

### Colores
Edita `tailwind.config.js` → sección `colors.brand`:
- `accent`: Color de acento principal (por defecto `#D4FF00` — lima eléctrico)
- `black`: Fondo principal
- `surface`: Fondo de tarjetas

### Tipografía
Las fuentes están en `app/globals.css` (Google Fonts CDN):
- **Display**: Big Shoulders Display (títulos)
- **Body**: DM Sans (párrafos)

### Productos
Edita el array `PRODUCTS` en `components/Collection.jsx`:
```js
{
  id: 1,
  name: 'BOXYFIT Essential Black',
  price: 'S/. 89.00',
  tag: 'Más vendido',         // null para sin badge
  color: 'Negro',
  image: 'URL_DE_TU_FOTO',    // ← Reemplaza con fotos reales
}
```

### Imágenes de lifestyle (StreetCulture)
Edita el array `PANELS` en `components/StreetCulture.jsx` con tus propias imágenes.

### Links de contacto
En `components/Contact.jsx`:
- **Instagram**: cambia `href: 'https://instagram.com/stylum.pe'`
- **WhatsApp**: cambia el número en `href: 'https://wa.me/51TU_NUMERO'`

En `components/Footer.jsx` actualiza los mismos datos.

---

## 📱 Responsive
El diseño es completamente responsive:
- Mobile: 1 columna, tipografía escalada
- Tablet (md): 2 columnas en productos
- Desktop (lg/xl): 3 columnas, layout split

---

## 🚀 Deploy en Vercel

```bash
npx vercel
```

O conecta el repo directamente en [vercel.com](https://vercel.com).

---

## 🛠 Tecnologías
| Tech | Versión | Uso |
|------|---------|-----|
| Next.js | 14.2 | Framework React |
| Tailwind CSS | 3.4 | Utilidades CSS |
| Framer Motion | 11 | Animaciones |
| next/image | — | Optimización de imágenes |

---

© STYLUM — Streetwear with attitude
