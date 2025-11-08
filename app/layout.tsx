import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import PasswordGate from "@/components/PasswordGate";
import WhatsAppButton from "@/components/WhatsAppButton";
import SchemaMarkup from "@/components/SchemaMarkup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "NES TATTOO | Fine Art Colour Realism Tattoo Artist Melbourne",
  description: "Melbourne tattoo artist Nesrin Kara specialises in fine art colour realism, botanical designs, and nature-inspired custom tattoos. 8 years experience. Book your consultation.",
  keywords: [
    "Melbourne tattoo artist",
    "colour realism tattoo Melbourne",
    "botanical tattoo artist",
    "nature tattoo Melbourne",
    "floral tattoo artist Melbourne",
    "custom tattoo Melbourne CBD",
    "fine art tattoo",
    "Australian tattoo artist",
    "cover up tattoo Melbourne",
    "micro tattoo Melbourne",
  ],
  authors: [{ name: "Nesrin Kara" }],
  creator: "Nesrin Kara",
  publisher: "NES TATTOO",
  metadataBase: new URL('https://nestattoo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "NES TATTOO | Fine Art Colour Realism Tattoo Artist Melbourne",
    description: "Melbourne tattoo artist specialising in fine art colour realism, botanical designs, and nature-inspired custom tattoos. 8 years experience.",
    url: 'https://nestattoo.com',
    siteName: 'NES TATTOO',
    images: [
      {
        url: '/images/portfolio-highlights/hero-01.jpg',
        width: 800,
        height: 800,
        alt: 'Fine art colour realism tattoo by Melbourne artist Nesrin Kara',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "NES TATTOO | Fine Art Colour Realism Tattoo Artist Melbourne",
    description: "Melbourne tattoo artist specialising in botanical and nature-inspired custom tattoos. 8 years experience.",
    images: ['/images/portfolio-highlights/hero-01.jpg'],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <SchemaMarkup />
      </head>
      <body className={inter.className}>
        <PasswordGate>{children}</PasswordGate>
        <WhatsAppButton />
      </body>
    </html>
  );
}
