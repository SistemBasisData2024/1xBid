# 1xBid
## *Kelompok 24 Sistem Basis Data*
Merupakan sebuah website yang dirancang untuk memfasilitasi proses pelelangan barang (budak). Website ini memberikan kesempatan bagi user untuk berpartisipasi dalam lelang, baik sebagai penawar maupun sebagai penjual, disertai interface yang user-friendly dan fitur yang lengkap. 

### Anggota Kelompok
- [Giovan Christoffel Sihombing](https://github.com/MorpKnight) - 2206816084
- [Fathin Umara Aero](https://github.com/rovaero) - 2206814186
- [Darren Nathanael Boentara](https://github.com/DarrenNathanaelB) - 2206062964

## Fitur Utama
Website ini memiliki beberapa fitur utama, yaitu:
- Open Toko: Pengguna dapat membuka toko mereka sendiri untuk mulai menjual barang-barang mereka.
- Add Product: Setelah membuka toko, pengguna dapat menambahkan produk baru serta mengelola produk tersebut dengan fitur edit dan delete.
- Bidding Process: Pengguna dapat ikut serta dalam proses lelang untuk barang-barang yang diminati.
- Payment: Pemenang lelang dapat melakukan pembayaran untuk barang yang dimenangkan.

## Alur Penggunaan
- **Sign Up dan Login**: Sebelum membuka toko atau mengikuti lelang, pengguna harus mendaftar dan masuk ke akun mereka terlebih dahulu.
- **Homepage**: Setelah login, pengguna akan disambut oleh homepage yang menampilkan barang-barang yang tersedia untuk dilelang.
- **Membuka Toko**: Membuka toko dilakukan di halaman User Profile. Di sini, pengguna dapat memulai toko mereka sendiri.
- **Menambahkan dan Mengelola Produk**: Di halaman Toko Details, pengguna dapat menambahkan produk yang akan dilelang, lengkap dengan deskripsi, kategori, harga awal, serta waktu mulai dan berakhirnya lelang. Pengguna juga dapat mengedit atau menghapus produk yang telah ditambahkan.
- **Menawar di Page OnBid**: Pengguna yang berperan sebagai penawar dapat melihat daftar lelang yang sedang berjalan di halaman OnBid dan menawar produk yang mereka minati.
- **Pembayaran oleh Pemenang Lelang**: Setelah lelang berakhir dan pemenang ditentukan, pemenang tersebut harus membayar dengan jumlah yang dia menangkan pada halaman payment.

## Teknologi yang digunakan
- **Frontend**               : React.js, Tailwind CSS
- **Backend**                : Node.js, Express.js
- **Database**               : Neon.tech, PostgreSQL
- **Authentication**         : JWT (JSON Web Token)
- **Real-time Communication**: Socket.io

## Diagram

### UML
![UML1xBid](https://github.com/SistemBasisData2024/1xBid/assets/144208794/4cecb0ce-519a-4d85-96ec-421500923af4)

### ERD
![ERD 1xBid drawio](https://github.com/SistemBasisData2024/1xBid/assets/144208794/07a772e3-5c13-45cb-be40-6fa9fecf5ed8)

### Flowchart
![Flowchart-1xBid](https://github.com/SistemBasisData2024/1xBid/assets/144208794/e1fdf7b6-030f-440f-a7fa-e88f95c56d08)

# Installation Guide
Clone repository berikut:
```
https://github.com/SistemBasisData2024/1xBid
```

## Backend
- Pastikan anda berada di folder yang benar

![image](https://github.com/SistemBasisData2024/1xBid/assets/144208794/45cbce72-a0f3-4830-bb2d-1d551ecb959d)

- Run npm install untuk menginstall semua dependency
```
npm install
```
- Buat file .env pada root folder proyek dan tambahkan variable berikut:

![image](https://github.com/SistemBasisData2024/1xBid/assets/144208794/f6d3a008-b265-4512-ba81-ab91d2453df3)

```
JWT_SECRET=e0a9f52436e09d9b4f5f889f4bb7eee1dcad6b5ccf82e40554c3d5fa842c963019ceacd78ebc94be36cc698ca77ed07cf39993245194a82bcac239bf96bed34c
PORT=5000
PGHOST='ep-long-cell-a1uiinvl.ap-southeast-1.aws.neon.tech'
PGDATABASE='proyekakhir-sbd24'
PGUSER='proyekakhir-sbd24'
PGPASSWORD='j6u9NasKkFIV'
```

- Run npm run start untuk menjalankan website
```
npm run start
```

## Frontend
- Pastikan anda berada di folder yang benar

![image](https://github.com/SistemBasisData2024/1xBid/assets/144208794/a9cb2439-e571-4c94-88ba-0fbe6bf0cbbe)

- Run npm install untuk menginstall semua dependency
```
npm install
```
- Run npm run dev untuk menjalankan website
```
npm run dev
```
![image](https://github.com/SistemBasisData2024/1xBid/assets/144208794/4b6e1138-810c-44f0-8e2c-8206a024eb74)

## Dokumentasi Website
### 1. Login Page
![Screenshot 2024-06-09 185758](https://github.com/SistemBasisData2024/1xBid/assets/144208794/84e35104-a066-4ff6-9404-fc124a7ec844)
### 2. Signup Page
![Screenshot 2024-06-09 185806](https://github.com/SistemBasisData2024/1xBid/assets/144208794/290fcdbf-6803-4dda-b4f9-9d3a0df06d28)
### 3. Homepage
![ss 01](https://github.com/user-attachments/assets/f18e1816-8256-45c1-a87a-64b3779b63e3)
### 4. Profile Page
![Screenshot 2024-06-09 190726](https://github.com/SistemBasisData2024/1xBid/assets/144208794/e5ec9472-e7b9-48f1-8083-4ff33c6e31e6)
### 5. Toko Details Page
![SS 2](https://github.com/user-attachments/assets/796df419-8576-430c-b1e7-e0a81c32e65c)
### 6. Product Page
![SS 3](https://github.com/user-attachments/assets/b072cb1c-da9e-422e-b1a3-65f7d7f28aae)
### 7. OnBid Page
![SS 4](https://github.com/user-attachments/assets/0ccab2a2-0337-4c6c-9cd5-403afc8381ff)
### 8. Payment Page
![Screenshot 2024-06-09 191035](https://github.com/SistemBasisData2024/1xBid/assets/144208794/8c50d2b2-c708-4503-a8db-894321270490)


# Progress Report
![Screenshot 2024-05-26 203554](https://github.com/SistemBasisData2024/1xBid/assets/144208794/1d05eb6f-79fd-4f14-9ccb-be33fe7ccc72)
![messageImage_1717860619535](https://github.com/SistemBasisData2024/1xBid/assets/144208794/249a3290-1282-4709-8843-9feb45997673)
