import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tattoo Portfolio | Colour Realism & Botanical Work | NES TATTOO Melbourne",
  description: "View Nesrin Kara's portfolio of colour realism, botanical, nature-inspired, and micro tattoos. Featuring floral designs, Australian native flowers, birds, and custom cover-ups.",
  openGraph: {
    title: "Tattoo Portfolio | NES TATTOO Melbourne",
    description: "Explore custom colour realism tattoos featuring botanical designs, nature-inspired art, and intricate micro work by Melbourne artist Nesrin Kara.",
    url: 'https://nestattoo.com/portfolio',
    images: ['/images/portfolio-highlights/hero-04.jpg'],
  },
  alternates: {
    canonical: '/portfolio',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
