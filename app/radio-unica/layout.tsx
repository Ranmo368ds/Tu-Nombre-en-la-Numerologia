import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../[locale]/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Radio Unica Chicago | Música Latina y Éxitos Online',
    description: 'Escucha Radio Unica en vivo desde Chicago. La mejor mezcla de éxitos latinos, programas exclusivos y energía positiva. Tu conexión con la música que mueve tu mundo.',
    keywords: ['radio unica', 'radio chicago', 'radio online', 'musica latina', 'radio en vivo', 'chicago', 'latin hits', 'streaming'],
    openGraph: {
        title: 'Radio Unica Chicago - En Vivo',
        description: 'Conéctate con la mejor música latina desde Chicago. ¡Escúchanos online ahora!',
        url: 'https://radiounica.us',
        siteName: 'Radio Unica',
        images: [
            {
                url: '/logo-icon-transparent.svg', // O usar una imagen social dedicada si la tenemos
                width: 800,
                height: 600,
                alt: 'Radio Unica Logo',
            },
        ],
        locale: 'es_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Radio Unica Chicago',
        description: 'La voz de los latinos en Chicago. Escucha en vivo.',
    },
    icons: {
        icon: '/logo-icon-transparent.svg',
    }
};

export default function RadioUnicaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
