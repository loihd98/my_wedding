import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { SectionEnvelop } from "@/components/SectionEnvelop";
import Audio from "@/components/Audio";
import SectionTime from "@/components/SectionTime";
import SectionQuote from "@/components/SectionQuote";
import SectionActor from "@/components/SectionActor";
import SectionMansory from "@/components/SectionMansory";
import { SectionDate } from "@/components/SectionDate";
import SectionSaveTheDate from "@/components/SectionSaveTheDate";
import { SectionBottom } from "@/components/SectionBottom";
import SectionQuoteSweet from "@/components/SectionQuoteSweet";
import SectionRsvp from "@/components/SectionRsvp";
import Navigation from '@/components/Navigation'
import ClientWrapper from '@/components/ClientWrapper'

// Valid slugs
const validSlugs = ['groom', 'bridal'] as const
type ValidSlug = typeof validSlugs[number]

interface PageProps {
  params: {
    slug: string
  }
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug as ValidSlug

  if (!validSlugs.includes(slug as ValidSlug)) {
    return {
      title: 'Page Not Found'
    }
  }

  const titles = {
    groom: 'Chú Rể - Loi & Hang Wedding',
    bridal: 'Cô Dâu - Loi & Hang Wedding'
  }

  const descriptions = {
    groom: 'Wedding invitation - Thông tin về chú rể Hà Lợi',
    bridal: 'Wedding invitation - Thông tin về cô dâu Trần Hằng'
  }

  return {
    title: titles[slug],
    description: descriptions[slug],
    openGraph: {
      title: titles[slug],
      description: descriptions[slug],
      type: 'website',
    },
  }
}

// Generate static params for static generation
export function generateStaticParams() {
  return validSlugs.map((slug) => ({
    slug: slug,
  }))
}

export default function SlugPage({ params }: PageProps) {
  const slug = params.slug as ValidSlug

  // Check if slug is valid
  if (!validSlugs.includes(slug as ValidSlug)) {
    notFound()
  }

  // Define theme colors based on slug
  const themeColors = {
    groom: {
      background: 'from-blue-50 via-white to-blue-50',
      accent: 'blue'
    },
    bridal: {
      background: 'from-pink-50 via-white to-pink-50',
      accent: 'pink'
    }
  }

  const theme = themeColors[slug]

  return (
    <main className={`min-h-screen max-w-[468px] mx-auto w-full`}>
      {/* JSON-LD Schema for Wedding Event */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "Loi & Hang Wedding Ceremony",
            description: "Join us as we celebrate the union of Loi and Hang",
            startDate: "2026-06-15T14:00:00+07:00",
            endDate: "2026-06-15T22:00:00+07:00",
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            location: {
              "@type": "Place",
              name: "Grand Palace Wedding Hall",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Wedding Street",
                addressLocality: "Ho Chi Minh City",
                addressRegion: "HCM",
                postalCode: "700000",
                addressCountry: "VN",
              },
            },
            organizer: {
              "@type": "Person",
              name: "Loi & Hang",
            },
          }),
        }}
      />

      <ClientWrapper>
        {/* Navigation */}
        {/* <Navigation currentSlug={slug} /> */}

        {/* Audio Component */}
        <Audio />

        {/* All Sections */}
        <SectionEnvelop slug={slug} />
        <SectionTime />
        <SectionQuote />
        <SectionActor />
        <SectionMansory />
        <SectionDate />
        <SectionSaveTheDate />
        <SectionQuoteSweet />
        <SectionRsvp />
        {/* <SectionBottom /> */}
      </ClientWrapper>
    </main>
  );
}