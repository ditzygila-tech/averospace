# AveroSpace — Alight Motion Premium

## Jalankan

1. Install Node.js 18+.
2. Jalankan `npm install`.
3. Copy `.env.example` menjadi `.env`.
4. Isi `ZELAPI_KEY` dengan API key ZelAPI milik Anda.
5. Jalankan `npm start`.
6. Buka `http://localhost:3000`.

## Flow

Step 01: input email → Send Verify Link.
Step 02: user membuka Gmail → Spam → menyalin URL → paste → Activate Premium Account.
Step 03: confirm build.
Step 04: selesai.

API key hanya disimpan di backend melalui environment variable, bukan di frontend.

Catatan: frontend meneruskan verification URL yang dimasukkan user ke endpoint `/api/verif` sesuai API yang diberikan user.
