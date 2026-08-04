'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Link from 'next/link'
import { useState, useCallback } from 'react'

const IG_URL = 'https://www.instagram.com/utarakan.di.sini?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
const FB_URL = 'https://www.facebook.com/profile.php?id=61591940339326'
const GRP_URL = 'https://www.facebook.com/groups/902090692283568/'
const SITE = 'https://utarakan.space'

export default function Footer() {
  const { lang } = useLanguage()
  const [shareLabel, setShareLabel] = useState<string | null>(null)

  const handleShare = useCallback(async () => {
    const data = {
      title: 'Utarakan.space',
      text: lang === 'id'
        ? 'Ruang untuk berbagi, mengolah rasa, dan memulihkan hati.'
        : 'A space to share, process emotions, and heal the heart.',
      url: SITE,
    }

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(data)
      } catch {
        // User cancelled — no action needed
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(SITE)
        setShareLabel(lang === 'id' ? 'Tautan disalin! ✓' : 'Link copied! ✓')
        setTimeout(() => setShareLabel(null), 3000)
      } catch {
        setShareLabel(SITE)
        setTimeout(() => setShareLabel(null), 4000)
      }
    }
  }, [lang])

  return (
    <footer style={{ background: '#2d3b2d' }} aria-label="Site footer">

      {/* ══════════════════════════ TOP COPPER RULE */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #b87333, #d4af37, #b87333)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* ══════════════════════════ EMERGENCY BOX */}
        <div
          id="emergency-contact"
          className="rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{
            background: 'rgba(220, 38, 38, 0.08)',
            border: '1.5px solid rgba(220, 38, 38, 0.4)',
            boxShadow: '0 0 24px rgba(220,38,38,0.08), inset 0 0 0 1px rgba(184,115,51,0.08)',
          }}
        >
          {/* Alert icon */}
          <div className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(220, 38, 38, 0.15)', border: '1px solid rgba(220,38,38,0.3)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="w-5 h-5">
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          <div className="space-y-1">
            <p className="font-serif font-semibold text-base leading-tight" style={{ color: '#fcfbf7' }}>
              {lang === 'id'
                ? '🚨 Darurat Kesehatan Mental'
                : '🚨 Mental Health Emergency'}
            </p>
            <p className="text-sm" style={{ color: '#c8d5c8' }}>
              {lang === 'id'
                ? 'Jika kamu atau seseorang butuh bantuan segera:'
                : 'If you or someone needs immediate help:'}
            </p>
            <p className="font-bold text-xl tracking-wide" style={{ color: '#ef4444' }}>
              {lang === 'id' ? 'Hubungi 119 ext 8' : 'Call 119 ext 8'}
            </p>
            <p className="text-xs" style={{ color: '#a0b5a0' }}>
              {lang === 'id'
                ? 'Layanan Kesehatan Jiwa Nasional — Tersedia 24 jam'
                : 'National Mental Health Helpline — Available 24 hours'}
            </p>
          </div>
        </div>

        {/* ══════════════════════════ MAIN GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* — About column — */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="font-serif text-base font-semibold" style={{ color: '#d4af37' }}>
              Utarakan.space
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#a0b5a0' }}>
              {lang === 'id'
                ? 'Ruang peer-to-peer untuk berbagi, mengolah rasa, dan memulihkan hati bersama.'
                : 'A peer-to-peer space to share, process emotions, and heal the heart together.'}
            </p>
            <div className="flex flex-col gap-1.5 pt-2">
              <Link
                href="/privasi"
                className="text-xs transition-colors duration-200 hover:underline"
                style={{ color: '#c8d5c8' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                onMouseLeave={e => (e.currentTarget.style.color = '#c8d5c8')}
              >
                {lang === 'id' ? 'Privasi' : 'Privacy'}
              </Link>
              <Link
                href="/syarat"
                className="text-xs transition-colors duration-200 hover:underline"
                style={{ color: '#c8d5c8' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                onMouseLeave={e => (e.currentTarget.style.color = '#c8d5c8')}
              >
                {lang === 'id' ? 'Syarat & Ketentuan' : 'Terms & Conditions'}
              </Link>
              <Link
                href="/kontak"
                className="text-xs transition-colors duration-200 hover:underline"
                style={{ color: '#c8d5c8' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                onMouseLeave={e => (e.currentTarget.style.color = '#c8d5c8')}
              >
                {lang === 'id' ? 'Hubungi Kami' : 'Contact Us'}
              </Link>
            </div>
          </div>

          {/* — Contact Us column — */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-widest" style={{ color: '#d4af37' }}>
              {lang === 'id' ? 'Hubungi Kami' : 'Contact Us'}
            </h3>
            <a
              id="contact-email-link"
              href="mailto:halo@utarakan.space"
              className="inline-flex items-center gap-2 text-sm transition-colors duration-200 group"
              style={{ color: '#c8d5c8' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 7L2 7" />
              </svg>
              <span className="group-hover:underline underline-offset-2"
                style={{ '--tw-text-opacity': 1 } as React.CSSProperties}
                onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                onMouseLeave={e => (e.currentTarget.style.color = '#c8d5c8')}
              >
                halo@utarakan.space
              </span>
            </a>
            <p className="text-xs" style={{ color: '#6b7f6b' }}>
              {lang === 'id' ? 'Kami merespons dalam 1–2 hari kerja.' : 'We respond within 1–2 business days.'}
            </p>
          </div>

          {/* — Social Media column — */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-widest" style={{ color: '#d4af37' }}>
              {lang === 'id' ? 'Media Sosial' : 'Social Media'}
            </h3>
            <div className="flex flex-col gap-3">

              {/* Instagram */}
              <a
                id="instagram-link"
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm transition-all duration-200 group"
                style={{ color: '#c8d5c8' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                onMouseLeave={e => (e.currentTarget.style.color = '#c8d5c8')}
              >
                {/* Instagram icon */}
                <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </span>
                @utarakan.di.sini
              </a>

              {/* Facebook Page */}
              <a
                id="facebook-page-link"
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm transition-all duration-200 group"
                style={{ color: '#c8d5c8' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                onMouseLeave={e => (e.currentTarget.style.color = '#c8d5c8')}
              >
                {/* Facebook icon */}
                <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </span>
                {lang === 'id' ? 'Halaman Facebook' : 'Facebook Page'}
              </a>
            </div>
          </div>

          {/* — Community + Share column — */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-widest" style={{ color: '#d4af37' }}>
              {lang === 'id' ? 'Komunitas' : 'Community'}
            </h3>

            {/* Facebook Group */}
            <a
              id="community-group-link"
              href={GRP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: 'rgba(45,59,45,0.6)',
                border: '1px solid rgba(212,175,55,0.25)',
                color: '#d4af37',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(212,175,55,0.15)'
                el.style.borderColor = 'rgba(212,175,55,0.5)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(45,59,45,0.6)'
                el.style.borderColor = 'rgba(212,175,55,0.25)'
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {lang === 'id' ? 'Bergabung ke Komunitas' : 'Join the Community'}
            </a>

            {/* Share Website */}
            <div className="pt-2">
              <h3 className="font-serif text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#d4af37' }}>
                {lang === 'id' ? 'Bagikan' : 'Share'}
              </h3>
              <button
                id="share-website-btn"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: 'rgba(184,115,51,0.15)',
                  border: '1px solid rgba(184,115,51,0.35)',
                  color: '#d4943a',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.background = 'rgba(184,115,51,0.28)'
                  el.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.background = 'rgba(184,115,51,0.15)'
                  el.style.transform = 'translateY(0)'
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                {shareLabel ?? (lang === 'id' ? 'Bagikan Website' : 'Share Website')}
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════ BOTTOM DIVIDER + COPYRIGHT */}
        <div className="pt-4 space-y-4">
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(184,115,51,0.3), rgba(212,175,55,0.3), rgba(184,115,51,0.3), transparent)' }} />
          <p className="text-center text-xs" style={{ color: '#6b7f6b' }}>
            © {new Date().getFullYear()} Utarakan.space —{' '}
            {lang === 'id'
              ? 'RUANG TENANG UNTUK PULIH, PULANG, DAN KEMBALI PERCAYA.'
              : 'Made with 🌿 for every soul that is still fighting.'}
          </p>
        </div>

      </div>
    </footer>
  )
}
