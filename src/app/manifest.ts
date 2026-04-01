import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AxentriX - Premium Web Agency',
    short_name: 'AxentriX',
    description: 'High-converting digital experiences tailored for ambitious businesses.',
    start_url: '/',
    display: 'standalone',
    background_color: '#04080e',
    theme_color: '#10a7f7',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
