export default function SchemaMarkup() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "TattooParlor"],
    "name": "NES TATTOO",
    "legalName": "Nesrin Kara Tattoo",
    "url": "https://nestattoo.com",
    "logo": "https://nestattoo.com/images/portfolio-highlights/hero-01.jpg",
    "description": "Melbourne-based fine art colour realism tattoo artist specialising in botanical, nature-inspired, and custom tattoo designs.",
    "founder": {
      "@type": "Person",
      "name": "Nesrin Kara",
      "jobTitle": "Tattoo Artist",
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Bachelor of Fine Art"
      },
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "Bachelor of Fine Art"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Melbourne",
      "addressRegion": "VIC",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "AU"
    },
    "telephone": "+61447955182",
    "email": "nes@nestattoo.com",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.instagram.com/nesrinkaraa_"
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Melbourne"
      },
      {
        "@type": "State",
        "name": "Victoria"
      },
      {
        "@type": "Country",
        "name": "Australia"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tattoo Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Tattoo Design",
            "description": "Bespoke custom tattoo designs tailored to your vision, specialising in colour realism and botanical themes."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Botanical & Floral Tattoos",
            "description": "Nature-inspired tattoos featuring flowers, plants, and Australian native flora with fine art colour realism."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Bird & Wildlife Tattoos",
            "description": "Detailed bird illustrations and wildlife tattoos including hummingbirds, native Australian birds, and fauna."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Micro Tattoos",
            "description": "Intricate miniature tattoos with exceptional detail at small scale, perfect for subtle designs."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cover-Up Tattoos",
            "description": "Expert cover-up work transforming existing tattoos with bold colour saturation and detailed artistry."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Free Consultation",
            "description": "Complimentary consultation to discuss your tattoo ideas, placement, style, and design process."
          }
        }
      ]
    }
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nesrin Kara",
    "alternateName": "NES TATTOO",
    "jobTitle": "Tattoo Artist",
    "description": "Fine art colour realism tattoo artist with 8 years of professional experience, specialising in botanical and nature-inspired custom tattoos.",
    "url": "https://nestattoo.com",
    "image": "https://nestattoo.com/images/profile/profile-01.jpg",
    "email": "nes@nestattoo.com",
    "telephone": "+61447955182",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Melbourne",
      "addressRegion": "VIC",
      "addressCountry": "AU"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Bachelor of Fine Art"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Tattoo Artist",
      "occupationLocation": {
        "@type": "City",
        "name": "Melbourne"
      },
      "skills": [
        "Colour Realism",
        "Botanical Tattoos",
        "Nature-Inspired Art",
        "Fine Art Tattooing",
        "Micro Tattoos",
        "Cover-Up Tattoos",
        "Custom Tattoo Design"
      ],
      "yearsOfExperience": 8
    },
    "sameAs": [
      "https://www.instagram.com/nesrinkaraa_"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
