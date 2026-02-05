# 🔐 Fitur Login & Register - SMK Task Manager

## ✅ Status Implementasi

Fitur login dan register telah **sepenuhnya terintegrasi** dengan database dan siap digunakan!

## 📋 Fitur yang Sudah Diimplementasikan

### 1. **Halaman Login** (`/login`)
- ✅ Form login dengan email dan password
- ✅ Styling disesuaikan dengan desain StaggeredMenu (minimalist, bold, high-contrast)
- ✅ Validasi input
- ✅ Error handling dengan pesan yang jelas
- ✅ Loading state saat proses login
- ✅ Redirect otomatis ke dashboard (`/`) setelah login berhasil
- ✅ Link ke halaman register

### 2. **Halaman Register** (`/register`)
- ✅ Form registrasi dengan nama, email, dan password
- ✅ Styling disesuaikan dengan desain StaggeredMenu
- ✅ Validasi input (minimal 6 karakter untuk password)
- ✅ Error handling
- ✅ Loading state saat proses registrasi
- ✅ Auto-generate avatar menggunakan DiceBear API
- ✅ Redirect ke halaman login setelah registrasi berhasil
- ✅ Link ke halaman login

### 3. **API Routes**

#### `/api/auth/login` (POST)
- Memvalidasi email dan password
- Mencari user di database
- Verifikasi password dengan bcrypt
- Generate JWT token
- Set HTTP-only cookie untuk keamanan
- Return user data

#### `/api/auth/register` (POST)
- Validasi input (nama, email, password)
- Cek duplikasi email
- Hash password dengan bcrypt (10 salt rounds)
- Buat user baru di database
- Auto-create profile dengan avatar

#### `/api/auth/logout` (POST)
- Hapus auth token dari cookie
- Return success message

### 4. **Middleware Protection**
- ✅ Proteksi semua halaman (kecuali `/login` dan `/register`)
- ✅ Redirect ke `/login` jika belum login
- ✅ Redirect ke dashboard (`/`) jika sudah login dan coba akses `/login` atau `/register`
- ✅ Verifikasi token menggunakan Edge Runtime (jose)

### 5. **User Profile Component**
- ✅ Avatar dengan gradient effect
- ✅ Dropdown menu dengan blur effect
- ✅ Menu: Profil Saya, Pengaturan
- ✅ **Fungsi Logout yang terintegrasi**
- ✅ Animasi smooth

## 🎨 Design System

Semua halaman login/register mengikuti design system yang sama dengan StaggeredMenu:

- **Typography**: Bold, uppercase, tight tracking
- **Colors**: Black/White dengan dark mode support
- **Borders**: Thick (2px) untuk emphasis
- **Animations**: Smooth transitions dan hover effects
- **Spacing**: Generous padding untuk breathing room
- **Inputs**: Large, bold dengan focus states yang jelas

## 🔒 Keamanan

1. **Password Hashing**: Bcrypt dengan 10 salt rounds
2. **JWT Token**: 7 hari expiration
3. **HTTP-Only Cookies**: Mencegah XSS attacks
4. **Secure Cookie**: Di production mode
5. **SameSite Strict**: CSRF protection
6. **Edge Runtime**: Verifikasi token di middleware

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  role         String   @default("USER")
  createdAt    DateTime @default(now())
  profile      Profile?
  tasks        Task[]
  schedules    Schedule[]
}
```

### Profile Model
```prisma
model Profile {
  id        String  @id @default(cuid())
  userId    String  @unique
  name      String
  avatarUrl String?
  user      User    @relation(fields: [userId], references: [id])
}
```

## 🚀 Cara Menggunakan

### 1. Registrasi User Baru
```
1. Buka http://localhost:3000/register
2. Isi nama lengkap, email, dan password (min 6 karakter)
3. Klik "Daftar Akun"
4. Otomatis redirect ke /login
```

### 2. Login
```
1. Buka http://localhost:3000/login
2. Masukkan email dan password
3. Klik "Masuk Sekarang"
4. Otomatis redirect ke dashboard (/)
```

### 3. Logout
```
1. Klik avatar profil di header (kanan atas)
2. Klik "Keluar" di dropdown menu
3. Otomatis redirect ke /login
```

## 📁 Struktur File

```
app/
├── login/
│   └── page.tsx              # Halaman login
├── register/
│   └── page.tsx              # Halaman register
└── api/
    └── auth/
        ├── login/
        │   └── route.ts      # API login
        ├── register/
        │   └── route.ts      # API register
        └── logout/
            └── route.ts      # API logout

