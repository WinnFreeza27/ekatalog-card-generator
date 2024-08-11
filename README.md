# ekatalog-card-generator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![Next.js](https://img.shields.io/badge/Next.js-12.0.0-blue.svg)
![Puppeteer](https://img.shields.io/badge/Puppeteer-13.0.0-blue.svg)

## Overview

`ekatalog-card-generator` adalah aplikasi open-source yang memungkinkan Anda untuk meng-generate kartu produk yang dapat diunduh sebagai gambar. Aplikasi ini memanfaatkan teknik scraping website untuk mengambil data dari halaman produk di [e-katalog](https://ekatalog.lkpp.go.id/). Data yang diperoleh dari website tersebut kemudian digunakan untuk membuat kartu yang menarik dan informatif, sesuai dengan link yang diinputkan oleh user.

## Features

- **Generate Card Otomatis**: Cukup dengan meng-copy link produk dari e-katalog dan paste ke dalam input yang tersedia, aplikasi akan secara otomatis mengambil data dan menampilkannya dalam bentuk kartu.
- **Unduh Gambar**: Setelah kartu berhasil di-generate, Anda dapat mengunduhnya sebagai gambar untuk digunakan di berbagai keperluan.
- **Responsive Design**: Dibangun dengan TailwindCSS dan ShadcnUI, aplikasi ini memiliki antarmuka yang modern dan responsif, sesuai untuk berbagai perangkat.
- **Backend Scraping**: Menggunakan Puppeteer, data diambil langsung dari halaman produk e-katalog tanpa perlu intervensi manual.

## Background

Aplikasi ini dirancang untuk mempermudah proses pembuatan lampiran foto dalam surat permohonan pengadaan. Sebelumnya, user harus memasukkan data produk satu per satu berdasarkan informasi dari website e-katalog. Dengan `ekatalog-card-generator`, user hanya perlu menyalin link produk dan aplikasi akan menangani sisanya secara otomatis.

## How It Works

1. **Input URL**: User membuka aplikasi dan menempelkan link produk dari e-katalog ke input yang disediakan.
2. **Generate Card**: Setelah tombol "Generate Card" ditekan, aplikasi akan melakukan request ke backend server, dan skeleton akan muncul sebagai pertanda status loading.
3. **Scraping Data**: Backend server menggunakan Puppeteer untuk melakukan scraping data dari website e-katalog, seperti nama penyedia, nama produk, harga, kode produk, komponen biaya, dan gambar produk.
4. **Display Card**: Data yang berhasil diambil akan ditampilkan pada card di frontend, setelah skeleton loading selesai.
5. **Download Image**: Setelah kartu berhasil dibuat, user dapat mengunduhnya sebagai gambar.

## Technologies Used

- **Next.js**: Digunakan untuk frontend dan backend aplikasi.
- **TailwindCSS**: Untuk styling yang responsif dan modern.
- **ShadcnUI**: Komponen UI yang mempermudah pengembangan antarmuka.
- **Puppeteer**: Untuk scraping data dari halaman produk e-katalog.
- **Axios**: Digunakan untuk meng-handle HTTP request antara frontend dan backend.
- **Vercel**: Deployment menggunakan platform Vercel dengan dukungan full-stack Next.js.
- **V0 by vercel**: Komponen generator yang mempermudah pembuatan UI secara cepat

## Getting Started

Untuk memulai proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1. **Clone repository ini**:
    ```bash
    git clone https://github.com/username/ekatalog-card-generator.git
    ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Jalankan development server**:
    ```bash
    npm run dev
    ```
4. **Buka browser Anda dan akses**:
    ```
    http://localhost:3000
    ```

## Contributing

Kontribusi sangat diterima! Jika Anda memiliki ide untuk fitur baru, perbaikan bug, atau peningkatan lainnya, jangan ragu untuk membuat pull request atau membuka isu.

## License

Aplikasi ini dilisensikan di bawah [MIT License](LICENSE).

## Acknowledgments

Terima kasih kepada semua kontributor open-source yang telah membuat proyek ini mungkin. 

---

Selamat menggunakan `ekatalog-card-generator`! Jika Anda menemukan masalah atau memiliki pertanyaan, jangan ragu untuk menghubungi kami melalui [issues](https://github.com/username/ekatalog-card-generator/issues).

Iya, readme ini di generate oleh chatgpt karena gw terlalu bingung mau nulis apa..
