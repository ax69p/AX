import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Communications from "@/components/ui/Communications";
import LeadMagnet from "@/components/ui/LeadMagnet";
import "../globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://axentrix.agency';
 
  return {
    title: {
      template: `%s | AxentriX`,
      default: t('title'),
    },
    description: t('description'),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: './',
      siteName: 'AxentriX',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      creator: '@axentrixsy',
    },
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
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  // Arabic locales should use RTL direction
  const isRtl = locale === 'ar';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} className="scroll-smooth">
      <body
        className={`${syne.variable} ${dmSans.variable} font-dm-sans bg-background text-foreground antialiased selection:bg-cyan-500/30 selection:text-cyan-100`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          {children}
          <Communications />
          <LeadMagnet />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
