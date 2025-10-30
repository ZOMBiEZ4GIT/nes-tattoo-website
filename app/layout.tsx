import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import PasswordGate from "@/components/PasswordGate";

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
  title: "NES TATTOO - Custom Art & Cover-Ups",
  description: "Minimalist tattoo artist portfolio. Custom work, cover-ups, and touch-ups.",
  keywords: ["tattoo", "custom tattoo", "cover-up", "tattoo artist", "NES TATTOO"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <PasswordGate>{children}</PasswordGate>
      </body>
    </html>
  );
}
