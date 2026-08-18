'use client'

// Location: app/products/page.tsx  (GANTI seluruh isi file lama)
// v2: Jurnal → /unduh.html (unduhan asli), produk Segera Hadir tombolnya nonaktif,
//     tombol tidak lagi patah dua baris, typo diperbaiki.

import { useLanguage } from '@/app/context/LanguageContext'

interface Product {
  id: string
  titleId: string
  titleEn: string
  descId: string
  descEn: string
  priceId: string
  priceEn: string
  tag: string
  icon: string
  href?: string // ada = produk tersedia; tidak ada = Segera Hadir
}

const PRODUCTS: Product[] = [
  {
    id: 'jurnal-30-hari',
    titleId: 'Jurnal 30 Hari',
    titleEn: '30 Days Journal',
    descId: 'Template jurnal terstruktur untuk membantu kamu mengenali, menamai, dan memproses emosi sehari-hari. Tersedia dalam format PDF interaktif.',
    descEn: 'A structured journal template to help you recognize, name, and process your daily emotions. Available as an interactive PDF.',
    priceId: 'Rp 0 / seikhlasmu',
    priceEn: 'Free / pay as you wish',
    tag: 'PDF',
    icon: '📓',
    href: '/unduh.html?f=jurnal',
  },
  {
    id: 'panduan-regulasi',
    titleId: 'Panduan Regulasi Diri',
    titleEn: 'Self-Regulation Guide',
    descId: 'E-book panduan praktis teknik regulasi emosi berbasis CBT dan mindfulness. Cocok untuk pemula.',
    descEn: 'A practical e-book on emotion regulation techniques based on CBT and mindfulness. Perfect for beginners.',
    priceId: 'Segera Hadir',
    priceEn: 'Coming Soon',
    tag: 'E-book',
    icon: '🧠',
  },
  {
    id: 'audio-napas',
    titleId: 'Audio Olah Nafas — Grounding & Calming',
    titleEn: 'Grounding & Calming Breath Work Audio',
    descId: 'Panduan napas 5 menit untuk menenangkan sistem saraf — ritual sebelum menulis jurnal atau sebelum tidur.',
    descEn: 'A 5-minute guided breath work audio to calm your nervous system — a ritual before journaling or before sleep.',
    priceId: 'Rp 0 / seikhlasmu',
    priceEn: 'Free / pay as you wish',
    tag: 'Audio',
    icon: '🎧',
    href: '/unduh.html?f=audio',
  },
  {
    id: 'workbook-diri',
    titleId: 'Workbook Kenali Dirimu',
    titleEn: 'Know Yourself Workbook',
    descId: 'Workbook reflektif 40 halaman berisi pertanyaan mendalam, latihan kesadaran diri, dan afirmasi positif.',
    descEn: 'A 40-page reflective workbook with deep questions, self-awareness exercises, and positive affirmations.',
    priceId: 'Segera Hadir',
    priceEn: 'Coming Soon',
    tag: 'PDF',
    icon: '✍️',
  },
  {
    id: 'kartu-afirmasi',
    titleId: 'Kartu Afirmasi Digital',
    titleEn: 'Digital Affirmation Cards',
    descId: 'Koleksi 50 kartu afirmasi digital dalam desain minimalis yang bisa diprint atau digunakan di wallpaper ponselmu.',
    descEn: '50 digital affirmation cards in a minimalist design — printable or perfect as phone wallpapers.',
    priceId: 'Segera Hadir',
    priceEn: 'Coming Soon',
    tag: 'Digital',
    icon: '🃏',
  },
  {
    id: 'bundel-pemula',
    titleId: 'Bundel Pemula — Mulai Pulih',
    titleEn: 'Starter Bundle — Begin Healing',
    descId: 'Paket lengkap dalam satu unduhan: Jurnal 30 Hari + Panduan Proses + Panduan Navigasi + Audio Nafas.',
    descEn: 'The complete package in one download: 30 Days Journal + both guides + the Breath Work Audio.',
    priceId: 'Rp 0 / seikhlasmu',
    priceEn: 'Free / pay as you wish',
    tag: 'Bundle',
    icon: '🎁',
    href: '/unduh.html',
  },
]

export default function ProductsPage() {
  const { lang } = useLanguage()
  const id = lang === 'id'

  return (
    <>
      {/* ── Products Hero Banner ── */}
      <section className="py-16 px-4 text-center"
        style={{ background: 'linear-gradient(160deg, #2d3b2d 0%, #4a5d4a 100%)' }}
      >
        <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(184,115,51,0.2)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)' }}>
            {id ? '📦 Unduhan Digital' : '📦 Digital Downloads'}
          </span>
          <h1 className="font-serif text-4xl text-white">
            {id ? 'Produk Digital' : 'Digital Products'}
          </h1>
          <p style={{ color: '#a0b5a0' }}>
            {id
              ? 'Alat bantu mandiri untuk mendampingi perjalanan pemulihanmu.'
              : 'Practical tools to accompany your healing journey.'}
          </p>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section className="section">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => {
            const available = Boolean(product.href)
            return (
              <div
                key={product.id}
                id={`product-${product.id}`}
                className="card flex flex-col animate-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="h-1 -mt-6 -mx-6 mb-5 rounded-t-2xl"
                  style={{ background: 'linear-gradient(90deg, #b87333, #d4af37)', opacity: available ? 1 : 0.45 }} />

                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl" style={{ opacity: available ? 1 : 0.6 }}>{product.icon}</span>
                  <span className="badge-copper text-[10px]">{product.tag}</span>
                </div>

                <h2 className="font-serif text-lg leading-snug mb-2" style={{ color: '#2d3b2d' }}>
                  {id ? product.titleId : product.titleEn}
                </h2>

                <p className="text-sm leading-relaxed flex-grow" style={{ color: '#6b7f6b' }}>
                  {id ? product.descId : product.descEn}
                </p>

                <div className="mt-5 pt-4 flex items-center justify-between gap-3"
                  style={{ borderTop: '1px solid #ede8df' }}>
                  <div className="min-w-0">
                    <span className="font-semibold text-sm block"
                      style={{ color: available ? '#b87333' : '#9aa89a' }}>
                      {id ? product.priceId : product.priceEn}
                    </span>
                  </div>

                  {available ? (
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener"
                      id={`buy-${product.id}`}
                      className="btn-copper text-xs px-4 py-2 whitespace-nowrap flex-shrink-0"
                    >
                      {id ? 'Unduh / Donasi' : 'Download / Donate'}
                    </a>
                  ) : (
                    <span
                      className="text-xs px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0 select-none cursor-default"
                      style={{
                        background: 'rgba(45,59,45,0.06)',
                        color: '#9aa89a',
                        border: '1px solid rgba(45,59,45,0.12)',
                      }}
                    >
                      {id ? 'Segera Hadir' : 'Coming Soon'}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-sm mt-12" style={{ color: '#6b7f6b' }}>
          {id
            ? '🌿 Semua produk gratis atau seikhlasnya — unduh langsung, tanpa perlu daftar email.'
            : '🌿 Everything is free or pay-as-you-wish — direct download, no email required.'}
        </p>
      </section>
    </>
  )
}