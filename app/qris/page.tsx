// Location: app/qris/page.tsx  (buat folder "qris" di dalam "app")

export const metadata = { title: 'Donasi via QRIS — Utarakan.space' }

export default function QrisPage() {
    return (
        <section className="section" style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
            <h1 className="font-serif text-3xl mb-2" style={{ color: '#2d3b2d' }}>Donasi via QRIS</h1>
            <p className="text-sm mb-8" style={{ color: '#6b7f6b' }}>
                Satu QRIS untuk semua — GoPay, OVO, DANA, ShopeePay, dan m-banking apa pun.
            </p>

            <div className="card-copper" style={{ display: 'inline-block', padding: '20px' }}>
                <img
                    src="/qris.jpg"
                    alt="QRIS Utarakan — scan untuk donasi"
                    style={{ width: '300px', maxWidth: '100%', height: 'auto', borderRadius: '10px', display: 'block' }}
                />
            </div>

            <div className="text-left mt-8 space-y-3 text-base leading-relaxed" style={{ color: '#3d4d3d' }}>
                <p><strong>Cara donasi:</strong></p>
                <p>1. Buka aplikasi pembayaran berlogo QRIS (GoPay, OVO, DANA, ShopeePay, atau m-banking-mu).</p>
                <p>2. Pilih menu Scan / Bayar, lalu arahkan kamera ke kode di atas. <span style={{ color: '#6b7f6b' }}>Dari HP? Screenshot halaman ini, lalu gunakan fitur "upload gambar QR" di aplikasimu.</span></p>
                <p>3. Masukkan nominal berapa pun yang kamu mau — semuanya berarti bagi kami. 💛</p>
            </div>

            <p className="mt-8 text-sm" style={{ color: '#6b7f6b' }}>
                Terima kasih sudah menjaga ruang ini tetap hidup. 🌿<br />
                <a href="/" style={{ color: '#b87333', textDecoration: 'underline' }}>← Kembali ke Beranda</a>
            </p>
        </section>
    )
}