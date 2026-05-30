require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // Pastikan baris ini ada di bagian atas atau sebelum route

// 1. Import semua file rute (routes) dari foldernya
const webhookRoutes = require('./routes/webhook');
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');

// 2. Inisialisasi aplikasi Express (Wajib sebelum menggunakan 'app.use')
const app = express();
const PORT = process.env.PORT || 3000;

// 🛡️ PERLINDUNGAN CLOUDFLARE
// Beritahu Express untuk mempercayai header proxy dari Cloudflare
app.set('trust proxy', true);

// 3. Pasang Middleware Standar (Agar server bisa membaca data input)
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// 4. Daftarkan semua route (Sekarang aman karena 'app' sudah didefinisikan di atas)
app.use('/api/webhook', webhookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/shop', shopRoutes);

// 5. Rute Navigasi Halaman Web (Frontend)

// Kalau orang buka link utama, langsung lempar ke halaman login
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/qris', (req, res) => {

    res.sendFile(__dirname +'/qris.html');
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dasboard.html'));
});


// 6. Jalankan Server
app.listen(PORT, () => {
    console.log(`🚀 Server Toko Panel sudah mengudara di port ${PORT}`);
    console.log(`🔒 Cloudflare proxy trust diaktifkan.`);
});
