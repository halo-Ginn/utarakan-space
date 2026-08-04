'use client'

// UTARAKAN — Homepage (updated: + KirimCerita + DukungKami)
// Location: app/page.tsx  (REPLACE the whole existing file with this)
import Foyer from '@/app/components/Foyer'
import { useLanguage } from '@/app/context/LanguageContext'
import SupportBanner from '@/app/components/SupportBanner'
import Link from 'next/link'

const INTRO_ID = `Halo. Selamat datang di Utarakan.Space 

Ruang untuk berbagi, mengolah rasa, memulihkan hati, menemukan, dan mencintai diri sendiri. Kami hadir sebagai teman seperjalanan dalam melewati berbagai tantangan psikologis dan untuk terus belajar bersama...`

const INTRO_EN = `Hello. Welcome to Utarakan.Space

A space to share, process emotions, heal the heart, and discover and love yourself. We are here as companions on your journey through life's psychological challenges, learning and growing together...`

const VALUES_ID = [
  { icon: '🤝', title: 'Teman Seperjalanan', desc: 'Hadir bersama sebagai sesama manusia yang saling menopang.' },
  { icon: '🌿', title: 'Aman & Terbuka', desc: 'Ruang bebas penghakiman di mana semua perasaan disambut.' },
  { icon: '💛', title: 'Tumbuh Bersama', desc: 'Belajar, pulih, dan berkembang satu langkah demi satu langkah.' },
]
const VALUES_EN = [
  { icon: '🤝', title: 'Fellow Travelers', desc: 'Present together as fellow humans who uplift one another.' },
  { icon: '🌿', title: 'Safe & Open', desc: 'A non-judgmental space where every feeling is welcomed.' },
  { icon: '💛', title: 'Grow Together', desc: 'Learn, heal, and grow — one step at a time.' },
]

export default function HomePage() {
  const { lang } = useLanguage()

  const intro = lang === 'id' ? INTRO_ID : INTRO_EN
  const values = lang === 'id' ? VALUES_ID : VALUES_EN

  return (
    <><Foyer />
      {/* ═══════════════════════════════════════ HERO */}
      <section
        className="relative leaf-bg min-h-[92vh] flex items-center"
        style={{ background: 'linear-gradient(160deg, #2d3b2d 0%, #3d5040 45%, #4a5d4a 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(184,115,51,0.12) 0%, transparent 60%)' }} />
        <div className="absolute top-20 right-12 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #d4af37, transparent)' }} />
        <div className="absolute bottom-16 left-8 w-48 h-48 rounded-full opacity-8 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #b87333, transparent)', opacity: 0.08 }} />

        <div className="section relative z-10 animate-fade-in">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ background: 'rgba(184,115,51,0.2)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)' }}>
              {lang === 'id' ? '🌿 Platform Edukasi Kesehatan Mental' : '🌿 Mental Well-being Platform'}
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              {lang === 'id'
                ? <>Ruang Untuk <span className="text-copper-shimmer">Pulih</span>,<br />Tumbuh, & <span className="text-copper-shimmer">Dicintai</span></>
                : <>A Space To <span className="text-copper-shimmer">Heal</span>,<br />Grow, & <span className="text-copper-shimmer">Be Loved</span></>}
            </h1>

            <div className="space-y-4 max-w-xl">
              {intro.split('\n\n').map((para, i) => (
                <p key={i}
                  className="text-base sm:text-lg leading-relaxed"
                  style={{ color: i === 0 ? '#c8d5c8' : '#a0b5a0' }}
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <a href="#support" className="btn-copper">
                {lang === 'id' ? 'Dukung Kami 🌿' : 'Support Us 🌿'}
              </a>
              <a href="#cerita" className="btn-ghost"
                style={{ borderColor: 'rgba(200,213,200,0.4)', color: '#c8d5c8' }}
              >
                {lang === 'id' ? 'Ingin Berbagi Cerita?' : 'Share Your Story'}
              </a>
              <Link href="/products" className="btn-ghost"
                style={{ borderColor: 'rgba(200,213,200,0.4)', color: '#c8d5c8' }}
              >
                {lang === 'id' ? 'Lihat Produk' : 'Browse Products'}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 60 720 40C960 20 1200 50 1440 30V60H0Z"
              fill="#fcfbf7" fillOpacity="1" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════ VALUES */}
      <section className="section">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl" style={{ color: '#2d3b2d' }}>
            {lang === 'id' ? 'Mengapa Utarakan?' : 'Why Utarakan?'}
          </h2>
          <div className="divider-copper w-24 mx-auto mt-4" />
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {values.map(({ icon, title, desc }) => (
            <div key={title} className="card-copper text-center space-y-3 animate-slide-up">
              <div className="text-4xl">{icon}</div>
              <h3 className="font-serif text-lg" style={{ color: '#2d3b2d' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7f6b' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════ SUPPORT BANNER */}
      <SupportBanner />
    </>
  )
}