components/
└── UserProfile.tsx           # Component profil user (dengan logout)

lib/
├── auth.ts                   # Helper functions (hash, verify, token)
└── prisma.ts                 # Prisma client

middleware.ts                 # Route protection
```

## 🔄 Flow Aplikasi

### Login Flow
```
User → /login → Submit Form → API /api/auth/login 
→ Verify Password → Generate Token → Set Cookie 
→ Redirect to Dashboard (/)
```

### Register Flow
```
User → /register → Submit Form → API /api/auth/register 
→ Hash Password → Create User & Profile → Generate Avatar 
→ Redirect to /login
```

### Logout Flow
```
User → Click Logout → API /api/auth/logout 
→ Delete Cookie → Redirect to /login
```

### Middleware Flow
```
Request → Middleware → Check Token
├─ Valid Token + Auth Page → Redirect to /
├─ Invalid Token + Protected Page → Redirect to /login
└─ Valid/Invalid + Allowed Page → Continue
```

## 🧪 Testing

### Test Register
1. Buka `/register`
2. Coba register dengan email yang sama 2x (harus error)
3. Coba password < 6 karakter (harus error)
4. Register berhasil → cek database (User & Profile harus tercreate)

### Test Login
1. Buka `/login`
2. Coba email/password salah (harus error "Invalid credentials")
3. Login berhasil → redirect ke dashboard
4. Cookie `auth_token` harus tersimpan (cek DevTools)

### Test Middleware
1. Login dulu
2. Coba akses `/login` atau `/register` (harus redirect ke `/`)
3. Logout
4. Coba akses `/tasks` atau page lain (harus redirect ke `/login`)

### Test Logout
1. Login dulu
2. Klik avatar → Logout
3. Cookie `auth_token` harus terhapus
4. Redirect ke `/login`

## 🐛 Troubleshooting

### Error: "User already exists"
- Email sudah terdaftar, gunakan email lain atau login

### Error: "Invalid credentials"
- Email atau password salah, cek kembali

### Error: "Password must be at least 6 characters"
- Password terlalu pendek, minimal 6 karakter

### Tidak bisa akses halaman tertentu
- Pastikan sudah login
- Cek cookie `auth_token` di DevTools
- Coba logout dan login lagi

### Development Server Error
Jika `npm run dev` tidak bisa jalan karena PowerShell execution policy:
```powershell
# Run as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Atau gunakan:
```powershell
npx next dev
```

## 📝 Next Steps (Opsional)

Fitur tambahan yang bisa ditambahkan:

1. **Forgot Password** - Reset password via email
2. **Email Verification** - Verify email saat register
3. **Social Login** - Google/Facebook login
4. **2FA** - Two-factor authentication
5. **Session Management** - Multiple sessions tracking
6. **Password Strength Meter** - Visual indicator
7. **Remember Me** - Extended session
8. **User Profile Edit** - Update nama, avatar, dll

## 🎉 Kesimpulan

Fitur login dan register sudah **100% selesai** dan **terintegrasi** dengan:
- ✅ Database (Prisma + PostgreSQL/MySQL/SQLite)
- ✅ API Routes (Next.js App Router)
- ✅ Middleware (Route Protection)
- ✅ UI/UX (Matching StaggeredMenu design)
- ✅ Security (Bcrypt + JWT + Cookies)

**Anda sekarang bisa:**
1. Register user baru
2. Login dengan credentials
3. Akses dashboard (protected)
4. Logout dengan aman

Semua sudah siap untuk digunakan! 🚀
