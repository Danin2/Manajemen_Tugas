# ✅ Testing Checklist - Login & Register Features

## Pre-Testing Setup

### 1. Environment Check
- [ ] Database server is running
- [ ] `.env` file exists with correct `DATABASE_URL`
- [ ] `JWT_SECRET` is set in `.env`
- [ ] Dependencies installed (`npm install`)
- [ ] Prisma Client generated (`npx prisma generate`)
- [ ] Database schema pushed (`npx prisma db push`)

### 2. Start Development Server
```bash
# Choose one method:
npm run dev
# OR
npx next dev
# OR (if PowerShell error)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
npm run dev
```

- [ ] Server running on `http://localhost:3000`
- [ ] No compilation errors
- [ ] Open browser DevTools (F12)

---

## 🧪 Test Suite 1: Registration

### Test 1.1: Successful Registration
**Steps:**
1. Go to `http://localhost:3000/register`
2. Fill form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Daftar Akun"

**Expected Results:**
- [ ] No error messages appear
- [ ] Loading state shows "Memproses..."
- [ ] Redirected to `/login` page
- [ ] Database has new user (check Prisma Studio: `npx prisma studio`)
- [ ] User has associated Profile with avatar URL

### Test 1.2: Duplicate Email
**Steps:**
1. Go to `/register`
2. Use same email as Test 1.1: `test@example.com`
3. Fill other fields
4. Submit

**Expected Results:**
- [ ] Error message: "User already exists"
- [ ] Form not cleared
- [ ] User stays on `/register` page
- [ ] No new user created in database

### Test 1.3: Password Too Short
**Steps:**
1. Go to `/register`
2. Fill form:
   - Name: `Short Pass User`
   - Email: `short@example.com`
   - Password: `12345` (5 characters)
3. Submit

**Expected Results:**
- [ ] Error: "Password must be at least 6 characters"
- [ ] No user created in database

### Test 1.4: Empty Fields
**Steps:**
1. Go to `/register`
2. Leave fields empty
3. Try to submit

**Expected Results:**
- [ ] Browser validation prevents submit
- [ ] "required" attribute works
- [ ] No API call made

### Test 1.5: Design & UX
- [ ] Logo displays correctly ("SMK" in box)
- [ ] Title "DAFTAR" is bold, uppercase
- [ ] Dark mode toggle works
- [ ] Form inputs have proper styling
- [ ] Focus states work (border changes on input focus)
- [ ] Button hover effects work
- [ ] "Masuk Disini" link works and goes to `/login`

---

## 🧪 Test Suite 2: Login

### Test 2.1: Successful Login
**Steps:**
1. Go to `http://localhost:3000/login`
2. Fill form:
   - Email: `test@example.com` (from Test 1.1)
   - Password: `password123`
3. Click "Masuk Sekarang"

**Expected Results:**
- [ ] Loading state shows "Memproses..."
- [ ] Redirected to `/` (dashboard)
- [ ] Cookie `auth_token` is set (check DevTools → Application → Cookies)
- [ ] Cookie is `HttpOnly`
- [ ] Cookie has correct domain and path
- [ ] Dashboard displays user data

### Test 2.2: Wrong Password
**Steps:**
1. Go to `/login`
2. Fill form:
   - Email: `test@example.com`
   - Password: `wrongpassword`
3. Submit

**Expected Results:**
- [ ] Error: "Invalid credentials"
- [ ] No redirect
- [ ] No cookie set
- [ ] User stays on `/login`

### Test 2.3: Non-existent Email
**Steps:**
1. Go to `/login`
2. Fill form:
   - Email: `nonexistent@example.com`
   - Password: `anything`
3. Submit

**Expected Results:**
- [ ] Error: "Invalid credentials"
- [ ] No cookie set
- [ ] User stays on `/login`

### Test 2.4: Empty Fields
**Steps:**
1. Go to `/login`
2. Leave fields empty
3. Try to submit

**Expected Results:**
- [ ] Browser validation prevents submit
- [ ] No API call made

### Test 2.5: Design & UX
- [ ] Logo displays correctly
- [ ] Title "MASUK" is bold, uppercase
- [ ] Subtitle "Task Manager Siswa"
- [ ] Dark mode works
- [ ] Input styling matches register page
- [ ] Focus effects work
- [ ] Button animations work
- [ ] "Daftar Disini" link goes to `/register`

