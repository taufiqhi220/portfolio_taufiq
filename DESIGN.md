# Design Direction: Portofolio Taufiq Hidayat

Dokumen ini mendefinisikan jiwa, identitas visual, tipografi, dan palet warna untuk website portofolio Taufiq Hidayat sesuai standar **Anti-Slop (R-37 & Part 3: Liveliness Toolkit)**.

---

## 1. Design Read (Deklarasi Karakter)

> **Reading this as:** Portfolio & Showcase Multidisiplin (Web Development & Video Editing) untuk klien, kolaborator, dan recruiter teknologi, dalam gaya visual *modern engineering studio & creative showcase*, dial **ENERGY 2 / RHYTHM 2 / MOTION 2**.

---

## 2. Dials (Karakter Dinamis)

| Dial | Level | Karakteristik yang Diterapkan |
| :--- | :--- | :--- |
| **ENERGY** | **2 (Balanced)** | Tampilan berkelas, bersih, dan profesional. Menghindari kesan kaku monoton tanpa terjebak ke tren visual berlebihan (*no neon chaos*). |
| **RHYTHM** | **2 (Consistent with Breaks)** | Grid teratur yang memiliki variasi komposisi: kartu proyek web dengan tag teknologi, kartu video dengan preview play button, dan kartu studi kasus dengan sorotan problem-solving. |
| **MOTION** | **2 (Smooth Transitions)** | Transisi mikro halus pada hover kartu, tab perpindahan kategori, dan dialog pemutar video; tanpa animasi memantul (*bounce*) yang tidak bertujuan UX. |

---

## 3. Palet Warna (Anti-Slop R-29: Maksimal 2–3 Warna Utama + 1 Aksen)

| Token | Nilai Hex | Peran & Alasan Penggunaan (R-31) |
| :--- | :--- | :--- |
| `--color-surface-bg` | `#090d16` | Latar belakang utama *obsidian slate* yang pekat dan nyaman di mata untuk sesi baca panjang. |
| `--color-surface-card` | `#0f172a` | Warna permukaan kartu untuk membedakan kedalaman (*elevation*) konten dari latar belakang. |
| `--color-surface-hover` | `#1e293b` | Warna state hover interaktif untuk memberi respon visual saat kartu disorot kursor. |
| `--color-border-subtle` | `#1e293b` | Garis batas tipis berstruktur untuk memisahkan seksi secara rapi. |
| `--color-brand-primary` | `#3b82f6` | Warna biru teknik profesional untuk tombol aksi utama (*Call to Action*). |
| `--color-brand-accent` | `#06b6d4` | Warna aksen cyan terarah khusus untuk menyorot status aktif dan badge penting. |
| `--color-text-main` | `#f8fafc` | Teks utama dengan kontras tinggi (memenuhi standar WCAG AA 14.8:1 terhadap background). |
| `--color-text-muted` | `#94a3b8` | Teks pendukung/deskripsi dengan rasio kontras 5.2:1 (memenuhi standar WCAG AA). |

---

## 4. Tipografi (R-06)

- **Headings / Judul**: `'Outfit'`, sans-serif geometris modern berkarakter percaya diri dan tajam.
- **Body / Konten Teks**: `'Inter'`, sans-serif netral dengan keterbacaan tinggi di berbagai resolusi layar.
- **Aturan Copy (R-02 & R-16)**: Bebas em dash (`—`), bahasa lugas, jujur, dan berfokus pada bukti hasil kerja nyata (*evidence over claims*).

---

## 5. Levers & Komponen Identitas

1. **One Focal Point per Screen**: Setiap layar memiliki satu titik fokus utama yang jelas (misal: tombol CTA utama di Hero, atau kartu karya unggulan di seksi portofolio).
2. **Video Player Modal**: Pemutar video responsif di tengah layar dengan backdrop gelap tembus pandang, mendukung YouTube, Google Drive, dan direct MP4, dapat ditutup dengan tombol `Escape` (R-32).
3. **Adaptive Card Layout**:
   - Kartu Web: Menonjolkan cuplikan UI, tag teknologi, dan tombol Demo / GitHub.
   - Kartu Video: Menonjolkan thumbnail rasio 16:9 dengan tombol Play melayang dan software editing yang digunakan.
   - Kartu Studi Kasus: Menonjolkan tantangan teknis, solusi, dan metrik hasil kerja.
