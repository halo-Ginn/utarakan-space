// Location: app/kontak/page.tsx  (buat folder "kontak" di dalam "app")

export const metadata = { title: 'Hubungi Kami — Utarakan.space' }

export default function KontakPage() {
    return (
        <section className="section" style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h1 className="font-serif text-3xl mb-2" style={{ color: '#2d3b2d' }}>Hubungi Kami</h1>
            <p className="text-base mb-8" style={{ color: '#6b7f6b' }}>Ada pertanyaan, kritik, saran, atau sekadar ingin menyapa? Kami dengan senang hati mendengarkan.</p>

            <div className="space-y-6 text-base leading-relaxed" style={{ color: '#3d4d3d' }}>
                <div className="card-copper">
                    <h2 className="font-serif text-xl mb-2" style={{ color: '#2d3b2d' }}>📧 Email</h2>
                    <p><a href="mailto:halo@utarakan.space" style={{ color: '#b87333', textDecoration: 'underline' }}>halo@utarakan.space</a><br />
                        <span className="text-sm" style={{ color: '#6b7f6b' }}>Kami membalas dalam 1–2 hari kerja.</span></p>
                </div>

                <div className="card-copper">
                    <h2 className="font-serif text-xl mb-2" style={{ color: '#2d3b2d' }}>🌿 Media Sosial &amp; Komunitas</h2>
                    <p>
                        Instagram: <a href="https://www.instagram.com/utarakan.di.sini/" target="_blank" rel="noopener noreferrer" style={{ color: '#b87333', textDecoration: 'underline' }}>@utarakan.di.sini</a><br />
                        Facebook Page: <a href="https://www.facebook.com/profile.php?id=61591940339326" target="_blank" rel="noopener noreferrer" style={{ color: '#b87333', textDecoration: 'underline' }}>Utarakan</a><br />
                        Facebook Group: <a href="https://www.facebook.com/groups/902090692283568" target="_blank" rel="noopener noreferrer" style={{ color: '#b87333', textDecoration: 'underline' }}>Komunitas Utarakan</a>
                    </p>
                </div>

                <div className="card-copper" style={{ borderColor: 'rgba(200,90,70,0.4)' }}>
                    <h2 className="font-serif text-xl mb-2" style={{ color: '#8a3a3a' }}>🚨 Darurat Kesehatan Mental</h2>
                    <p>Jika kamu atau seseorang di dekatmu butuh bantuan segera:<br />
                        <strong>119</strong> — Layanan Darurat Medis<br />
                        <strong>119 ext 8</strong> — Konseling Psikologi Sejiwa (24 jam)</p>
                </div>

                <p>Ingin berbagi cerita secara anonim? Gunakan formulir <a href="/#cerita" style={{ color: '#b87333', textDecoration: 'underline' }}>Bagikan Ceritamu</a> di beranda. 💛</p>
            </div>
        </section>
    )
}