---

## 🧪 Test Suite 3: Middleware & Route Protection

### Test 3.1: Access Protected Page (Logged Out)
**Steps:**
1. Make sure you're logged out (clear cookies or use incognito)
2. Try to access:
   - `http://localhost:3000/` (dashboard)
   - `http://localhost:3000/tasks`
   - `http://localhost:3000/schedule`
   - `http://localhost:3000/profile`

**Expected Results:**
- [ ] All pages redirect to `/login`
- [ ] URL changes to `/login`
- [ ] No protected content shown

### Test 3.2: Access Auth Pages (Logged In)
**Steps:**
1. Make sure you're logged in (do Test 2.1)
2. Try to access:
   - `http://localhost:3000/login`
   - `http://localhost:3000/register`

**Expected Results:**
- [ ] Both redirect to `/` (dashboard)
- [ ] Cannot access login/register while authenticated

### Test 3.3: Access Protected Pages (Logged In)
**Steps:**
1. Make sure you're logged in
2. Access protected pages:
   - `/` (dashboard)
   - `/tasks`
   - `/schedule`
   - `/profile`
   - `/settings`

**Expected Results:**
- [ ] All pages accessible
- [ ] No redirects
- [ ] Content loads properly

### Test 3.4: Token Expiration (Advanced)
**Steps:**
1. Login
2. Manually edit cookie expiration in DevTools to past date
3. Try to access protected page

**Expected Results:**
- [ ] Redirected to `/login`
- [ ] Invalid token detected

---

## 🧪 Test Suite 4: Logout

### Test 4.1: Successful Logout
**Steps:**
1. Make sure you're logged in
2. Go to any page (e.g., dashboard)
3. Click avatar in top-right corner
4. Hover to open dropdown
5. Click "Keluar"

**Expected Results:**
- [ ] Redirected to `/login`
- [ ] Cookie `auth_token` deleted (check DevTools)
- [ ] Cannot access protected pages anymore
- [ ] Must login again to access dashboard

### Test 4.2: Logout from Different Pages
**Steps:**
1. Login
2. Try logout from:
   - Dashboard (`/`)
   - Tasks page (`/tasks`)
   - Schedule page (`/schedule`)
   - Profile page (`/profile`)

**Expected Results:**
- [ ] Logout works from all pages
- [ ] Always redirects to `/login`
- [ ] Cookie always deleted

---

## 🧪 Test Suite 5: UserProfile Component

### Test 5.1: Dropdown Display
**Steps:**
1. Login
2. Hover over avatar (top-right)

**Expected Results:**
- [ ] Dropdown appears smoothly
- [ ] Shows user info:
  - Name: "Siswa SMK"
  - Email: "siswa@smk.sch.id"
- [ ] Menu items visible:
  - "Profil Saya" with User icon
  - "Pengaturan" with Settings icon
  - "Keluar" with LogOut icon (red)
- [ ] Glow effect on avatar
- [ ] Blur backdrop on dropdown

### Test 5.2: Navigation Links
**Steps:**
1. Login
2. Open UserProfile dropdown
3. Click "Profil Saya"

**Expected Results:**
- [ ] Redirects to `/profile`

**Repeat for:**
- [ ] "Pengaturan" → `/settings`

### Test 5.3: Hover Effects
- [ ] Avatar has glow on hover
- [ ] Dropdown items change color on hover
- [ ] "Keluar" button has red background on hover

---

## 🧪 Test Suite 6: Dark Mode

### Test 6.1: Dark Mode Toggle on Login/Register
**Steps:**
1. Go to `/login` or `/register`
2. Toggle dark mode (if DarkModeToggle is present)

**Expected Results:**
- [ ] Background changes: white → black
- [ ] Text changes: black → white
- [ ] Logo inverts colors
- [ ] Input borders adapt
- [ ] Button colors invert

### Test 6.2: Dark Mode Persistence
**Steps:**
1. Enable dark mode
2. Navigate to different pages
3. Refresh page

**Expected Results:**
- [ ] Dark mode persists across pages
- [ ] Dark mode persists after refresh
- [ ] Saved in localStorage (check DevTools)

---

## 🧪 Test Suite 7: Mobile Responsiveness

### Test 7.1: Login/Register on Mobile
**Steps:**
1. Open DevTools → Toggle device toolbar (Ctrl+Shift+M)
2. Select mobile device (e.g., iPhone 12)
3. Go to `/login` and `/register`

