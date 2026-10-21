# Portofolio Profesional: Taufiq Hidayat
### Web Developer & Creative Video Editor

Website portofolio personal interaktif dan studio digital yang menampilkan karya nyata di bidang rekayasa perangkat lunak web full-stack dan produksi video sinematik / kinetic motion graphics. Dilengkapi dengan Admin Management Studio untuk mengelola proyek, kategori, toolkit teknologi, dan profil secara mandiri.

---

## Fitur Utama

- **Showcase Portofolio Tersegmentasi**: Pemilahan karya dinamis antara *Web Development*, *Video Editing & Motion*, serta riset/eksperimen.
- **Pemutar Video Interaktif**: Terintegrasi langsung dengan YouTube, Google Drive, Vimeo, dan video lokal dalam pop-up modal tanpa meninggalkan halaman.
- **Studi Kasus Lengkap**: Modal detail karya mendalam yang memuat ringkasan, rumusan masalah teknis (*problem statement*), dan solusi rekayasa (*engineering solution*).
- **Lencana Toolkit & Monogram Bersih**: Menampilkan stack teknologi terkini dengan dukungan upload logo kustom (SVG, PNG, WebP) serta fallback monogram teknis rapi.
- **Fluid Ambient Waves & Motion Design**: Animasi latar belakang organik dinamis dan transisi mulus berbasis CSS modern & Framer Motion.
- **Admin Management Studio**:
  - Manajemen Karya & Proyek (tambah, edit, hapus, urutkan, upload thumbnail, embed video).
  - Manajemen Kategori Portofolio (mode web standar vs mode video interaktif).
  - Manajemen Tech Stack & Software (upload logo kustom, pembagian grup stack).
  - Pengaturan Identitas & Profil (headline, bio naratif, lokasi WITA, ketersediaan kerja, link sosial).
  - Manajemen Pesan Kontak Pengunjung (*Inquiries*).

---

## Teknologi & Arsitektur

- **Backend**: Laravel 13, PHP 8.3
- **Frontend**: React 19, TypeScript, Inertia.js v2
- **Styling**: Tailwind CSS v4, Vanilla CSS Design System
- **Database**: PostgreSQL
- **Animasi & Interaksi**: Framer Motion, Vanilla CSS Keyframes
- **Autentikasi**: Laravel Breeze

---

## Cara Menjalankan Proyek Secara Lokal

### 1. Kloning Repositori
```bash
git clone https://github.com/taufiqhi220/portfolio_taufiq.git
cd portfolio_taufiq
```

### 2. Pasang Dependensi PHP & Node.js
```bash
composer install
npm install
```

### 3. Konfigurasi Lingkungan (.env)
Salin berkas konfigurasi contoh dan sesuaikan koneksi database PostgreSQL Anda:
```bash
cp .env.example .env
php artisan key:generate
```

Sesuaikan variabel database di `.env`:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=portfolio_taufiq
DB_USERNAME=postgres
DB_PASSWORD=secret
```

### 4. Migrasi & Seeder Database
```bash
php artisan migrate --seed
```

### 5. Buat Tautan Penyimpanan File Publik
```bash
php artisan storage:link
```

### 6. Jalankan Server Pengembangan
Jalankan server Laravel dan Vite secara bersamaan:
```bash
php artisan serve
npm run dev
```

Buka aplikasi di browser pada: `http://127.0.0.1:8000`

---

## Pengujian & Kualitas Kode

Proyek ini telah dilengkapi dengan rangkaian automated test (PHPUnit / Pest):
```bash
php artisan test
```

---

## Lisensi & Hak Cipta

Hak Cipta &copy; 2026 Taufiq Hidayat. Seluruh karya, aset visual, dan kode sumber dilindungi.
