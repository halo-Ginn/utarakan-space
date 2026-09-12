// UTARAKAN — Ulasan Produk endpoint (GET: approved list, POST: submit)
// Location: app/api/ulasan/route.js

import { NextResponse } from "next/server";

const PRODUK_VALID = ["jurnal", "audio", "bundel"];
const KATA_SENSITIF = ["bunuh diri", "mengakhiri hidup", "akhiri hidup", "tidak ingin hidup",
    "ingin mati", "pengen mati", "pingin mati", "lebih baik mati", "menyakiti diri", "melukai diri",
    "self harm", "self-harm", "menyayat", "sayat", "silet", "overdosis",
    "kekerasan", "dipukul", "dianiaya", "disiksa", "kdrt", "diancam",
    "pelecehan", "dilecehkan", "diperkosa", "perkosa", "cabul"];
const kenaScan = t => { const x = " " + (t || "").toLowerCase() + " "; return KATA_SENSITIF.some(k => x.includes(k)); };

function env() {
    return { url: process.env.NEXT_PUBLIC_SUPABASE_URL, key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY };
}

export async function GET() {
    const { url, key } = env();
    if (!url || !key) return NextResponse.json({ ok: false, ulasan: [] }, { status: 500 });
    const res = await fetch(
        url + "/rest/v1/ulasan_produk?select=produk,nama,isi,created_at&approved=eq.true&order=created_at.desc&limit=12",
        { headers: { apikey: key, Authorization: "Bearer " + key }, next: { revalidate: 300 } }
    );
    const ulasan = res.ok ? await res.json() : [];
    return NextResponse.json({ ok: true, ulasan });
}

export async function POST(req) {
    try {
        const b = await req.json();
        const produk = PRODUK_VALID.includes(b.produk) ? b.produk : null;
        const nama = typeof b.nama === "string" && b.nama.trim() !== "" ? b.nama.trim().slice(0, 60) : null;
        const isi = typeof b.isi === "string" ? b.isi.trim().slice(0, 600) : "";

        if (!produk) return NextResponse.json({ ok: false, error: "Pilih produknya dulu ya." }, { status: 400 });
        if (!isi) return NextResponse.json({ ok: false, error: "Ulasan tidak boleh kosong." }, { status: 400 });

        const { url, key } = env();
        if (!url || !key) return NextResponse.json({ ok: false, error: "Server belum dikonfigurasi." }, { status: 500 });

        const res = await fetch(url + "/rest/v1/ulasan_produk", {
            method: "POST",
            headers: { apikey: key, Authorization: "Bearer " + key, "Content-Type": "application/json", Prefer: "return=minimal" },
            body: JSON.stringify({ produk, nama, isi, flagged: kenaScan(isi) || kenaScan(nama) }),
        });
        if (!res.ok) {
            console.error("ulasan insert failed:", res.status);
            return NextResponse.json({ ok: false, error: "Gagal mengirim. Coba lagi sebentar ya." }, { status: 502 });
        }
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ ok: false, error: "Terjadi kesalahan. Coba lagi ya." }, { status: 500 });
    }
}