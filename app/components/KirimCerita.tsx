'use client'

// UTARAKAN — Kirim Cerita form
// Location: app/components/KirimCerita.tsx

import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function KirimCerita() {
  const { lang } = useLanguage()
  const id = lang === 'id'

  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setErrMsg('')
    try {
      const res = await fetch('/api/cerita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, name, email }),
      })
      const data = await res.json()
      if (data.ok) {
        setStatus('done')
        setMessage(''); setName(''); setEmail('')
      } else {
        setStatus('error')
        setErrMsg(data.error || (id ? 'Gagal mengirim.' : 'Failed to send.'))
      }
    } catch {
      setStatus('error')
      setErrMsg(id ? 'Koneksi bermasalah. Coba lagi ya.' : 'Connection problem. Please try again.')
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: '10px',
    border: '1px solid rgba(45,59,45,0.2)', background: '#fff',
    color: '#2d3b2d', fontSize: '15px', outline: 'none',
  } as const

  return (
    <section id="cerita" className="section">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl" style={{ color: '#2d3b2d' }}>
          {id ? 'Bagikan Ceritamu' : 'Share Your Story'}
        </h2>
        <div className="divider-copper w-24 mx-auto mt-4" />
        <p className="mt-4 text-sm sm:text-base max-w-xl mx-auto" style={{ color: '#6b7f6b' }}>
          {id
            ? 'Ruang ini aman dan bebas penghakiman. Kamu boleh anonim sepenuhnya — nama dan email tidak wajib diisi. Cerita hanya dibaca oleh tim Utarakan, tidak pernah dipublikasikan tanpa izinmu.'
            : 'This space is safe and judgment-free. You may stay fully anonymous — name and email are optional. Stories are read only by the Utarakan team and never published without your consent.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          maxLength={5000}
          placeholder={id ? 'Tulis ceritamu di sini…' : 'Write your story here…'}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            placeholder={id ? 'Nama (opsional)' : 'Name (optional)'}
            style={inputStyle}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={200}
            placeholder={id ? 'Email (opsional, jika ingin dibalas)' : 'Email (optional, if you want a reply)'}
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          className="btn-copper w-full sm:w-auto"
          disabled={status === 'loading'}
          style={{ opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'wait' : 'pointer' }}
        >
          {status === 'loading'
            ? (id ? 'Mengirim…' : 'Sending…')
            : (id ? 'Kirim Cerita 🌿' : 'Send Story 🌿')}
        </button>

        {status === 'done' && (
          <div className="rounded-xl p-4 text-sm"
            style={{ background: 'rgba(107,127,107,0.12)', color: '#2d3b2d', border: '1px solid rgba(107,127,107,0.3)' }}>
            {id
              ? 'Ceritamu sudah kami terima. Terima kasih sudah mempercayakan ini pada kami — kamu tidak sendirian. 💛'
              : 'Your story has been received. Thank you for trusting us — you are not alone. 💛'}
          </div>
        )}
        {status === 'error' && (
          <div className="rounded-xl p-4 text-sm"
            style={{ background: 'rgba(180,60,60,0.08)', color: '#8a3a3a', border: '1px solid rgba(180,60,60,0.25)' }}>
            {errMsg}
          </div>
        )}
      </form>
    </section>
  )
}
