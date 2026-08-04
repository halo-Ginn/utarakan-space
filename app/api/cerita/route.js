// UTARAKAN — Kirim Cerita endpoint (v3: + penanda cerita sensitif)
// Location: app/api/cerita/route.js  (GANTI seluruh isi file lama)
//
// Deteksi dilakukan DI SERVER SENDIRI dengan daftar kata — cerita tidak
// pernah dikirim ke layanan pihak ketiga. Daftar kata bebas kamu tambah/kurangi.

import { NextResponse } from "next/server";

// ====== DAFTAR KATA — silakan sesuaikan ======
const KATA_SENSITIF = {
  "krisis": [
    "bunuh diri", "mengakhiri hidup", "akhiri hidup", "tidak ingin hidup",
    "ingin mati", "pengen mati", "pingin mati", "lebih baik mati",
    "menyakiti diri", "melukai diri", "self harm", "self-harm",
    "menyayat", "sayat", "silet", "overdosis",
  ],
  "kekerasan": [
    "kekerasan", "dipukul", "dipukuli", "dianiaya", "disiksa", "kdrt", "diancam",
  ],
  "pelecehan": [
    "pelecehan", "dilecehkan", "diperkosa", "perkosa", "pencabulan", "cabul",
  ],
};
// =============================================

function deteksiSensitif(message) {
  const teks = " " + message.toLowerCase() + " ";
  const kena = [];
  for (const [kategori, daftar] of Object.entries(KATA_SENSITIF)) {
    if (daftar.some((kata) => teks.includes(kata))) kena.push(kategori);
  }
  return kena; // contoh: ["krisis"] atau []
}

export async function POST(req) {
  try {
    const body = await req.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const name =
      typeof body.name === "string" && body.name.trim() !== ""
        ? body.name.trim().slice(0, 100) : null;
    const email =
      typeof body.email === "string" && body.email.trim() !== ""
        ? body.email.trim().slice(0, 200) : null;

    if (!message)
      return NextResponse.json({ ok: false, error: "Cerita tidak boleh kosong." }, { status: 400 });
    if (message.length > 5000)
      return NextResponse.json({ ok: false, error: "Cerita terlalu panjang (maks. 5000 karakter)." }, { status: 400 });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ ok: false, error: "Format email tidak valid." }, { status: 400 });

    const kategoriKena = deteksiSensitif(message);
    const sensitif = kategoriKena.length > 0;
    const kategori = sensitif ? kategoriKena.join(", ") : null;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key)
      return NextResponse.json({ ok: false, error: "Server belum dikonfigurasi." }, { status: 500 });

    const res = await fetch(url + "/rest/v1/cerita", {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: "Bearer " + key,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ message, name, email, sensitif, kategori }),
    });

    if (!res.ok) {
      console.error("Supabase insert failed:", res.status);
      return NextResponse.json({ ok: false, error: "Gagal mengirim. Coba lagi sebentar ya." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan. Coba lagi ya." }, { status: 500 });
  }
}