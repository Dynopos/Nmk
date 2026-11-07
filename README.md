# Signboard Expert (NMK Maju Resources): Laman Web Rasmi (Cinematic Chrome)

Laman web statik (HTML, CSS dan JS tanpa build). Reka letak ikut laman Haiyat (penceritaan babak 01–06 semasa skrol),
dengan **latar putih**, warna **biru dan emas** ikut logo NMK, dan sentuhan **silver/chrome**: tajuk logam berkilat,
butang emas dan silver berkilau, garis silver, serta latar keluli berus (brushed steel) pada bahagian berselang.

Hook: **Pakar Signboard Termurah Kelantan**

| Babak | Kandungan |
|---|---|
| 01 Utama | Hero: gambar kedai Signboard Expert dengan trak kren NMK (bingkai chrome), logo NMK berkilau, tajuk "Pakar Signboard Termurah Kelantan", butang WhatsApp |
| 02 Tentang | NMK Maju Resources sejak 2019, 8 jenis signboard, 12 produk cetakan, foto bengkel di Bachok |
| 03 Signboard | Senarai 8 jenis signboard; setiap baris terus ke WhatsApp dengan mesej jenis tersebut |
| 04 Popular & Cetak | 3 signboard paling laris (Backlit, Box Up, Lightbox) + 12 produk percetakan |
| 05 Hasil kerja | Slider 8 projek pilihan + galeri 38 projek pelanggan dengan tapisan 5 kategori (LED Box Up, LED Backlit, Signboard UV, PVC 3D Foamboard, Lightbox) dan lightbox; foto penuh di `assets/projek-*.webp`, thumbnail di `assets/thumb/` (leret / seret / butang / anak panah) + 4 langkah cara tempah |
| FAQ | 6 soalan lazim (sepadan dengan FAQPage dalam JSON-LD) |
| 06 Hubungi | WhatsApp / telefon 013-537 3629, alamat kedai Bachok, Instagram, pendaftaran SSM/MOF |

## Struktur fail

```
index.html               Laman utama (SEO, Open Graph, JSON-LD)
404.html                 Halaman ralat (laluan mutlak /Nmk/ untuk GitHub Pages)
css/style.css            Gaya mobile-first (asas telefon, ≥700px tablet, ≥1024px desktop)
js/main.js               WhatsApp, menu, penunjuk babak, animasi skrol, slider
assets/*.webp            Foto produk dan hasil kerja (daripada laman lama signboardexpert.com)
assets/logo-nmk.webp     Logo NMK lutsinar untuk latar putih (PNG sebagai sandaran: logo-nmk.png)
assets/logo-nmk-128.png  Logo kecil untuk navigasi / footer
favicon.png, apple-touch-icon.png, icon-192.png
robots.txt, sitemap.xml, llms.txt, manifest.webmanifest, netlify.toml, .nojekyll
assets/og-signboard-expert.jpg  Gambar perkongsian media sosial 1200×630
```

## Tetapan penting

- **Nombor WhatsApp:** `js/main.js` → `const WHATSAPP_NUMBER = '60135373629';` (013-537 3629, akaun WhatsApp Business NMK; juga nombor telefon).
  Teks `013-537 3629`, pautan `tel:` serta `telephone` dan `contactPoint` dalam JSON-LD di `index.html` juga perlu dikemas kini jika bertukar.
- **Warna tema:** pemboleh ubah di atas `css/style.css` (`--blue`, `--gold`, `--chrome-gold`, `--chrome-blue`, `--silver-face`, `--gold-face`).
- **Cache pelayar:** pautan CSS/JS dalam `index.html` ada nombor versi (`style.css?v=20261107-3`).
  Setiap kali `css/style.css` atau `js/main.js` diubah, naikkan nombor itu supaya telefon pengunjung memuat turun fail baharu.
- **Preview tempatan:** buka melalui pelayan web (contoh `python3 -m http.server`), bukan terus dari fail,
  kerana kesan kilauan logo guna CSS mask yang disekat pelayar untuk `file://`.

## Deploy (GitHub Pages)

Laman rasmi: **https://dynopos.github.io/Nmk/**

Repo → *Settings → Pages* → *Build and deployment* → *Source: Deploy from a branch* →
branch `main`, folder `/ (root)` → *Save*. Laman akan online dalam 1–2 minit.
Setiap push ke `main` akan deploy semula secara automatik.

Jika deploy gagal / tersangkut: semak https://github.com/Dynopos/Nmk/actions (run "pages build and deployment").
Ralat "due to in progress deployment" bermakna deploy lama masih berjalan: tunggu, atau *Cancel workflow*
kemudian *Re-run failed jobs* pada run terbaru.

**Nota:** enjin carian membaca `robots.txt` di akar domain (`dynopos.github.io/robots.txt`), bukan dalam folder ini,
jadi sitemap mesti dihantar melalui Google Search Console.

### Pindah ke domain sendiri (signboardexpert.com) kemudian

