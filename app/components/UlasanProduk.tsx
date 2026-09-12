'use client'

// UTARAKAN — Ulasan Produk (tampilan + form, termoderasi)
// Location: app/components/UlasanProduk.tsx
// Pasang di products page:  import UlasanProduk from '@/app/components/UlasanProduk'
//                           lalu render <UlasanProduk /> setelah grid produk.

import { useEffect, useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

const PRODUK_LABEL: Record<string,string> = {
  jurnal: 'Jurnal 30 Hari', audio: 'Audio Napas', bundel: 'Bundel Pemula',
}
const inputStyle = {
  width:'100%', padding:'11px 13px', borderRadius:'10px',
  border:'1px solid rgba(45,59,45,0.2)', background:'#fff',
  color:'#2d3b2d', fontSize:'15px', outline:'none',
} as const

type Ulasan = { produk:string; nama:string|null; isi:string; created_at:string }

export default function UlasanProduk() {
  const { lang } = useLanguage()
  const id = lang === 'id'

  const [list, setList] = useState<Ulasan[]>([])
  const [showForm, setShowForm] = useState(false)
  const [produk, setProduk] = useState('')
  const [nama, setNama] = useState('')
  const [isi, setIsi] = useState('')
  const [setuju, setSetuju] = useState(false)
  const [status, setStatus] = useState<'idle'|'loading'|'done'|'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    fetch('/api/ulasan').then(r => r.json())
      .then(d => setList(d.ulasan ?? [])).catch(() => {})
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading' || !setuju) return
    setStatus('loading'); setErrMsg('')
    try {
      const res = await fetch('/api/ulasan', {
        method:'POST', headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ produk, nama, isi }),
      })
      const d = await res.json()
      if (d.ok) { setStatus('done'); setProduk(''); setNama(''); setIsi(''); setSetuju(false) }
      else { setStatus('error'); setErrMsg(d.error || 'Gagal mengirim.') }
    } catch { setStatus('error'); setErrMsg('Koneksi bermasalah. Coba lagi ya.') }
  }

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl" style={{ color:'#2d3b2d' }}>
          {id ? 'Cerita dari yang sudah mencoba' : 'From those who have tried'}
        </h2>
        <div className="divider-copper w-20 mx-auto mt-3" />
      </div>

      {/* ── Ulasan yang tampil (hanya yang sudah disetujui) ── */}
      {list.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {list.map((u, i) => (
            <div key={i} className="card-copper" style={{ padding:'18px 20px' }}>
              <p className="text-sm leading-relaxed" style={{ color:'#3d4d3d' }}>&ldquo;{u.isi}&rdquo;</p>
              <p className="text-xs mt-3" style={{ color:'#9aa89a' }}>
                — {u.nama || 'Anonim'} · {PRODUK_LABEL[u.produk] ?? u.produk}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm mb-10" style={{ color:'#9aa89a' }}>
          {id ? 'Jadilah yang pertama berbagi pengalamanmu. 🌿' : 'Be the first to share your experience. 🌿'}
        </p>
      )}

      {/* ── Toggle form ── */}
      <div className="text-center">
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-ghost"
            style={{ borderColor:'rgba(45,59,45,0.3)', color:'#2d3b2d' }}>
            {id ? 'Bagikan pengalamanmu ✍️' : 'Share your experience ✍️'}
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card-copper space-y-4 max-w-xl mx-auto mt-6">
          <p className="text-xs" style={{ color:'#9aa89a' }}>
            {id
              ? 'Ini ulasan pengalaman produk. Kalau ingin berbagi cerita pribadi, ruang privatnya ada di Kirim Cerita (Beranda) — tidak pernah dipublikasikan. 💛'
              : 'This is a product experience review. For personal stories, the private space is Kirim Cerita on the homepage — never published. 💛'}
          </p>

          <select required value={produk} onChange={e => setProduk(e.target.value)} style={inputStyle}>
            <option value="">{id ? 'Produk yang kamu coba *' : 'Product you tried *'}</option>
            <option value="jurnal">Jurnal 30 Hari</option>
            <option value="audio">Audio Napas — Grounding & Calming</option>
            <option value="bundel">Bundel Pemula</option>
          </select>

          <textarea required rows={4} maxLength={600} value={isi}
            onChange={e => setIsi(e.target.value)}
            placeholder={id ? 'Bagaimana pengalamanmu memakainya?' : 'How was your experience using it?'}
            style={{ ...inputStyle, resize:'vertical' }} />

          <input value={nama} onChange={e => setNama(e.target.value)} maxLength={60}
            placeholder={id ? 'Nama panggilan (opsional — kosongkan untuk Anonim)' : 'Nickname (optional — leave empty for Anonymous)'}
            style={inputStyle} />

          <label style={{ display:'flex', gap:'10px', alignItems:'flex-start', cursor:'pointer' }}>
            <input type="checkbox" checked={setuju} onChange={e => setSetuju(e.target.checked)} style={{ marginTop:'3px' }} />
            <span className="text-sm" style={{ color:'#3d4d3d' }}>
              {id
                ? 'Saya setuju ulasan ini dapat ditampilkan di situs Utarakan setelah ditinjau.'
                : 'I agree this review may be displayed on the Utarakan site after moderation.'}
            </span>
          </label>

          <button type="submit" className="btn-copper"
            disabled={!setuju || status==='loading'}
            style={{ opacity: (!setuju || status==='loading') ? 0.55 : 1 }}>
            {status==='loading' ? (id ? 'Mengirim…' : 'Sending…') : (id ? 'Kirim Ulasan 🌿' : 'Send Review 🌿')}
          </button>

          {status==='done' && (
            <div className="rounded-xl p-4 text-sm"
              style={{ background:'rgba(107,127,107,0.12)', color:'#2d3b2d', border:'1px solid rgba(107,127,107,0.3)' }}>
              {id
                ? 'Terima kasih! Ulasanmu kami terima dan akan tampil setelah ditinjau. 💛'
                : 'Thank you! Your review has been received and will appear after moderation. 💛'}
            </div>
          )}
          {status==='error' && (
            <div className="rounded-xl p-4 text-sm"
              style={{ background:'rgba(180,60,60,0.08)', color:'#8a3a3a', border:'1px solid rgba(180,60,60,0.25)' }}>
              {errMsg}
            </div>
          )}
        </form>
      )}
    </section>
  )
}
