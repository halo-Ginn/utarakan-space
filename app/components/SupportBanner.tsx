'use client'

import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import Link from 'next/link'

export default function SupportBanner() {
  const { lang } = useLanguage()
  const [anonymous, setAnonymous] = useState(false)
  const [story, setStory] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!story.trim() || status === 'loading') return
    setStatus('loading')
    setErrMsg('')
    try {
      const res = await fetch('/api/cerita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: story,
          name: anonymous ? '' : name,
          email: anonymous ? '' : email,
        }),
      })
      const data = await res.json()
      if (data.ok) {
        setStatus('done')
        setStory('')
        setName('')
        setEmail('')
      } else {
        setStatus('error')
        setErrMsg(data.error || (lang === 'id' ? 'Gagal mengirim.' : 'Failed to send.'))
      }
    } catch {
      setStatus('error')
      setErrMsg(lang === 'id' ? 'Koneksi bermasalah. Coba lagi ya.' : 'Connection problem. Please try again.')
    }
  }

  return (
    <section className="leaf-bg py-20 px-4" id="support"
      style={{ background: 'linear-gradient(180deg, #f5f0e8 0%, #ede8df 100%)' }}
    >
      <div className="max-w-4xl mx-auto space-y-12">

        {/* ── Support Header ── */}
        <div className="text-center space-y-4 animate-slide-up">
          {/* Copper divider top */}
          <div className="divider-copper w-32 mx-auto mb-6" />

          <p className="badge-copper">
            {lang === 'id' ? 'Gerakan Bersama' : 'Community Movement'}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl" style={{ color: '#2d3b2d' }}>
            {lang === 'id'
              ? 'Yuk, Dukung Kami'
              : 'Support Us'}
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: '#6b7f6b' }}>
            {lang === 'id'
              ? 'Setiap kontribusimu membantu kami terus hadir sebagai ruang aman untuk semua orang.'
              : 'Every contribution helps us remain a safe space for everyone who needs it.'}
          </p>

          {/* Donation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              id="trakteer-btn"
              href="https://teer.id/utarakan.di.sini"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-copper"
            >
              {/* Trakteer icon placeholder */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-90">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
              {lang === 'id' ? 'Trakteer Kami ☕' : 'Treat Us a Coffee ☕'}
            </a>

            <a
              id="paypal-btn"
              href="https://paypal.me/utarakan"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              {/* PayPal icon placeholder */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                <path d="M7 11l-2 9h5l1-4h5c3 0 5-2 5-5 0-2-1.5-4-4.5-4H8L7 11z" />
                <path d="M10 7l-2 9h5l1-4h4c2.5 0 4-1.5 4-3.5 0-1.5-1-3-3.5-3H11L10 7z" opacity=".4" />
              </svg>
              PayPal
            </a>

            <Link
              id="qris-btn"
              href="/qris"

              className="btn-ghost"
            >
              QRIS 🔳
            </Link>
          </div>
        </div>

        {/* ── Copper Divider ── */}
        <div className="divider-copper" />

        {/* ── Story / Message Box ── */}
        <div id="cerita" className="card-copper max-w-2xl mx-auto animate-slide-up scroll-mt-24" style={{ animationDelay: '0.15s' }}>
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-xl" style={{ color: '#2d3b2d' }}>
                {lang === 'id' ? 'Apa Ceritamu Hari Ini?' : 'What Is Your Story Today?'}
              </h3>
              <p className="text-sm mt-1" style={{ color: '#6b7f6b' }}>
                {lang === 'id'
                  ? 'Tidak ada yang harus kamu hadapi sendiri. Tuliskan apa yang ingin kamu sampaikan.'
                  : "You don't have to face anything alone. Write what you'd like to share."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                id="story-input"
                required
                value={story}
                onChange={(e) => setStory(e.target.value)}
                rows={5}
                maxLength={5000}
                placeholder={
                  lang === 'id'
                    ? 'Ceritakan pengalamanmu, perasaanmu, atau pesanmu di sini...'
                    : 'Share your experience, feelings, or message here...'
                }
                className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-all duration-200 focus:ring-2"
                style={{
                  background: '#fcfbf7',
                  border: '1.5px solid #c8d5c8',
                  color: '#2d3b2d',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#b87333'
                  e.target.style.boxShadow = '0 0 0 3px rgba(184,115,51,0.12)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#c8d5c8'
                  e.target.style.boxShadow = 'none'
                }}
              />

              {/* Optional Name & Email inputs */}
              {!anonymous && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    placeholder={lang === 'id' ? 'Nama (opsional)' : 'Name (optional)'}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                    style={{
                      background: '#fcfbf7',
                      border: '1.5px solid #c8d5c8',
                      color: '#2d3b2d',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#b87333'
                      e.target.style.boxShadow = '0 0 0 3px rgba(184,115,51,0.12)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#c8d5c8'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={200}
                    placeholder={lang === 'id' ? 'Email (opsional, jika ingin dibalas)' : 'Email (optional, if you want a reply)'}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                    style={{
                      background: '#fcfbf7',
                      border: '1.5px solid #c8d5c8',
                      color: '#2d3b2d',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#b87333'
                      e.target.style.boxShadow = '0 0 0 3px rgba(184,115,51,0.12)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#c8d5c8'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              )}

              {/* Anonymous toggle */}
              <label
                htmlFor="anonymous-toggle"
                className="flex items-center gap-3 cursor-pointer group select-none w-fit"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="anonymous-toggle"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className="w-11 h-6 rounded-full transition-all duration-300"
                    style={{
                      background: anonymous
                        ? 'linear-gradient(135deg, #b87333, #d4af37)'
                        : '#c8d5c8',
                    }}
                  >
                    <div
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300"
                      style={{ left: anonymous ? '24px' : '4px' }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium" style={{ color: '#4a5d4a' }}>
                  {lang === 'id'
                    ? `Kirim sebagai Anonim${anonymous ? ' ✓' : ''}`
                    : `Send Anonymously${anonymous ? ' ✓' : ''}`}
                </span>
              </label>

              <button
                type="submit"
                id="submit-story-btn"
                className="btn-forest text-sm w-full sm:w-auto"
                disabled={!story.trim() || status === 'loading'}
                style={{
                  opacity: (!story.trim() || status === 'loading') ? 0.6 : 1,
                  cursor: status === 'loading' ? 'wait' : (!story.trim() ? 'not-allowed' : 'pointer'),
                }}
              >
                {status === 'loading'
                  ? (lang === 'id' ? 'Mengirim…' : 'Sending…')
                  : (lang === 'id' ? 'Kirim Cerita 🌿' : 'Send Story 🌿')}
              </button>
            </form>

            {status === 'done' && (
              <div className="rounded-xl p-4 text-sm animate-fade-in"
                style={{ background: 'rgba(107,127,107,0.12)', color: '#2d3b2d', border: '1px solid rgba(107,127,107,0.3)' }}>
                {lang === 'id'
                  ? '🌿 Ceritamu sudah kami terima. Terima kasih sudah mempercayakan ini pada kami — kamu tidak sendirian. 💛'
                  : '🌿 Your story has been received. Thank you for trusting us — you are not alone. 💛'}
              </div>
            )}
            {status === 'error' && (
              <div className="rounded-xl p-4 text-sm animate-fade-in"
                style={{ background: 'rgba(180,60,60,0.08)', color: '#8a3a3a', border: '1px solid rgba(180,60,60,0.25)' }}>
                {errMsg}
              </div>
            )}
          </div>
        </div>

      </div>
    </section >
  )
}
