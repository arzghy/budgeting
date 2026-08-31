# Whale Budgeting

Website budgeting lucu & interaktif, dibuat pakai Next.js 14 (App Router) + MongoDB + NextAuth Google. Tema paus lembut pastel, smooth scroll pakai Lenis.

## Fitur

- 🎨 Palette: `#f6dbe2`, `#c2d772`, `#f6ffd3`, `#f6c5c1`
- 🔐 Login dengan Google (NextAuth OAuth)
- 🐳 Tema paus di seluruh halaman (SVG, animasi)
- 🧴 Skincare CRUD (section terpisah)
- 💄 Make Up CRUD (section terpisah)
- 🛍️ Pengeluaran lain + sub-divisions (jajan, transport, hiburan, kebutuhan, wishlist, lainnya)
- 📝 Kebutuhan dengan status sisa/habis — auto move ke expense kalau habis
- 💝 Wishlist dengan progress nabung manual + tombol purchase (auto ke expense)
- 🐳 Save Money: nabung untuk wishlist + jaga-jaga
- 🪼 Smooth scrolling pakai Lenis

## Stack

- Next.js 14 (App Router)
- MongoDB + Mongoose
- NextAuth (Google OAuth)
- TailwindCSS
- Lenis (smooth scroll)
- Three.js & react-three-fiber (untuk hero section opsional)

## Setup Lokal

```bash
# 1. Install dependency
npm install

# 2. Copy env
cp .env.example .env.local
# lalu isi MONGODB_URI, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET

# 3. Jalankan
npm run dev
```

## Setup Google OAuth

1. Buka https://console.cloud.google.com
2. Buat project baru (atau pakai yang ada)
3. APIs & Services → Credentials → Create OAuth Client ID
4. Application type: Web application
5. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://<your-vercel-domain>.vercel.app/api/auth/callback/google` (prod)
6. Copy Client ID & Client Secret ke `.env.local`

## Setup MongoDB

1. Buat cluster di https://www.mongodb.com/atlas
2. Whitelist IP `0.0.0.0/0` (atau IP Vercel)
3. Ambil connection string, ganti `<password>`, simpan sebagai `MONGODB_URI`

## Deploy ke Vercel

1. Push ke GitHub
2. Buka https://vercel.com/new
3. Import repo
4. Set Environment Variables:
   - `MONGODB_URI`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_SECRET` (generate pakai `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (isi dengan URL Vercel, contoh `https://whale-budgeting.vercel.app`)
5. Deploy
6. Tambahkan URL Vercel ke Google OAuth Authorized redirect URIs

## Struktur

```
app/
  page.tsx              # Landing
  login/                # Login page
  dashboard/
    page.tsx            # Home dashboard
    skincare/           # CRUD skincare
    makeup/             # CRUD makeup
    expenses/           # Pengeluaran + divisions
    needs/              # Kebutuhan
    wishlist/           # Wishlist + progress
    save/               # Nabung
  api/
    auth/[...nextauth]/ # NextAuth handler
    items/              # CRUD skincare/makeup
    expenses/           # CRUD expenses
    needs/              # CRUD needs + auto-move
    wishlist/           # CRUD wishlist + auto-purchase
    savings/            # CRUD savings
components/
  Navbar.tsx
  Whale.tsx             # SVG Whale lucu
  ItemsPage.tsx         # Reusable CRUD UI
models/                 # Mongoose models
lib/mongodb.ts          # Mongoose connection
```

## Catatan

- `kebutuhan` yang di-toggle jadi `habis` otomatis bikin expense di division "kebutuhan"
- `wishlist` yang di-purchase otomatis bikin expense di division "wishlist" dengan nominal target
- Nabung wishlist dari halaman Save akan otomatis update progress di Wishlist
