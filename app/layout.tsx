import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import PasswordGate from "@/components/PasswordGate";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  title: "NES TATTOO - Your Vision, My Art",
  description: "Custom tattoo artist specialising in floral and nature-inspired designs. Bringing your unique vision to life with precision and artistry.",
  keywords: ["tattoo", "custom tattoo", "floral tattoo", "nature tattoo", "tattoo artist", "NES TATTOO", "Australian tattoo artist"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <PasswordGate>{children}</PasswordGate>
        <WhatsAppButton />
      </body>
    </html>
  );
}
