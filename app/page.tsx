"use client";

import { useEffect } from "react";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import EventDetails from "@/components/EventDetails";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";
import { initSmoothScroll } from "@/lib/animations";
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

export default function Home() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
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
            image: "https://loihangwedding.io.vn/og-image.jpg",
            organizer: {
              "@type": "Person",
              name: "Loi & Hang",
            },
          }),
        }}
      />
      <div className="mx-auto w-full max-w-[468px] bg-white min-h-screen">
        <Audio />
        <SectionEnvelop />
        <SectionTime />
        <SectionQuote />
        <SectionActor />
        <SectionMansory />
        <SectionDate />
        <SectionSaveTheDate />
        <SectionBottom />
        <SectionQuoteSweet />
        {/* <Hero />
        <Timeline />
        <EventDetails />
        <Gallery />
        <RSVP />
        <Footer /> */}
      </div>
    </main>
  );
}
