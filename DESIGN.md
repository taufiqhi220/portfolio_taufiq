# Design Direction: Portofolio Taufiq Hidayat

Dokumen ini mendefinisikan jiwa, identitas visual, tipografi, dan palet warna untuk website portofolio Taufiq Hidayat sesuai standar **Anti-Slop (R-37 & Part 3: Liveliness Toolkit)**.

---

## 1. Design Read (Deklarasi Karakter)

> **Reading this as:** Portfolio & Showcase Multidisiplin (Web Development & Video Editing) untuk klien, kolaborator, dan recruiter teknologi, dalam gaya visual *warm editorial studio & exhibition catalog*, dial **ENERGY 2 / RHYTHM 2 / MOTION 1**.

> Referensi estetika: Portfolio desainer/engineer independen (Rauno Freiberg, Paco Coursey, Lynn Fisher), bukan SaaS landing page. Latar terang hangat, karya sebagai bintang, tipografi percaya diri, aksen warna tunggal yang hangat.

---

## 2. Dials (Karakter Dinamis)

| Dial | Level | Karakteristik yang Diterapkan |
| :--- | :--- | :--- |
| **ENERGY** | **2 (Balanced)** | Terang, bersih, percaya diri. Warna hangat off-white yang ramah mata, bukan gelap SaaS. Karya tampil sebagai fokus utama, bukan dekorasi UI. |
| **RHYTHM** | **2 (Consistent with Breaks)** | Variasi komposisi: hero asimetris, kartu proyek didominasi gambar, dan seksi tentang dua kolom. |
| **MOTION** | **1 (Subtle Only)** | Hanya transisi halus pada hover kartu dan navigasi. Tidak ada animasi dekoratif. |

---

## 3. Palet Warna (Anti-Slop R-29: Maksimal 2 Warna Utama + 1 Aksen)

| Token | Nilai Hex | Peran & Alasan Penggunaan (R-31) |
| :--- | :--- | :--- |
| `--color-bg` | `#FAFAF7` | Latar utama off-white hangat. Lebih lembut dari putih murni, memberi karakter "studio kertas". |
| `--color-surface` | `#FFFFFF` | Permukaan kartu dan form. Membedakan elemen interaktif dari latar belakang. |
| `--color-text` | `#1C1917` | Teks utama. Charcoal hangat (stone-900), bukan hitam murni. Kontras 15.4:1 terhadap latar. |
| `--color-text-secondary` | `#78716C` | Teks pendukung/deskripsi. Kontras 4.8:1 (memenuhi WCAG AA). |
| `--color-border` | `#E7E5E4` | Garis batas halus (stone-200). Cukup terlihat tanpa mendominasi. |
| `--color-accent` | `#B45309` | Aksen tunggal: amber tua/warm copper. Hangat, kreatif, dan tidak generik. Hanya untuk 1-2 elemen penting. |
| `--color-accent-hover` | `#92400E` | State hover aksen. |

---

## 4. Tipografi (R-06)

- **Headings / Judul**: `'Outfit'`, sans-serif geometris modern berkarakter percaya diri. Ukuran besar di hero (clamp responsif).
- **Body / Konten Teks**: `'Inter'`, sans-serif netral dengan keterbacaan tinggi.
- **Monospace**: Tidak digunakan sebagai elemen dekoratif. Hanya jika secara teknis relevan (kode, slug URL).
- **Aturan Copy (R-02 & R-16)**: Bebas em dash, bahasa lugas, jujur, berfokus pada bukti hasil kerja nyata.

---

## 5. Levers & Komponen Identitas

1. **Light Foundation**: Latar hangat off-white. Gelap hanya digunakan saat konteks memerlukan (modal video player membutuhkan backdrop gelap untuk menonton video).
2. **Work-First Cards**: Thumbnail proyek memenuhi kartu. Chrome minimal di sekitar karya.
3. **Single Accent Rule**: Warna aksen amber hanya muncul di 1-2 titik fokus per layar (tombol CTA utama, status aktif). Semua elemen lain netral.
4. **No Decoration Without Purpose**: Tidak ada orb, glow, gradasi, atau grid sebagai hiasan latar belakang. Ruang kosong (white space) adalah elemen desain utama.