**Expected Results:**
- [ ] Form fits screen
- [ ] No horizontal scroll
- [ ] Inputs are tappable
- [ ] Text is readable
- [ ] Button is full-width
- [ ] Logo size appropriate

### Test 7.2: Dashboard on Mobile
**Steps:**
1. Login on mobile view
2. Check dashboard

**Expected Results:**
- [ ] Stats cards stack vertically
- [ ] StaggeredMenu works (burger icon)
- [ ] UserProfile accessible
- [ ] Content readable

---

## 🧪 Test Suite 8: Database Validation

### Test 8.1: Check User Creation
**Steps:**
1. After successful registration (Test 1.1)
2. Open Prisma Studio: `npx prisma studio`
3. Navigate to `User` table

**Expected Results:**
- [ ] New user exists
- [ ] `id` is unique (cuid)
- [ ] `email` matches input
- [ ] `passwordHash` is bcrypt hash (starts with `$2b$`)
- [ ] `role` is "USER"
- [ ] `createdAt` is timestamp

### Test 8.2: Check Profile Creation
**Steps:**
1. In Prisma Studio
2. Navigate to `Profile` table

**Expected Results:**
- [ ] Profile exists for the user
- [ ] `userId` matches User's `id`
- [ ] `name` matches input
- [ ] `avatarUrl` is DiceBear URL

### Test 8.3: Password Hashing
**Steps:**
1. Register with password: `mypassword`
2. Check `passwordHash` in database

**Expected Results:**
- [ ] Hash does NOT equal `mypassword`
- [ ] Hash is bcrypt format
- [ ] Length ≈ 60 characters

---

## 🧪 Test Suite 9: Security

### Test 9.1: Cookie Security
**Steps:**
1. Login
2. Open DevTools → Application → Cookies
3. Find `auth_token`

**Expected Results:**
- [ ] `HttpOnly` = ✓
- [ ] `Secure` = ✓ (in production) or ✗ (in dev)
- [ ] `SameSite` = Strict
- [ ] Domain = localhost
- [ ] Path = /
- [ ] Expires = ~7 days from now

### Test 9.2: XSS Protection
**Steps:**
1. Try to access cookie via browser console:
```javascript
document.cookie
```

**Expected Results:**
- [ ] `auth_token` NOT visible in `document.cookie`
- [ ] HttpOnly protection works

### Test 9.3: SQL Injection (Prisma)
**Steps:**
1. Try login with:
   - Email: `' OR 1=1--`
   - Password: `anything`

**Expected Results:**
- [ ] Error: "Invalid credentials"
- [ ] Prisma protects against SQL injection
- [ ] No user logged in

### Test 9.4: Password Strength
**Try registering with weak passwords:**
- [ ] `12345` → Error (too short)
- [ ] `      ` (spaces) → Error (invalid)

---

## 🧪 Test Suite 10: Error Handling

### Test 10.1: Network Error Simulation
**Steps:**
1. Open DevTools → Network tab
2. Set throttling to "Offline"
3. Try to login/register

**Expected Results:**
- [ ] Error message shown
- [ ] User informed of issue
- [ ] Loading state ends
- [ ] No app crash

### Test 10.2: API Error
**Steps:**
1. Temporarily break API (e.g., stop database)
2. Try to login

**Expected Results:**
- [ ] Error message shown
- [ ] App doesn't crash
- [ ] User can retry

---

## 📊 Test Results Summary

| Test Suite | Total Tests | Passed | Failed | Notes |
|------------|-------------|--------|--------|-------|
| 1. Registration | 5 | | | |
| 2. Login | 5 | | | |
| 3. Middleware | 4 | | | |
| 4. Logout | 2 | | | |
| 5. UserProfile | 3 | | | |
| 6. Dark Mode | 2 | | | |
| 7. Mobile | 2 | | | |
| 8. Database | 3 | | | |
| 9. Security | 4 | | | |
| 10. Error Handling | 2 | | | |
| **TOTAL** | **32** | | | |

---

## ✅ Final Checklist

Before marking as "COMPLETE":

- [ ] All test suites passed
- [ ] No console errors
- [ ] No compilation warnings
- [ ] Database working correctly
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] Security checks passed
- [ ] Documentation complete

---

**Happy Testing! 🧪**

*Last updated: 2026-02-04*
