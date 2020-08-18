# Node JS ES2015 Express Boilerplate

Kerangka aplikasi (boilerplate) untuk aplikasi backend REST API berbasis Node JS dengan framework Express JS, Babel, dan ES2015. Dibuat berdasarkan referensi [Kent C. Dodds Blogs](https://kentcdodds.com/blog/how-i-structure-express-apps) yang berjudul **_How I structure Express apps_**. Kerangka dengan tambahan Linter ESLint dan Prettier Formatter, bundle aplikasi dengan melakukan Webpack, dan contoh penggunaan Worker Thread untuk proses data yang berat di thread terpisah Node JS.

Github sumber dari Kent C Dodds adalah disini [https://github.com/kentcdodds/express-app-example](https://github.com/kentcdodds/express-app-example).

## Penggunaan Development dan Debug

Pastikan di komputer anda telah terpasang Node JS versi 12.x atau yang lebih baru. Clone atau download project ini dengan menggunakan Git ke komputer lokal.

- Kemudian jalankan Perintah `npm install` .
- Untuk menjalankan proses debug atau development, jalankan perintah `npm run debug-babel`. Di dalam folder `/src/index.js` terdapat fungsi melakukan Clustering proses Node JS. Non aktifkan atau berikan comment // pada fungsi clustering tersebut, jika proses Clustering membuat perangkat dan proses development terasa berat, atau tidak dibutuhkan.

## Penggunaan Production

Dalam pembuatan mode production, terdapat dua pilihan. Pilihan pertama yaitu melakukan build dengan Babel Compiler, dan pilihan kedua melakukan build dengan Webpack.

 **_Production dengan Babel Compiler_**

- Untuk proses **_Production dengan Babel Compiler_** , jalankan perintah `npm run build-babel` . Hasil dari build akan menghasilkan folder ``/dist``` .

- Untuk menguji hasil build di folder `/dist` , jalankan perintah `npm run start-babel` .

- Jika ingin deploy ke server, gunakan hasil build di folder `/dist` tersebut. Jangan lupa untuk konfigurasi `.env` dan instalasi package yang dibutuhkan di `package.json` .

 **_Production dengan Webpack_**

- Jalankan perintah `npm run build-prod` untuk membuat bundle file project yang ada di folder `/src` menjadi satu bundle file JavaScript yang sudah di minify.

- Hasil build mode Webpack akan menghasilkan file-file yang terdapat di folder `/bundle`.

- Untuk menguji hasil build mode Webpack ini, jalankan perintah `npm run debug-prod`.

- Jika ingin digunakan untuk deploy ke server, gunakan hasil build di folder `/bundle` ini. Jangan lupa untuk konfigurasi `.env` dan instalasi package yang dibutuhkan di `package.json` . Setelah konfigurasi dua hal tersebut, jalankan file `server.bundle.js` dengan PM2, Nodemon, atau Forever JS.

## Persyaratan Opsional Lainnya

Pastikan plugin ESLint dan Prettier telah terpasang di VS Code. Kemudian tambahkan konfigurasi ini di dalam file `settings.json` di setelan milik VS Code. File konfigurasi dapat diakses dengan menu File > Preferences > Settings. Kemudian klik tanda tombol di pojok kanan atas yang bertuliskan Open Settings (JSON).

```json
"editor.formatOnSave": true,
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
}
```

Dengan penambahan baris konfigurasi VS Code di atas, VS Code akan melakukan formatting kode JavaScript ketika melakukan penyimpanan.
