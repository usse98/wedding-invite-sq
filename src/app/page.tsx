import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import OurStory from '@/components/OurStory';
import VenueShowcase from '@/components/VenueShowcase';
import Timeline from '@/components/Timeline';
import Gallery from '@/components/Gallery';
import TravelStay from '@/components/TravelStay';
import MapSection from '@/components/MapSection';
import DressCode from '@/components/DressCode';
import Rsvp from '@/components/Rsvp';
import Faq from '@/components/Faq';
import ShareSection from '@/components/ShareSection';
import MusicToggle from '@/components/MusicToggle';
import { config } from '@/lib/config';

// 3D scene must run client-side only (WebGL).
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function Page() {
  return (
    <main className="relative">
      {/* 3D canvas — pinned to viewport. We mask everything below the hero
          via opacity scrim on the page bg + section-bed dim, so the rings
          only effectively appear behind the hero. */}
      <div className="fixed inset-0" style={{ zIndex: 0 }} aria-hidden>
        <Scene />
      </div>

      {/* Floating UI controls */}
      <MusicToggle />

      {/* Page content stacks above the canvas */}
      <Hero />
      <Countdown />
      <OurStory />
      <VenueShowcase />
      <Timeline />
      <Gallery />
      <TravelStay />
      <MapSection />
      <DressCode />
      <Rsvp />
      <Faq />
      <ShareSection />

      <footer className="relative z-10 border-t border-cream/10 px-6 py-10 text-center">
        <p className="script text-2xl text-rose/85">{config.bride} &amp; {config.groom}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.32em] text-cream/55">
          {config.dateLabelShort} · {config.venue.name}
        </p>
        <p className="mt-4 text-[11px] text-cream/45">
          Bërë me dashuri · Prekni dhe tërhiqni skenën për të eksploruar
        </p>
      </footer>
    </main>
  );
}
