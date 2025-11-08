import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Custom Tattoo | Free Consultation | NES TATTOO Melbourne",
  description: "Book your custom tattoo consultation with Melbourne artist Nesrin Kara. Specialising in colour realism, botanical, and nature-inspired designs. Free consultations available.",
  openGraph: {
    title: "Book Your Custom Tattoo | NES TATTOO Melbourne",
    description: "Schedule your free consultation for a custom colour realism tattoo in Melbourne. Experienced artist specialising in botanical and nature-inspired designs.",
    url: 'https://nestattoo.com/booking',
    images: ['/images/portfolio-highlights/hero-01.jpg'],
  },
  alternates: {
    canonical: '/booking',
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
