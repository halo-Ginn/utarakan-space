'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Link from 'next/link'

export default function ThankYouPage() {
  const { lang } = useLanguage()

  return (
    <section
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-20 leaf-bg"
      style={{ background: 'linear-gradient(160deg, #fcfbf7 0%, #f5f0e8 50%, #ede8df 100%)' }}
    >
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-[420px] h-[420px] rounded-full border opacity-20 animate-pulse-soft"
          style={{ borderColor: '#b87333' }} />
        <div className="absolute w-[540px] h-[540px] rounded-full border opacity-10 animate-pulse-soft"
          style={{ borderColor: '#d4af37', animationDelay: '1.5s' }} />
      </div>

      {/* Card */}
      <div className="relative z-10 max-w-lg w-full animate-slide-up">
        <div
          className="rounded-3xl p-10 text-center space-y-8"
          style={{
            background: 'white',
            border: '2px solid transparent',
            backgroundClip: 'padding-box',
            boxShadow: '0 8px 64px rgba(184, 115, 51, 0.18), 0 2px 16px rgba(45,59,45,0.08)',
            position: 'relative',
          }}
        >
          {/* Copper top accent */}
          <div
            className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl"
            style={{ background: 'linear-gradient(90deg, #b87333, #d4af37, #b87333)' }}
          />

          {/* Leaf icon */}
          <div className="flex justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #2d3b2d, #4a5d4a)' }}
            >
              <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="#fcfbf7" strokeWidth="1.5">
                <path d="M24 44s-16-12-16-24a16 16 0 0 1 32 0c0 12-16 24-16 24z" />
                <path d="M24 20 Q28 28 24 36" strokeWidth="1.2" opacity="0.6"/>
                <path d="M18 26 Q24 22 30 26" strokeWidth="1" opacity="0.5"/>
              </svg>
            </div>
          </div>

          {/* Thank-you message */}
          <div className="space-y-3">
            <h1 className="font-serif text-3xl sm:text-4xl" style={{ color: '#2d3b2d' }}>
              {lang === 'id' ? 'Terima Kasih 🌿' : 'Thank You 🌿'}
            </h1>

            {/* Copper divider */}
            <div className="divider-copper w-20 mx-auto" />

            <p className="font-serif text-lg italic" style={{ color: '#4a5d4a' }}>
              {lang === 'id'
                ? 'Terima kasih telah mendukung ruang ini.'
                : 'Thank you for supporting this space.'}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#6b7f6b' }}>
              {lang === 'id'
                ? 'Dukunganmu berarti sangat besar bagi kami dan semua jiwa yang hadir di sini. Semoga kamu selalu dilingkupi kehangatan dan kebaikan.'
                : 'Your support means the world to us and every soul present here. May you always be surrounded by warmth and goodness.'}
            </p>
          </div>

          {/* Affirmation quote */}
          <div
            className="rounded-2xl px-6 py-4"
            style={{ background: 'rgba(184,115,51,0.07)', border: '1px solid rgba(184,115,51,0.15)' }}
          >
            <p className="text-sm font-serif italic" style={{ color: '#b87333' }}>
              {lang === 'id'
                ? '"Setiap langkah kecil menuju pemulihan adalah keberanian yang nyata."'
                : '"Every small step toward healing is genuine courage."'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" id="back-home-btn" className="btn-forest">
              {lang === 'id' ? '← Kembali ke Beranda' : '← Back to Home'}
            </Link>
            <Link href="/products" id="browse-more-btn" className="btn-ghost">
              {lang === 'id' ? 'Lihat Produk Lain' : 'Browse More Products'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
