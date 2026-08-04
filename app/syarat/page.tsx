// Location: app/syarat/page.tsx  (buat folder "syarat" di dalam "app")

export const metadata = { title: 'Syarat & Ketentuan — Utarakan.space' }

export default function SyaratPage() {
    return (
        <section className="section" style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h1 className="font-serif text-3xl mb-2" style={{ color: '#2d3b2d' }}>Syarat &amp; Ketentuan</h1>
            <p className="text-sm mb-8" style={{ color: '#6b7f6b' }}>Berlaku sejak Agustus 2026</p>

            <div className="space-y-6 text-base leading-relaxed" style={{ color: '#3d4d3d' }}>
                <h2 className="font-serif text-xl" style={{ color: '#2d3b2d' }}>Utarakan bukan layanan terapi</h2>
                <p>Utarakan adalah ruang dukungan setara (peer support) dan pengembangan diri. Kami <strong>bukan</strong> penyedia layanan kesehatan mental profesional, dan seluruh konten kami — termasuk jurnal dan panduan — bukan pengganti diagnosis, terapi, atau penanganan medis. Jika kamu sedang dalam krisis atau butuh bantuan segera, hubungi <strong>119 ext 8</strong> (Layanan Sejiwa, 24 jam) atau <strong>119</strong> untuk darurat medis.</p>

                <h2 className="font-serif text-xl pt-2" style={{ color: '#2d3b2d' }}>Produk gratis &amp; lisensinya</h2>
                <p>Jurnal 30 Hari beserta panduannya kami bagikan gratis dengan lisensi pemakaian pribadi (single-user license): silakan gunakan, cetak, dan tulisi untuk dirimu sendiri. Mohon jangan menjual kembali atau menyebarluaskan ulang file-nya — arahkan temanmu ke utarakan.space agar mereka mengunduh sendiri, itu sangat membantu kami. 🌿</p>

                <h2 className="font-serif text-xl pt-2" style={{ color: '#2d3b2d' }}>Cerita yang kamu kirim</h2>
                <p>Ceritamu tetap milikmu. Dengan mengirimkannya, kamu mengizinkan tim Utarakan membacanya dan (jika kamu mencantumkan email) membalasnya. Kami tidak akan mempublikasikannya tanpa izinmu. Mohon tidak mengirimkan data pribadi orang lain tanpa persetujuan mereka.</p>

                <h2 className="font-serif text-xl pt-2" style={{ color: '#2d3b2d' }}>Donasi</h2>
                <p>Donasi bersifat sukarela dan bukan pembayaran atas layanan. Kanal resmi donasi kami hanya melalui{' '}
                    <a href="https://teer.id/utarakan.di.sini" target="_blank" rel="noopener noreferrer" style={{ color: '#b87333', textDecoration: 'underline' }}>Trakteer</a>,{' '}
                    <a href="https://paypal.me/utarakan" target="_blank" rel="noopener noreferrer" style={{ color: '#b87333', textDecoration: 'underline' }}>PayPal</a>, dan{' '}
                    <a href="/qris" style={{ color: '#b87333', textDecoration: 'underline' }}>QRIS</a>{' '}
                    yang tercantum di situs ini. Terima kasih untuk setiap dukungan yang menjaga ruang ini tetap hidup. 💛</p>
                <h2 className="font-serif text-xl pt-2" style={{ color: '#2d3b2d' }}>Batas tanggung jawab</h2>
                <p>Kami menyusun setiap konten dengan riset dan kehati-hatian, namun konten disediakan "sebagaimana adanya". Keputusan atas penggunaan konten sepenuhnya berada di tanganmu; untuk kondisi yang berat, kami sungguh menganjurkan pendampingan profesional.</p>

                <h2 className="font-serif text-xl pt-2" style={{ color: '#2d3b2d' }}>Perubahan</h2>
                <p>Syarat ini dapat kami perbarui sewaktu-waktu; versi terbaru selalu tersedia di halaman ini. Pertanyaan? <a href="mailto:halo@utarakan.space" style={{ color: '#b87333', textDecoration: 'underline' }}>halo@utarakan.space</a></p>
            </div>
        </section>
    )
}