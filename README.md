# Signboard Expert (NMK Maju Resources): Laman Web Rasmi (Cinematic Chrome)

Laman web statik (HTML, CSS dan JS tanpa build). Reka letak ikut laman Haiyat (penceritaan babak 01–06 semasa skrol),
dengan **latar putih**, warna **biru dan emas** ikut logo NMK, dan sentuhan **silver/chrome**: tajuk logam berkilat,
butang emas dan silver berkilau, garis silver, serta latar keluli berus (brushed steel) pada bahagian berselang.

Hook: **Pakar Signboard Termurah Kelantan**

| Babak | Kandungan |
|---|---|
| 01 Utama | Hero skrin penuh: logo NMK dengan kilauan chrome, tajuk "Pakar Signboard Termurah Kelantan", butang WhatsApp |
| 02 Tentang | NMK Maju Resources sejak 2019, 8 jenis signboard, 12 produk cetakan, foto bengkel di Bachok |
| 03 Signboard | Senarai 8 jenis signboard; setiap baris terus ke WhatsApp dengan mesej jenis tersebut |
| 04 Popular & Cetak | 3 signboard paling laris (Backlit, Box Up, Lightboard) + 12 produk percetakan |
| 05 Hasil kerja | Slider mendatar 6 projek (leret / seret / butang / anak panah) + 4 langkah cara tempah |
| FAQ | 6 soalan lazim (sepadan dengan FAQPage dalam JSON-LD) |
| 06 Hubungi | WhatsApp 017-975 3629, alamat kedai Bachok, Instagram, pendaftaran SSM/MOF |

## Struktur fail

```
index.html               Laman utama (SEO, Open Graph, JSON-LD)
404.html                 Halaman ralat (laluan mutlak "/", untuk domain sendiri)
css/style.css            Gaya mobile-first (asas telefon, ≥700px tablet, ≥1024px desktop)
js/main.js               WhatsApp, menu, penunjuk babak, animasi skrol, slider
assets/*.webp            Foto produk dan hasil kerja (daripada laman lama signboardexpert.com)
assets/logo-nmk.webp     Logo NMK lutsinar untuk latar putih (PNG sebagai sandaran: logo-nmk.png)
assets/logo-nmk-128.png  Logo kecil untuk navigasi / footer
favicon.png, apple-touch-icon.png, icon-192.png
robots.txt, sitemap.xml, llms.txt, netlify.toml, .nojekyll
```

## Tetapan penting

- **Nombor WhatsApp:** `js/main.js` → `const WHATSAPP_NUMBER = '60179753629';`
  (Nombor dalam teks `017-975 3629` dan `telephone` dalam JSON-LD di `index.html` juga perlu dikemas kini jika bertukar.)
- **Warna tema:** pemboleh ubah di atas `css/style.css` (`--blue`, `--gold`, `--chrome-gold`, `--chrome-blue`, `--silver-face`, `--gold-face`).
- **Cache pelayar:** pautan CSS/JS dalam `index.html` ada nombor versi (`style.css?v=20261107-2`).
  Setiap kali `css/style.css` atau `js/main.js` diubah, naikkan nombor itu supaya telefon pengunjung memuat turun fail baharu.
- **Preview tempatan:** buka melalui pelayan web (contoh `python3 -m http.server`), bukan terus dari fail,
  kerana kesan kilauan logo guna CSS mask yang disekat pelayar untuk `file://`.

## Deploy

**Netlify (drag & drop):** https://app.netlify.com → *Add new site → Deploy manually* → seret seluruh folder projek.

**Netlify melalui GitHub:** *Add new site → Import an existing project → GitHub* → pilih repo.
Build command: *(kosong)*. Publish directory: `.`

**GitHub Pages:** Repo → *Settings → Pages* → *Deploy from a branch* → pilih branch dan folder `/ (root)`.
Laman utama guna laluan relatif, jadi berfungsi di sub-folder. `404.html` guna laluan mutlak `/`
(untuk domain sendiri `signboardexpert.com`).

**Domain:** semua URL kanonik, Open Graph, `sitemap.xml`, `robots.txt` dan `llms.txt` guna `https://signboardexpert.com/`.
Halakan DNS domain itu ke hosting baharu. Jika guna domain lain, tukar URL tersebut.

## SEO & GEO (sudah dipasang)

- Tajuk & meta description dengan kata kunci "Pakar Signboard Termurah Kelantan", `canonical`, `lang="ms-MY"`,
  meta geo (MY-03 / Bachok), Open Graph & Twitter Card.
- JSON-LD (`@graph`): Organization, LocalBusiness (alamat, peta, telefon, media sosial, katalog servis), WebSite, WebPage, FAQPage.
- Seksyen Soalan Lazim yang kelihatan pada laman, sepadan dengan FAQPage.
- `sitemap.xml` (dengan imej), `robots.txt` (benarkan Googlebot dan bot AI) dan `llms.txt` (ringkasan fakta untuk AI).

**Perlu dibuat oleh pemilik (di luar laman):**
1. **Google Search Console:** tambah domain, hantar `sitemap.xml`, minta indexing.
2. **Google Business Profile:** pastikan nama, alamat dan telefon **sama tepat** seperti di laman (NAP).
   Alamat kedai ialah Bachok; laman lama menyebut Kota Bharu.
3. **Bing Webmaster Tools:** import dari Search Console.
4. Letak pautan laman web pada bio Facebook, Instagram dan TikTok.

## Senarai semak sebelum go-live

- [ ] **Waktu operasi** belum dimasukkan. Bila disahkan, tambah dalam seksyen Hubungi dan `openingHours` dalam JSON-LD.
- [ ] **Emel** perniagaan (jika ada).
- [ ] Penarafan Google (4.8★) disemak semula sebelum go-live.
- [ ] Kenyataan "Termurah" ialah slogan pemilik; pastikan selaras dengan harga sebenar.
- [ ] Pendaftaran MOF sah hingga 20/01/2027: kemas kini laman jika tamat atau diperbaharui.
- [ ] Pautan Facebook, Instagram, TikTok dan WhatsApp diuji di telefon.

Tiada harga, testimoni atau tempoh siap dicipta. Kandungan berdasarkan laman lama signboardexpert.com
dan dokumen SSM/MOF yang dibekalkan pemilik. Maklumat peribadi (No. K/P, alamat rumah, penyata bank) tidak dimasukkan.
