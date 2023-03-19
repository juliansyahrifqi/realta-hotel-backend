# Hotel Realta Backend

List nama username **Github** di Trello untuk diundang sebagai collaborator di project ini.

## Clone Project

Clone project ini dengan menggunakan perintah:

```bash
git clone https://github.com/juliansyahrifqi/realta-hotel-backend.git
```

Setelah clone project ini, buka di VS Code.

## Instalasi dan Jalankan Project

```bash
npm install

npm run start:dev
```

## Buat Branch Baru

Setelah itu buat branch baru dengan perintah

```bash
git checkout -b  namamodule_namakamu
```

**Contoh**: `

```
git checkout -b payment_rustam
```

Buat kodingan untuk backend kalian.

> Semua perubahan kode untuk masing-masing module di `commit` dan di `push` ke `branch` masing-masing (jangan ke `branch master`).
> Setelah itu kalau ada keperluan untuk menyatukan project bisa melakukan `pull request` atau menghubungi Tama atau yang lain.

---

## Aturan-aturan

### Penamaan

> **Jangan menggunakan nama yang kurang memberikan gambaran tentang variabel, nama method/function, isi file atau folder yang dikerjakan agar mudah dikenali atau dibaca oleh orang lain. Contoh:** `let terserah = 'terserah`, `nyoba-nyoba.controller.ts`, `jajang.service.ts`, atau `folderPunyaJajang`.

1. Penamaan variabel menggunakan bahasa inggris dan menggunakan format **camelCase**.
   Contoh: `const hotelName: string`

2. Penamaan method/function menggunakan bahasa inggris dan menggunakan format **camelCase**.
   Contoh: `const getAllUsers() {}`;

3. Penamaan folder menggunakan nama bahasa inggris dan menggunakan format **camelCase**.
   Contoh: `usersSchema`

4. Nama folder untuk models menggunakan format `namaSchema`.
   Contoh: `usersSchema`

### Struktur Folder Models

1. Struktur folder untuk models:

```
models/
  ├── nama_schema (contoh: usersSchema)
    ├── nama_tabel (contoh: users.ts)
    ├── user_password.ts
```

. Pastikan ketika ketika generate models, output yang disimpan adalah seperti `models/nama_schema`. Contoh: `models/usersSchema`.

> **Jangan menambahkan script di dalam `package.json` untuk menghindari konflik di kemudian hari. Lebih baik menggunakan `npx`. Contoh:**

Install NPX

```bash
npm install -g npx
```

Lalu, untuk generate model, contoh:

```bash
npx stg -D postgres -o models/users_module -h localhost -p 5432 -d "HotelRealtaDB" -u postgres -x "your_password" --indices --associations-file association.csv --clean
```

### Struktur Folder Untuk Masing-masing Schema

```
src/
  ├── nama_schema (contoh: usersSchema)
    ├── users
      ├── dto
         ├── createUsers.dto.ts
         ├── updateUsers.dto.ts
      ├── users.controller.spec
      ├── users.controller.ts
      ├── users.module.ts
      ├── users.service.spec
      ├── users.service.ts
```

Ketika akan generate seperti module, service atau controllers, pastikan bahwa file yang kita generate tadi berada di folder sesuai dengan schema yang kita kerjakan.

```bash
nest g resources namaSchema/namaTabel
```

Contoh:

```bash
nest g resources usersSchema/users
```

Jika ada kebutuhan penambahan folder custom seperti untuk `guards`, `validation`, dll bisa disesuaikan.

Namun apabila jika misalnya ada kebutuhan yang bisa dipakai oleh banyak schema seperti `konstanta`, `decorators` dan lainnya bisa disimpan pada folder `common`.

### Penggunaan File .env

Untuk file `.env` bisa buat file dengan nama `.env` dan bisa copy isinya dari file `.env.example`
