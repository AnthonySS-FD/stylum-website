// app/robots.js
// Archivo robots.txt — le dice a Google cómo rastrear tu web

var BASE_URL = 'https://stylum-kappa.vercel.app';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: BASE_URL + '/sitemap.xml',
  };
}
