'use client'

// UTARAKAN — Kegiatan & Program (fase DIY)
// Location: app/kegiatan/page.tsx  (buat folder "kegiatan" di dalam "app")
// Butuh: /public/wilayah-diy.json  dan  /app/api/masukan/route.js

import { useEffect, useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

type Wilayah = { provinsi: string; wilayah: Record<string, Record<string, string[]>> }

const KATEGORI = [
    { slug: 'dukungan_diskusi', label: 'Kelompok Dukungan & Diskusi', contoh: 'mis. support group ibu baru, circle setelah kehilangan' },
    { slug: 'karakter_individu', label: 'Pengembangan Karakter Individu', contoh: 'mis. pengelolaan emosi, manajemen waktu' },
    { slug: 'wanita_bercerita', label: 'Wanita Bercerita', contoh: 'mis. ruang ngobrol antar perempuan tanpa dihakimi' },
    { slug: 'keterampilan_ekonomi', label: 'Pelatihan & Pengembangan Keterampilan Ekonomi', contoh: 'mis. kerajinan tangan, literasi keuangan usaha kecil' },
    { slug: 'anak_keluarga', label: 'Kegiatan Anak & Keluarga', contoh: 'mis. kelas parenting, story time untuk anak' },
    { slug: 'pengembangan_komunitas', label: 'Pengembangan Komunitas', contoh: 'mis. desa wisata, optimalisasi infrastruktur' },
    { slug: 'lainnya', label: 'Lainnya', contoh: 'jadi, apa ide dan cerita yang ingin kamu bagikan?' },
]

const inputStyle = {
    width: '100%', padding: '11px 13px', borderRadius: '10px',
    border: '1px solid rgba(45,59,45,0.2)', background: '#fff',
    color: '#2d3b2d', fontSize: '15px', outline: 'none',
} as const

export default function KegiatanPage() {
    const { lang } = useLanguage()
    const id = lang === 'id'

    const [data, setData] = useState<Wilayah | null>(null)
    const [kab, setKab] = useState('')
    const [kec, setKec] = useState('')
    const [desa, setDesa] = useState('')
    const [kategori, setKategori] = useState<string[]>([])
    const [ekSkala, setEkSkala] = useState('')
    const [ekJenis, setEkJenis] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    const [org, setOrg] = useState('')
    const [setuju, setSetuju] = useState(false)
    const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        fetch('/wilayah-diy.json').then(r => r.json()).then(setData).catch(() => { })
    }, [])

    const kabList = data ? Object.keys(data.wilayah) : []
    const kecList = data && kab ? Object.keys(data.wilayah[kab] ?? {}) : []
    const desaList = data && kab && kec ? (data.wilayah[kab]?.[kec] ?? []) : []
    const ekonomiOn = kategori.includes('keterampilan_ekonomi')

    function toggleKategori(slug: string) {
        setKategori(prev => {
            const next = prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
            if (!next.includes('keterampilan_ekonomi')) { setEkSkala(''); setEkJenis('') }
            return next
        })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (status === 'loading' || !setuju) return
        setStatus('loading'); setErrMsg('')
        try {
            const res = await fetch('/api/masukan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    provinsi: data?.provinsi ?? 'DI Yogyakarta',
                    kota_kabupaten: kab, kecamatan: kec || null, desa_kelurahan: desa || null,
                    kategori, ekonomi_skala: ekSkala || null, ekonomi_jenis: ekJenis || null,
                    deskripsi, nama_organisasi: org || null,
                }),
            })
            const d = await res.json()
            if (d.ok) {
                setStatus('done')
                setKab(''); setKec(''); setDesa(''); setKategori([]); setEkSkala(''); setEkJenis('')
                setDeskripsi(''); setOrg(''); setSetuju(false)
            } else { setStatus('error'); setErrMsg(d.error || 'Gagal mengirim.') }
        } catch { setStatus('error'); setErrMsg('Koneksi bermasalah. Coba lagi ya.') }
    }

    return (
        <section className="section" style={{ maxWidth: '720px', margin: '0 auto' }}>

            {/* ── Intro ── */}
            <div className="text-center mb-10">
                <h1 className="font-serif text-3xl mb-3" style={{ color: '#2d3b2d' }}>
                    Kegiatan &amp; Program sedang kami rancang
                </h1>
                <div className="divider-copper w-24 mx-auto mb-4" />
                <p style={{ color: '#6b7f6b' }}>
                    Sambil menyiapkannya, kami ingin dengar dulu — apa yang menurutmu akan
                    benar-benar membantu? <span style={{ whiteSpace: 'nowrap' }}>Fase pertama: Daerah Istimewa Yogyakarta.</span>
                </p>
                {!id && (
                    <p className="mt-2 text-xs" style={{ color: '#9aa89a' }}>
                        This form is currently available in Bahasa Indonesia.
                    </p>
                )}
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="card-copper space-y-6">

                {/* Lokasi */}
                <div className="space-y-3">
                    <h2 className="font-serif text-lg" style={{ color: '#2d3b2d' }}>Lokasi</h2>
                    <input value="DI Yogyakarta" disabled style={{ ...inputStyle, background: '#f4f1ea', color: '#6b7f6b' }} />
                    <select required value={kab}
                        onChange={e => { setKab(e.target.value); setKec(''); setDesa('') }} style={inputStyle}>
                        <option value="">Pilih Kota/Kabupaten *</option>
                        {kabList.map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                    <select value={kec} disabled={!kab}
                        onChange={e => { setKec(e.target.value); setDesa('') }} style={inputStyle}>
                        <option value="">Kecamatan (opsional)</option>
                        {kecList.map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                    <select value={desa} disabled={!kec} onChange={e => setDesa(e.target.value)} style={inputStyle}>
                        <option value="">Desa/Kelurahan (opsional)</option>
                        {desaList.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <p className="text-xs" style={{ color: '#9aa89a' }}>
                        Kalau kamu nyaman, kasih tahu kecamatan/desamu supaya kami bisa lebih tepat sasaran.
                    </p>
                </div>

                {/* Kategori */}
                <div className="space-y-3">
                    <h2 className="font-serif text-lg" style={{ color: '#2d3b2d' }}>
                        Kategori <span className="text-sm font-normal" style={{ color: '#9aa89a' }}>(pilih satu atau lebih)</span>
                    </h2>
                    {KATEGORI.map(k => (
                        <label key={k.slug} style={{
                            display: 'block', cursor: 'pointer', padding: '10px 12px',
                            borderRadius: '10px', border: '1px solid rgba(45,59,45,0.12)',
                            background: kategori.includes(k.slug) ? 'rgba(184,115,51,0.07)' : 'transparent'
                        }}>
                            <span style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                <input type="checkbox" checked={kategori.includes(k.slug)}
                                    onChange={() => toggleKategori(k.slug)} style={{ marginTop: '3px' }} />
                                <span>
                                    <span style={{ color: '#2d3b2d', fontWeight: 500 }}>{k.label}</span><br />
                                    <span className="text-xs" style={{ color: '#9aa89a' }}>{k.contoh}</span>
                                </span>
                            </span>

                            {k.slug === 'keterampilan_ekonomi' && ekonomiOn && (
                                <div style={{ marginTop: '10px', marginLeft: '26px', display: 'flex', flexWrap: 'wrap', gap: '18px' }}
                                    onClick={e => e.preventDefault()}>
                                    <span style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        {(['perorangan', 'kelompok'] as const).map(v => (
                                            <label key={v} style={{ display: 'flex', gap: '5px', alignItems: 'center', fontSize: '13px', color: '#3d4d3d' }}>
                                                <input type="radio" name="ekSkala" checked={ekSkala === v}
                                                    onClick={e => e.stopPropagation()} onChange={() => setEkSkala(v)} />
                                                {v === 'perorangan' ? 'Perorangan' : 'Kelompok'}
                                            </label>
                                        ))}
                                    </span>
                                    <span style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        {(['digital', 'non_digital'] as const).map(v => (
                                            <label key={v} style={{ display: 'flex', gap: '5px', alignItems: 'center', fontSize: '13px', color: '#3d4d3d' }}>
                                                <input type="radio" name="ekJenis" checked={ekJenis === v}
                                                    onClick={e => e.stopPropagation()} onChange={() => setEkJenis(v)} />
                                                {v === 'digital' ? 'Digital' : 'Non-digital'}
                                            </label>
                                        ))}
                                    </span>
                                </div>
                            )}
                        </label>
                    ))}
                </div>

                {/* Deskripsi */}
                <div className="space-y-2">
                    <h2 className="font-serif text-lg" style={{ color: '#2d3b2d' }}>Ceritakan lebih lengkap</h2>
                    <textarea required rows={5} maxLength={5000} value={deskripsi}
                        onChange={e => setDeskripsi(e.target.value)}
                        placeholder="Tuliskan ide, kebutuhan, atau situasi di sekitarmu..."
                        style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                {/* Organisasi */}
                <div className="space-y-2">
                    <h2 className="font-serif text-lg" style={{ color: '#2d3b2d' }}>
                        Organisasi terkait <span className="text-sm font-normal" style={{ color: '#9aa89a' }}>(opsional)</span>
                    </h2>
                    <input value={org} onChange={e => setOrg(e.target.value)} maxLength={150}
                        placeholder="Nama organisasi" style={inputStyle} />
                    <p className="text-xs" style={{ color: '#9aa89a' }}>
                        mis. PKK, Karang Taruna, komunitas lokal — bukan nama pribadi
                    </p>
                </div>

                {/* Consent + Submit */}
                <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer' }}>
                    <input type="checkbox" checked={setuju} onChange={e => setSetuju(e.target.checked)} style={{ marginTop: '3px' }} />
                    <span className="text-sm" style={{ color: '#3d4d3d' }}>
                        Saya setuju informasi ini digunakan Utarakan secara internal untuk merencanakan kegiatan dan program.
                    </span>
                </label>

                <button type="submit" className="btn-copper w-full sm:w-auto"
                    disabled={!setuju || status === 'loading'}
                    style={{
                        opacity: (!setuju || status === 'loading') ? 0.55 : 1,
                        cursor: (!setuju || status === 'loading') ? 'not-allowed' : 'pointer'
                    }}>
                    {status === 'loading' ? 'Mengirim…' : 'Kirim 🌿'}
                </button>

                {status === 'done' && (
                    <div className="rounded-xl p-4 text-sm"
                        style={{ background: 'rgba(107,127,107,0.12)', color: '#2d3b2d', border: '1px solid rgba(107,127,107,0.3)' }}>
                        Masukanmu sudah kami terima — terima kasih sudah ikut merancang ruang ini.
                        Suaramu membantu kami melangkah lebih tepat. 💛
                    </div>
                )}
                {status === 'error' && (
                    <div className="rounded-xl p-4 text-sm"
                        style={{ background: 'rgba(180,60,60,0.08)', color: '#8a3a3a', border: '1px solid rgba(180,60,60,0.25)' }}>
                        {errMsg}
                    </div>
                )}
            </form>

            {/* ── Coming soon, demoted ── */}
            <p className="text-center text-xs mt-10" style={{ color: '#9aa89a' }}>
                Segera hadir di halaman ini: jadwal kegiatan &amp; program Utarakan. 🌿
            </p>
        </section>
    )
}