import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '../../src/i18n/routing';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/CartDrawer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages: any = await getMessages({ locale });
  const seo = messages.SEO;

  return {
    title: seo.title,
    description: seo.description,
    metadataBase: new URL('https://instintosaludable.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'es': '/es',
        'fr': '/fr',
        'pt': '/pt',
        'it': '/it',
        'de': '/de',
        'ru': '/ru',
        'pl': '/pl',
      },
    },
    openGraph: {
      title: seo.og_title,
      description: seo.og_description,
      url: `https://instintosaludable.com/${locale}`,
      siteName: 'Instinto Saludable',
      locale: locale,
      type: 'website',
      images: [
        {
          url: '/instinto-logo.png',
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.og_title,
      description: seo.og_description,
      images: ['/instinto-logo.png'],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/favicon.ico',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale: string) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Set the request locale for server components
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Instinto Saludable',
    url: 'https://instintosaludable.com',
    logo: 'https://instintosaludable.com/instinto-logo.png',
    sameAs: [
      'https://www.facebook.com/instintosaludable',
      'https://www.instagram.com/instintosaludable',
      'https://www.twitter.com/instintosaludable'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'instintosaludableusa@gmail.com',
      contactType: 'customer service'
    }
  };

  return (
    <html lang={locale} className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${playfair.variable} antialiased bg-slate-950 text-slate-100 min-h-screen relative`}
      >
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Header />
            {children}
            <CartDrawer />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
