import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Nesrin Kara | Melbourne Tattoo Artist | NES TATTOO",
  description: "Meet Nesrin Kara, Melbourne tattoo artist with 8 years experience and a Bachelor of Fine Art. Specialising in colour realism, botanical, and nature-inspired custom tattoos.",
  openGraph: {
    title: "About Nesrin Kara | Melbourne Tattoo Artist",
    description: "8 years of professional tattooing with a Bachelor of Fine Art. Creating beautiful, unique, and meaningful custom tattoos in Melbourne.",
    url: 'https://nestattoo.com/about',
    images: ['/images/profile/profile-01.jpg'],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
