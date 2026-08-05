'use client'

// UTARAKAN — Lokamanusya (v2: bilingual ID/EN)
// Location: app/lokamanusya/page.tsx  (GANTI seluruh isi file lama)

import { useEffect } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import SupportBanner from '@/app/components/SupportBanner'

export default function LokamanusyaPage() {
    const { lang } = useLanguage()
    const id = lang === 'id'

    useEffect(() => {
        document.title = id
            ? 'Lokamanusya — Utarakan.space'
            : 'Lokamanusya — Utarakan.space'
    }, [id])

    return (
        <>
            <section className="section" style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
                    style={{ background: 'rgba(184,115,51,0.15)', color: '#b87333', border: '1px solid rgba(184,115,51,0.3)' }}>
                    {id ? 'Segera Hadir' : 'Coming Soon'}
                </span>

                <h1 className="font-serif text-4xl mb-4" style={{ color: '#2d3b2d' }}>Lokamanusya</h1>
                <div className="divider-copper w-24 mx-auto mb-8" />

                <div className="space-y-5 text-base leading-relaxed text-left" style={{ color: '#3d4d3d' }}>
                    {id ? (
                        <>
                            <p>Tubuh menyimpan apa yang belum sempat kita utarakan. Bahu yang tegang, dada yang sesak, perut yang tidak nyaman — seringkali itu bukan kebetulan.</p>
                            <p><strong>Lokamanusya</strong> adalah ruang artikel Utarakan tentang hubungan antara emosi, trauma, dan tubuh — ditulis dengan hangat, dan selalu berpijak pada penelitian ilmiah yang bisa kamu telusuri sendiri.</p>
                            <p>Kami sedang menyiapkannya dengan hati-hati. Sambil menunggu, kamu bisa mengikuti perjalanan kami di Instagram{' '}
                                <a href="https://www.instagram.com/utarakan.di.sini" target="_blank" rel="noopener noreferrer"
                                    style={{ color: '#b87333', textDecoration: 'underline' }}>@utarakan.di.sini</a>{' '}
                                — atau mulai dari <a href="/jurnal.html" target="_blank" rel="noopener"
                                    style={{ color: '#b87333', textDecoration: 'underline' }}>Jurnal 30 Hari</a> kami. 🌿
                            </p>
                        </>
                    ) : (
                        <>
                            <p>The body keeps what we have not yet found the words to say. Tense shoulders, a tight chest, an uneasy stomach — often, these are not coincidences.</p>
                            <p><strong>Lokamanusya</strong> is Utarakan&apos;s article space on the connection between emotions, trauma, and the body — written with warmth, and always grounded in scientific research you can trace for yourself.</p>
                            <p>We are preparing it with care. While you wait, you can follow our journey on Instagram{' '}
                                <a href="https://www.instagram.com/utarakan.di.sini" target="_blank" rel="noopener noreferrer"
                                    style={{ color: '#b87333', textDecoration: 'underline' }}>@utarakan.di.sini</a>{' '}
                                — or begin with our <a href="/jurnal.html" target="_blank" rel="noopener"
                                    style={{ color: '#b87333', textDecoration: 'underline' }}>30 Days Journal</a>. 🌿
                            </p>
                        </>
                    )}
                </div>
            </section>
            <SupportBanner />
        </>
    )
}