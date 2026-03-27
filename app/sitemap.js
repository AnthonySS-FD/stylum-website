// app/sitemap.js
// Sitemap automatico — Google usa esto para indexar tu web

var BASE_URL = 'https://stylum-kappa.vercel.app';

export default function sitemap() {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: BASE_URL + '/nosotros',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