1. Tambah fail `CNAME` berisi `signboardexpert.com`, dan isi *Custom domain* dalam *Settings → Pages*.
2. Di tempat domain didaftarkan, halakan DNS ke GitHub Pages (rekod A ke 185.199.108.153, 185.199.109.153,
   185.199.110.153, 185.199.111.153, dan CNAME `www` ke `dynopos.github.io`). Laman WordPress lama akan diganti.
3. Tukar semua `https://dynopos.github.io/Nmk/` dalam `index.html`, `sitemap.xml`, `robots.txt`, `llms.txt`
   ke `https://signboardexpert.com/`, dan laluan `/Nmk/` dalam `404.html` ke `/`.

**Netlify (alternatif):** https://app.netlify.com → *Add new site → Import an existing project → GitHub* → pilih repo.
Build command: *(kosong)*. Publish directory: `.`

## SEO & GEO (sudah dipasang)

**SEO dalam laman**
- Tajuk 52 aksara ("Pakar Signboard Termurah Kelantan | Signboard Expert") dan meta description ~150 aksara
  dengan kata kunci tempatan (signboard Kelantan / Kota Bharu / Bachok), `canonical`, `lang="ms-MY"`, meta geo MY-03.
- Satu H1, H2 setiap babak, H3 untuk FAQ. Semua gambar ada `alt`, `width`/`height` dan `loading="lazy"`.
- Gambar perkongsian khas `assets/og-signboard-expert.jpg` (1200×630) untuk WhatsApp, Facebook dan X.
- Seksyen **Kawasan liputan** (10 jajahan Kelantan) dan alamat + telefon (NAP) dalam footer untuk SEO tempatan.
- Gambar dimampatkan (aset ~2 MB), fon `display=swap`, logo hero di-preload.
- `sitemap.xml` (dengan imej), `manifest.webmanifest`, `robots.txt`.

**GEO (enjin carian AI: Google AI Overviews, ChatGPT, Perplexity, Gemini)**
- JSON-LD `@graph`: Organization, LocalBusiness (alamat, peta, `areaServed` 10 jajahan, katalog 9 servis,
  `alternateName`, `slogan`), WebSite, WebPage (dengan `speakable`), FAQPage 10 soalan.
- **Soalan Lazim** 10 soalan yang kelihatan pada laman, sama tepat dengan FAQPage.
- Kotak **Fakta ringkas** (nama, kepakaran, lokasi, kawasan, sejak, MOF, hubungi): format yang mudah dipetik AI.
- `llms.txt`: ringkasan fakta dwibahasa, jadual fakta, servis, kawasan, harga, FAQ dan pautan.
- `robots.txt` membenarkan bot AI (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended).

**Perlu dibuat oleh pemilik (di luar laman, paling besar kesannya)**
1. **Google Search Console:** https://search.google.com/search-console → *Add property → URL prefix* →
   `https://dynopos.github.io/Nmk/` → pilih *HTML tag* → hantar tag itu untuk dimasukkan ke `<head>`.
   Selepas disahkan: *Sitemaps* → hantar `sitemap.xml`, dan *URL Inspection* → *Request indexing*.
2. **Google Business Profile** (faktor No.1 untuk Google Maps): https://business.google.com.
   Kemas kini alamat ke **Bachok** (sama tepat seperti laman), letak pautan laman web, tambah waktu operasi,
   kategori "Sign shop" / "Kedai papan tanda", dan muat naik foto hasil kerja terkini.
3. **Bing Webmaster Tools** (ChatGPT search guna indeks Bing): https://www.bing.com/webmasters → import dari Search Console.
4. Letak pautan laman web pada bio Facebook, Instagram dan TikTok.
5. Minta ulasan Google **sebenar** daripada pelanggan (ulasan terkini kebanyakannya 3+ tahun lalu). Jangan cipta ulasan palsu.
6. Bila pindah ke `signboardexpert.com`, tukar URL (lihat bahagian Deploy) dan tambah domain baharu dalam Search Console.

## Senarai semak sebelum go-live

- [ ] **Waktu operasi** belum dimasukkan. Bila disahkan, tambah dalam seksyen Hubungi, kotak Fakta ringkas dan `openingHours` dalam JSON-LD.
- [ ] **Kawasan liputan:** sahkan kesemua 10 jajahan memang diterima (terutama Gua Musang, Jeli, Kuala Krai).
- [ ] **Emel** perniagaan (jika ada).
- [ ] Penarafan Google (4.8★) disemak semula sebelum go-live.
- [ ] Kenyataan "Termurah" ialah slogan pemilik; pastikan selaras dengan harga sebenar.
- [ ] Pendaftaran MOF sah hingga 20/01/2027: kemas kini laman jika tamat atau diperbaharui.
- [ ] Pautan Facebook, Instagram, TikTok dan WhatsApp diuji di telefon.

Tiada harga, testimoni atau tempoh siap dicipta. Kandungan berdasarkan laman lama signboardexpert.com
dan dokumen SSM/MOF yang dibekalkan pemilik. Maklumat peribadi (No. K/P, alamat rumah, penyata bank) tidak dimasukkan.
