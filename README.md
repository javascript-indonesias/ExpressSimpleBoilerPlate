# Node JS ES2015 Express Boilerplate

Kerangka aplikasi untuk aplikasi backend berbasis Node JS dengan framework Express JS, Babel, dan ES2015. Dibuat berdasarkan referensi [Kent C. Dodds Blogs](https://kentcdodds.com/blog/how-i-structure-express-apps) yang berjudul ***How I structure Express apps***. Namun dengan tambahan Linter ESLint dan Formatter dengan Prettier.

Github sumber dari Kent C Dodds adalah disini [https://github.com/kentcdodds/express-app-example](https://github.com/kentcdodds/express-app-example).

## Penggunaan

Pastikan di komputer anda telah terpasang Node JS versi 12.18.2 atau yang lebih baru. Clone atau download project ini dengan menggunakan Git. Kemudian jalankan : 

- Perintah ```npm install``` .
- Untuk menjalankan proses debug atau development, jalankan perintah ```npm run debug```. Di dalam folder ```/src/index.js``` terdapat fungsi melakukan Clustering proses Node JS. Non aktifkan atau berikan comment // pada fungsi clustering tersebut, jika proses Clustering membuat perangkat dan proses development terasa berat, atau tidak dibutuhkan.
- Untuk proses ***Production*** ,  jalankan perintah ```npm run build``` . Hasil dari build akan menghasilkan folder ``/dist``` .
- Untuk menguji hasil build di folder ```/dist/``` , jalankan perintah ```npm run start``` .
- Jika ingin deploy ke server, gunakan hasil build di folder ```/dist``` tersebut.

## Persyaratan Opsional Lainnya

Pastikan plugin ESLint dan Prettier telah terpasang di VS Code. Kemudian tambahkan konfigurasi ini di dalam file ```settings.json``` di setelan milik VS Code. File konfigurasi dapat diakses dengan menu File > Preferences > Settings. Kemudian klik tanda tombol di pojok kanan atas yang bertuliskan Open Settings (JSON).

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
