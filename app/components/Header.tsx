'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/app/context/LanguageContext'
import { useState, useRef } from 'react'

export default function Header() {
  const { lang, setLang } = useLanguage()
  const pathname = usePathname()
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const navItems = [
    { href: '/', label: lang === 'id' ? 'Beranda' : 'Home' },
    { href: '/products', label: lang === 'id' ? 'Produk' : 'Products' },
    { disabled: true, label: lang === 'id' ? 'Kegiatan & Program' : 'Events & Programs' },
    { href: '/lokamanusya', label: 'Lokamanusya' },
    { disabled: true, label: 'Lokasvvara' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: 'rgba(252, 251, 247, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: 'rgba(184, 115, 51, 0.15)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" onClick={() => {
            try { sessionStorage.removeItem('utarakan-foyer-seen') } catch { }
            window.dispatchEvent(new Event('utarakan-open-foyer'))
          }} className="flex items-center group">
            <Image
              src="/logo.png"
              alt="Utarakan.space Logo"
              height={40}
              width={160}
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />

          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              if (item.disabled) {
                return (
                  <span key={item.label}
                    className="relative text-sm font-medium py-1 flex items-center gap-1.5 cursor-default select-none opacity-60"
                    style={{ color: '#4a5d4a' }}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] leading-none px-1.5 py-0.5 rounded-full font-normal tracking-wide"
                      style={{ background: 'rgba(184, 115, 51, 0.12)', color: '#b87333', border: '1px solid rgba(184, 115, 51, 0.25)' }}
                    >
                      {lang === 'id' ? 'Segera Hadir' : 'Coming Soon'}
                    </span>
                  </span>
                )
              }

              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href ?? '/'}
                  className="relative text-sm font-medium transition-colors duration-200 py-1"
                  style={{ color: isActive ? '#b87333' : '#4a5d4a' }}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #b87333, #d4af37)' }} />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-3">

            {/* Audio Player Placeholder */}
            <button
              id="audio-player-btn"
              onClick={() => {
                const a = audioRef.current
                if (!a) return
                if (audioPlaying) { a.pause() } else { a.play().catch(() => { }) }
                setAudioPlaying(!audioPlaying)
              }}
              title={lang === 'id' ? 'Putar / Jeda Musik' : 'Play / Pause Music'}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: audioPlaying
                  ? 'linear-gradient(135deg, #b87333, #d4af37)'
                  : 'rgba(45, 59, 45, 0.08)',
                color: audioPlaying ? '#fff' : '#4a5d4a',
              }}
            >
              {audioPlaying ? (
                /* Pause icon */
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                /* Music note icon */
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              )}
            </button><audio ref={audioRef} src="/ambient.WAV" loop preload="none" />

            {/* Language Toggle */}
            <div className="lang-toggle" role="group" aria-label="Language toggle">
              <button
                id="lang-id-btn"
                className={`lang-toggle-btn ${lang === 'id' ? 'active' : ''}`}
                onClick={() => setLang('id')}
                aria-pressed={lang === 'id'}
              >
                ID
              </button>
              <button
                id="lang-en-btn"
                className={`lang-toggle-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(45,59,45,0.08)', color: '#4a5d4a' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                {menuOpen
                  ? <><path d="M18 6 6 18" /><path d="M6 6l12 12" /></>
                  : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile Nav Drawer ── */}
        {menuOpen && (
          <div className="md:hidden border-t py-4 space-y-1 animate-fade-in"
            style={{ borderColor: 'rgba(184,115,51,0.15)' }}>
            {navItems.map((item) => {
              if (item.disabled) {
                return (
                  <div key={item.label}
                    className="flex items-center justify-between px-2 py-2.5 text-sm font-medium rounded-lg cursor-default select-none opacity-60"
                    style={{ color: '#4a5d4a' }}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] leading-none px-1.5 py-0.5 rounded-full font-normal tracking-wide"
                      style={{ background: 'rgba(184, 115, 51, 0.12)', color: '#b87333', border: '1px solid rgba(184, 115, 51, 0.25)' }}
                    >
                      {lang === 'id' ? 'Segera Hadir' : 'Coming Soon'}
                    </span>
                  </div>
                )
              }

              return (
                <Link key={item.href} href={item.href ?? '/'}
                  onClick={() => setMenuOpen(false)}
                  className="flex px-2 py-2.5 text-sm font-medium rounded-lg transition-colors"
                  style={{ color: pathname === item.href ? '#b87333' : '#4a5d4a' }}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </header>
  )
}
