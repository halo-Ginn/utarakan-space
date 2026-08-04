'use client'

// UTARAKAN — Dukung Kami (Trakteer · PayPal · QRIS)
// Location: app/components/DukungKami.tsx

import { useLanguage } from '@/app/context/LanguageContext'

export default function DukungKami() {
  const { lang } = useLanguage()
  const id = lang === 'id'

  return (
    <section id="support" className="section">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl" style={{ color: '#2d3b2d' }}>
          {id ? 'Yuk, Dukung Kami!' : 'Support Us'}
        </h2>
        <div className="divider-copper w-24 mx-auto mt-4" />
        <p className="mt-4 text-sm sm:text-base max-w-xl mx-auto" style={{ color: '#6b7f6b' }}>
          {id
            ? 'Utarakan adalah ruang mandiri. Dukunganmu menjaga ruang ini tetap hidup dan membantu kami menjangkau lebih banyak orang. Berapa pun, kapan pun kamu siap. 💛'
            : 'Utarakan is an independent space. Your support keeps it alive and helps us reach more people. Any amount, whenever you are ready. 💛'}
        </p>
      </div>

      <div className="max-w-2xl mx-auto card-copper">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* QRIS — click to enlarge */}
          <a href="/qris"
            title={id ? 'Klik untuk memperbesar QRIS' : 'Click to enlarge QRIS'}
            className="flex-shrink-0">
            <img
              src="/qris.jpg"
              alt="QRIS Utarakan"
              style={{
                width: '150px', height: 'auto', borderRadius: '12px',
                background: '#fff', border: '1px solid rgba(45,59,45,0.15)', display: 'block',
              }}
            />
          </a>

          <div className="space-y-4 text-center sm:text-left">
            <p className="text-sm leading-relaxed" style={{ color: '#2d3b2d' }}>
              {id
                ? 'Scan QRIS dengan GoPay, OVO, DANA, ShopeePay, atau m-banking apa pun — atau pilih salah satu di bawah:'
                : 'Scan the QRIS with any Indonesian e-wallet or m-banking app — or choose one below:'}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <a href="https://teer.id/utarakan.di.sini" target="_blank" rel="noopener noreferrer"
                className="btn-copper">
                ☕ Trakteer
              </a>
              <a href="https://paypal.me/utarakan" target="_blank" rel="noopener noreferrer"
                className="btn-ghost"
                style={{ borderColor: 'rgba(45,59,45,0.3)', color: '#2d3b2d' }}>
                PayPal
              </a>
            </div>
            <p className="text-xs" style={{ color: '#6b7f6b' }}>
              {id
                ? 'Klik gambar QRIS untuk memperbesar.'
                : 'Click the QRIS image to enlarge.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
