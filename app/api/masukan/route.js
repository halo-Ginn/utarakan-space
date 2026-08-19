// UTARAKAN — Kegiatan & Program endpoint
// Location: app/api/masukan/route.js  (buat folder "masukan" di dalam "app/api")
// Prinsip sama dengan /api/cerita: fetch polos ke PostgREST, scan kata di server
// sendiri, tidak ada data yang keluar ke layanan pihak ketiga.

import { NextResponse } from "next/server";

const KATEGORI_VALID = [
    "dukungan_diskusi", "karakter_individu", "wanita_bercerita",
    "keterampilan_ekonomi", "anak_keluarga", "pengembangan_komunitas", "lainnya",
];

// ====== DAFTAR KATA — sama dengan /api/cerita, silakan selaraskan bila diedit ======
const KATA_SENSITIF = {
    krisis: ["bunuh diri", "mengakhiri hidup", "akhiri hidup", "tidak ingin hidup",
        "ingin mati", "pengen mati", "pingin mati", "lebih baik mati",
        "menyakiti diri", "melukai diri", "self harm", "self-harm", "menyayat", "sayat", "silet", "overdosis"],
    kekerasan: ["kekerasan", "dipukul", "dipukuli", "dianiaya", "disiksa", "kdrt", "diancam"],
    pelecehan: ["pelecehan", "dilecehkan", "diperkosa", "perkosa", "pencabulan", "cabul"],
};
function terdeteksiSensitif(teks) {
    const t = " " + (teks || "").toLowerCase() + " ";
    return Object.values(KATA_SENSITIF).some(list => list.some(k => t.includes(k)));
}
// ==================================================================================

const s = (v, max) => (typeof v === "string" && v.trim() !== "" ? v.trim().slice(0, max) : null);

export async function POST(req) {
    try {
        const b = await req.json();

        const provinsi = s(b.provinsi, 60);
        const kota_kabupaten = s(b.kota_kabupaten, 80);
        const kecamatan = s(b.kecamatan, 80);
        const desa_kelurahan = s(b.desa_kelurahan, 80);
        const deskripsi = s(b.deskripsi, 5000);
        const nama_organisasi = s(b.nama_organisasi, 150);

        const kategori = Array.isArray(b.kategori)
            ? b.kategori.filter(k => KATEGORI_VALID.includes(k)) : [];

        const ekonomiChecked = kategori.includes("keterampilan_ekonomi");
        const ekonomi_skala = ekonomiChecked && ["perorangan", "kelompok"].includes(b.ekonomi_skala) ? b.ekonomi_skala : null;
        const ekonomi_jenis = ekonomiChecked && ["digital", "non_digital"].includes(b.ekonomi_jenis) ? b.ekonomi_jenis : null;

        if (!provinsi || !kota_kabupaten)
            return NextResponse.json({ ok: false, error: "Mohon pilih lokasi (provinsi & kota/kabupaten)." }, { status: 400 });
        if (kategori.length === 0)
            return NextResponse.json({ ok: false, error: "Pilih minimal satu kategori ya." }, { status: 400 });
        if (!deskripsi)
            return NextResponse.json({ ok: false, error: "Ceritakan sedikit lebih lengkap di kolom deskripsi ya." }, { status: 400 });

        const flagged = terdeteksiSensitif(deskripsi) || terdeteksiSensitif(nama_organisasi);

        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!url || !key)
            return NextResponse.json({ ok: false, error: "Server belum dikonfigurasi." }, { status: 500 });

        const res = await fetch(url + "/rest/v1/masukan_program", {
            method: "POST",
            headers: {
                apikey: key, Authorization: "Bearer " + key,
                "Content-Type": "application/json", Prefer: "return=minimal"
            },
            body: JSON.stringify({
                provinsi, kota_kabupaten, kecamatan, desa_kelurahan,
                kategori, ekonomi_skala, ekonomi_jenis, deskripsi, nama_organisasi, flagged
            }),
        });

        if (!res.ok) {
            console.error("masukan_program insert failed:", res.status);
            return NextResponse.json({ ok: false, error: "Gagal mengirim. Coba lagi sebentar ya." }, { status: 502 });
        }
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ ok: false, error: "Terjadi kesalahan. Coba lagi ya." }, { status: 500 });
    }
}