# MiBudge — arah produk dan rombak UI

## Ringkasan

MiBudge adalah aplikasi budgeting personal untuk membantu pengguna mengatur pengeluaran, kebutuhan, produk skincare dan makeup, wishlist, serta tabungan dalam satu ruang yang mudah dipahami.

Produk ini dibuat untuk mengurangi rasa pusing saat merencanakan keuangan. Pengalaman utamanya harus terasa hangat, jelas, ringan, dan menyenangkan tanpa mengorbankan ketepatan data.

## Tujuan utama

- Membuat pencatatan pengeluaran terasa cepat dan tidak mengintimidasi.
- Memisahkan skincare, makeup, kebutuhan, pengeluaran lain, wishlist, dan tabungan agar mudah dipantau.
- Mengubah status kebutuhan habis menjadi pengeluaran secara otomatis.
- Menghubungkan pembelian wishlist dengan catatan pengeluaran.
- Menampilkan progress tabungan yang mudah dipahami.
- Memberi ringkasan dashboard yang membantu pengguna mengambil keputusan, bukan sekadar menampilkan angka.
- Menyediakan akses akun yang aman melalui credentials dan Google OAuth.

## Ruang lingkup rombak

Perubahan hanya menyentuh UI, UX, visual hierarchy, copy, responsive layout, motion, dan design tokens pada:

- Landing page `/`
- Login `/login`
- Register `/register`
- Reset password `/reset`
- Dashboard `/dashboard` beserta navigasi dan modul visualnya

Business logic, API, model MongoDB, autentikasi, route, dan perilaku CRUD tetap dipertahankan.

## Arah desain

Reading: personal finance companion untuk pengguna sehari-hari, dengan bahasa visual editorial-utilitarian yang tenang, sedikit playful, dan tidak terasa seperti template SaaS.

### Prinsip

- Satu aksen utama: pistachio sage. Pink dipakai sebagai surface pendukung, bukan aksen kedua.
- Off-white dan forest ink sebagai fondasi agar pastel tetap dewasa.
- Sans display berkarakter untuk headline; angka memakai tabular figures.
- Layout asimetris seperlunya, bukan kumpulan kartu identik.
- Elevation dipakai hanya saat menunjukkan hierarchy.
- Label section dibatasi; headline dan whitespace menjadi navigasi utama.
- Motion menjelaskan hierarchy, feedback, dan perubahan state.
- `prefers-reduced-motion`, keyboard focus, contrast, dan mobile layout wajib dijaga.

### Dial desain

- `DESIGN_VARIANCE`: 7
- `MOTION_INTENSITY`: 5
- `VISUAL_DENSITY`: 4

## Arsitektur pengalaman

### Landing

Landing menjawab satu hal: mengapa MiBudge layak dipakai. Hero fokus pada ketenangan dan kejelasan, lalu menunjukkan tiga kemampuan inti melalui komposisi editorial: catat, rencanakan, pantau. CTA utama menuju login/register.

### Auth

Halaman login, register, dan reset memakai satu shell visual yang konsisten. Form menjadi fokus utama; panel pendamping memberi konteks produk tanpa dekorasi berlebihan. Error, loading, focus, dan success state harus terbaca jelas.

### Dashboard

Dashboard memprioritaskan:

1. Sisa anggaran bulan berjalan.
2. Pengeluaran terbaru.
3. Progress wishlist dan tabungan.
4. Kebutuhan yang perlu diisi ulang.

Visualisasi hanya dipertahankan jika membantu membaca pola. Kartu metrik tidak dibuat seragam tanpa alasan.

## Yang dipertahankan

- Next.js 14 App Router dan React.
- Tailwind CSS.
- MongoDB, Mongoose, dan NextAuth.
- Google OAuth dan credentials auth.
- GSAP, Lenis, dan Lottie yang sudah terpasang.
- Semua endpoint, model, validasi, dan alur CRUD.
- Palette dasar MiBudge: `#f6dbe2`, `#c2d772`, `#f6ffd3`, `#f6c5c1`.

## Yang dihapus dari bahasa visual

- Border hitam tebal pada semua elemen.
- Sticker shadow berulang.
- Gradient pastel yang memenuhi setiap section.
- Kartu metrik identik dalam empat kolom.
- Eyebrow uppercase di setiap heading.
- Copy hiperbolis dan metafora yang tidak membantu pengguna.
- Dekorasi yang tidak memperjelas tindakan atau status.

## Batasan implementasi

- Tidak ada migrasi framework.
- Tidak menambah dependency baru jika stack yang tersedia sudah cukup.
- Tidak mengubah API atau skema database.
- Tidak menambahkan data palsu ke business logic.
- Tidak membuat abstraksi baru tanpa kebutuhan lintas halaman.

## Verifikasi

- Landing, auth, dan dashboard diuji pada mobile, tablet, dan desktop.
- Light/dark mode tetap memiliki contrast yang layak.
- Keyboard focus terlihat pada semua kontrol.
- Loading, empty, error, dan success state tetap tersedia.
- Jalankan `npm run lint` dan `npm run build` sebelum merge.
