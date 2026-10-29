# SiSablengSenior Ops — Neo-Brutalism GitHub Pages Demo

UI statis responsif dengan gaya neo-brutalism, login demo, popup “Selamat datang kembali”, dashboard, Data Controller, Pengaturan, status API ON/OFF, dan log lokal.

## Akun demo
- Username: `admin`
- Password: `demo1234`

Login, profil, indikator API, dan log menggunakan `localStorage` di browser. Ini hanya prototipe frontend, bukan sistem autentikasi produksi.

## Publish ke GitHub Pages
1. Ekstrak ZIP.
2. Unggah `index.html` dan folder `assets/` ke root repository GitHub (jangan letakkan `index.html` di folder bersarang).
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/(root)`, lalu **Save**.
6. Tunggu workflow Pages selesai, lalu buka URL yang muncul di Settings → Pages.

## Batasan penting
GitHub Pages hanya menyajikan file statis. Ia tidak menjalankan PHP, database SQL, middleware, atau validasi JWT server-side. API ON/OFF di demo hanya mengubah indikator UI; input API key tidak menghubungi layanan eksternal. Jangan masukkan API key sungguhan ke situs publik.

Agar benar-benar operasional, backend terpisah perlu disiapkan (misalnya PHP 8.1+ di hosting/cPanel, database MySQL, HTTPS, autentikasi server-side, hash password, JWT yang tervalidasi di server, rate limiting, audit log, dan kontrol akses). Endpoint eksternal untuk verifikasi atau perubahan akun kendaraan harus resmi dan memiliki otorisasi; paket ini sengaja hanya menyimulasikan tindakan reset/blokir/hapus dan tidak melakukan perubahan pada sistem pihak ketiga.

## Struktur
- `index.html` — halaman aplikasi
- `assets/style.css` — gaya responsif neo-brutalism
- `assets/app.js` — interaksi frontend dan penyimpanan lokal
- `assets/preview-neo-brutalism.png` — gambar konsep UI
- `docs/` — folder untuk dokumentasi tambahan
