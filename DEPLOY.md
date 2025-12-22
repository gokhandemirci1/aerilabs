# Vercel Deploy Rehberi

## 🚀 Hızlı Deploy Adımları

### 1. GitHub'a Push Etme

```bash
# Git repository'yi başlat (eğer yapılmadıysa)
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit - Aeri Labs website"

# GitHub'da yeni bir repository oluştur, sonra:
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
git branch -M main
git push -u origin main
```

### 2. Vercel'e Deploy Etme

#### Yöntem 1: Vercel Dashboard (Önerilen)

1. [Vercel.com](https://vercel.com) adresine git ve hesap oluştur/giriş yap
2. "Add New Project" butonuna tıkla
3. GitHub repository'ni seç veya import et
4. Vercel otomatik olarak Next.js projesini algılayacak
5. **Build Settings:**
   - Framework Preset: **Next.js** (otomatik algılanır)
   - Build Command: `npm run build` (otomatik)
   - Output Directory: `.next` (otomatik)
   - Install Command: `npm install` (otomatik)
6. "Deploy" butonuna tıkla

#### Yöntem 2: Vercel CLI

```bash
# Vercel CLI'yi global olarak yükle
npm i -g vercel

# Proje klasöründe
vercel

# İlk deploy için soruları yanıtla:
# - Set up and deploy? Yes
# - Which scope? Kendi hesabını seç
# - Link to existing project? No
# - Project name? aeri-labs (veya istediğin isim)
# - Directory? ./
# - Override settings? No
```

### 3. Environment Variables (Gerekirse)

Eğer environment variable'lar kullanıyorsan:
- Vercel Dashboard → Project → Settings → Environment Variables
- Production, Preview, Development için değerleri ekle

### 4. Custom Domain (Opsiyonel)

1. Vercel Dashboard → Project → Settings → Domains
2. Domain ekle ve DNS ayarlarını yap

## 📋 Önemli Notlar

### Logo Dosyası
Logo dosyası `app/images/logo.jpg` konumunda. Next.js Image component ile import ediliyor, bu yüzden çalışacak. Ancak daha iyi performans için `public/images/logo.jpg` konumuna taşıyabilirsin:

```bash
# Public klasörü oluştur (yoksa)
mkdir public
mkdir public/images

# Logoyu kopyala
cp app/images/logo.jpg public/images/logo.jpg
```

Sonra component'lerdeki import'ları güncelle:
```typescript
// Eski
import logoImage from "@/app/images/logo.jpg";

// Yeni
import logoImage from "/images/logo.jpg";
```

### Build Kontrolü

Deploy öncesi local'de build test et:

```bash
npm run build
npm start
```

Eğer hata varsa düzelt, sonra deploy et.

## 🔧 Vercel Ayarları

Proje otomatik olarak şu ayarlarla deploy edilecek:

- **Framework:** Next.js 14
- **Node Version:** 18.x (otomatik)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

## 📦 Package.json Scripts

Mevcut script'ler Vercel ile uyumlu:
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm start` - Production server
- `npm run lint` - Linting

## 🎯 Deploy Sonrası

1. Vercel otomatik olarak bir URL verecek: `https://proje-adi.vercel.app`
2. Her push'ta otomatik deploy yapılacak (GitHub entegrasyonu ile)
3. Preview deployments her PR için oluşturulacak

## 🐛 Sorun Giderme

### Build Hatası
- `npm run build` komutunu local'de çalıştır ve hataları kontrol et
- TypeScript hatalarını düzelt
- Missing dependency'leri ekle

### Image Hatası
- Logo dosyasının doğru konumda olduğundan emin ol
- Next.js Image component import'larını kontrol et

### Performance
- Vercel otomatik olarak optimizasyon yapar
- Image optimization aktif
- Static generation otomatik

## 📚 Daha Fazla Bilgi

- [Vercel Next.js Docs](https://vercel.com/docs/frameworks/nextjs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

