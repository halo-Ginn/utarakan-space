// Location: app/privasi/page.tsx  (buat folder "privasi" di dalam "app")

export const metadata = { title: 'Kebijakan Privasi — Utarakan.space' }

export default function PrivasiPage() {
  return (
    <section className="section" style={{ maxWidth: '720px', margin: '0 auto' }}>
      <h1 className="font-serif text-3xl mb-2" style={{ color: '#2d3b2d' }}>Kebijakan Privasi</h1>
      <p className="text-sm mb-8" style={{ color: '#6b7f6b' }}>Berlaku sejak Agustus 2026</p>

      <div className="space-y-6 text-base leading-relaxed" style={{ color: '#3d4d3d' }}>
        <p>Privasi bukan fitur tambahan di Utarakan — ia adalah fondasi. Halaman ini menjelaskan dengan jujur dan sederhana apa yang kami kumpulkan, dan apa yang tidak.</p>

        <h2 className="font-serif text-xl pt-2" style={{ color: '#2d3b2d' }}>Apa yang kami kumpulkan</h2>
        <p>Hanya apa yang kamu kirimkan secara sadar melalui formulir "Bagikan Ceritamu": isi ceritamu, serta nama dan email <em>jika</em> kamu memilih mengisinya. Keduanya opsional — kamu boleh sepenuhnya anonim.</p>

        <h2 className="font-serif text-xl pt-2" style={{ color: '#2d3b2d' }}>Apa yang TIDAK kami lakukan</h2>
        <p>Kami tidak mewajibkan pendaftaran atau email untuk mengunduh produk kami. Kami tidak menjual atau membagikan datamu kepada pihak mana pun. Kami tidak menayangkan iklan. Kami tidak akan pernah mempublikasikan ceritamu tanpa izin tertulis darimu.</p>

        <h2 className="font-serif text-xl pt-2" style={{ color: '#2d3b2d' }}>Di mana cerita disimpan</h2>
        <p>Cerita tersimpan di database yang aksesnya dibatasi hanya untuk tim Utarakan. Pengunjung situs — siapa pun — tidak dapat membaca cerita yang dikirimkan orang lain.</p>

        <h2 className="font-serif text-xl pt-2" style={{ color: '#2d3b2d' }}>Hakmu</h2>
        <p>Kamu berhak meminta ceritamu dihapus kapan pun. Kirim permintaan ke <a href="mailto:halo@utarakan.space" style={{ color: '#b87333', textDecoration: 'underline' }}>halo@utarakan.space</a> — sebutkan perkiraan tanggal pengiriman ceritamu agar kami dapat menemukannya.</p>

        <h2 className="font-serif text-xl pt-2" style={{ color: '#2d3b2d' }}>Perubahan kebijakan</h2>
        <p>Jika kebijakan ini berubah, kami akan memperbarui halaman ini beserta tanggal berlakunya. Ada pertanyaan? Hubungi kami di <a href="mailto:halo@utarakan.space" style={{ color: '#b87333', textDecoration: 'underline' }}>halo@utarakan.space</a>.</p>
      </div>
    </section>
  )
}