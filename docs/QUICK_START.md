# 🚀 Quick Start - Login & Register

## Langkah Cepat untuk Menggunakan Fitur Login & Register

### 1️⃣ Setup Database (Jika Belum)

```bash
# Generate Prisma Client
npx prisma generate

# Run Migration
npx prisma db push

# (Opsional) Buka Prisma Studio untuk lihat database
npx prisma studio
```

### 2️⃣ Jalankan Development Server

**Cara 1 (Jika npm bisa jalan):**
```bash
npm run dev
```

**Cara 2 (Jika ada masalah PowerShell):**
```bash
npx next dev
```

**Cara 3 (Fix PowerShell execution policy):**
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Lalu jalankan
npm run dev
```

### 3️⃣ Buka Browser

Server akan berjalan di: `http://localhost:3000`

### 4️⃣ Test Fitur

#### A. Register User Baru
1. Buka `http://localhost:3000/register`
2. Isi form:
   - **Nama**: Nama lengkap Anda
   - **Email**: email@example.com
   - **Password**: minimal 6 karakter
3. Klik **"Daftar Akun"**
4. Anda akan diarahkan ke halaman login

#### B. Login
1. Buka `http://localhost:3000/login` (atau akan otomatis redirect)
2. Masukkan email dan password yang tadi didaftarkan
3. Klik **"Masuk Sekarang"**
4. Anda akan masuk ke **Dashboard** 🎉

#### C. Akses Dashboard (Protected)
- Setelah login, Anda otomatis masuk ke dashboard
- Semua halaman lain juga terproteksi (tasks, schedule, dll)
- Jika belum login, akan otomatis redirect ke `/login`

#### D. Logout
1. Klik **avatar profil** di kanan atas header
2. Dropdown menu akan muncul
3. Klik **"Keluar"**
4. Anda akan diarahkan kembali ke halaman login

## 🎯 URL Routes

| URL | Deskripsi | Status |
|-----|-----------|--------|
| `/login` | Halaman login | Public |
| `/register` | Halaman registrasi | Public |
| `/` | Dashboard (home) | Protected |
| `/tasks` | Halaman tugas | Protected |
| `/schedule` | Halaman jadwal | Protected |
| `/profile` | Profil user | Protected |
| `/settings` | Pengaturan | Protected |

## 🔐 Environment Variables (Opsional)

Buat file `.env` di root project:

```env
# Database URL (sesuaikan dengan database Anda)
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
# atau
DATABASE_URL="mysql://user:password@localhost:3306/mydb"
# atau
DATABASE_URL="file:./dev.db"

# JWT Secret (ganti dengan secret Anda)
JWT_SECRET="your-super-secret-key-change-this-in-production"

# Node Environment
NODE_ENV="development"
```

## ✅ Checklist Testing

- [ ] Register user baru berhasil
- [ ] Login dengan credentials yang benar berhasil
- [ ] Login dengan credentials yang salah menampilkan error
- [ ] Setelah login, bisa akses dashboard
- [ ] Setelah login, tidak bisa akses `/login` atau `/register` (auto redirect)
- [ ] Tanpa login, tidak bisa akses halaman protected (auto redirect to `/login`)
- [ ] Logout berhasil dan redirect ke `/login`
- [ ] Setelah logout, tidak bisa akses halaman protected

## 🎨 Tampilan

Semua halaman menggunakan design system yang sama:
- **Bold typography** dengan tracking yang ketat
- **High contrast** (Black/White)
- **Dark mode support** otomatis
- **Smooth animations** pada hover dan transitions
- **Thick borders** (2px) untuk emphasis
- **Glassmorphism** effects pada beberapa komponen

## 📸 Screenshot Expected

### Login Page
- Logo SMK di tengah atas
- Title "MASUK" bold uppercase
- Subtitle "Task Manager Siswa"
- Form email & password
- Button "Masuk Sekarang"
- Link "Belum punya akun? Daftar Disini"

### Register Page
- Logo SMK di tengah atas
- Title "DAFTAR" bold uppercase
- Subtitle "Buat Akun Baru"
- Form nama, email & password
- Button "Daftar Akun"
- Link "Sudah punya akun? Masuk Disini"

### Dashboard (After Login)
- Header dengan logo, StaggeredMenu, UserProfile
- Stats cards (Total Tugas, Selesai, Tertunda, Progress)
- Tugas Hari Ini
- Jadwal

## 🐛 Common Issues

### 1. PowerShell Script Execution Error
**Problem**: `npm : File D:\Node js\npm.ps1 cannot be loaded`

**Solution**:
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Database Connection Error
**Problem**: Cannot connect to database

**Solution**:
- Pastikan database server running
- Cek `DATABASE_URL` di `.env`
- Jalankan `npx prisma db push`

### 3. Module Not Found
**Problem**: Cannot find module

**Solution**:
```bash
# Install dependencies
npm install

# Clear cache
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install
```

### 4. Port Already in Use
**Problem**: Port 3000 already in use

**Solution**:
```bash
# Run on different port
npx next dev -p 3001
```

## 📞 Support

Jika ada masalah:
1. Cek dokumentasi lengkap di `docs/FITUR_LOGIN.md`
2. Cek log error di console/terminal
3. Cek browser DevTools → Network tab
4. Cek Prisma Studio untuk database

---

**Happy Coding! 🎉**
