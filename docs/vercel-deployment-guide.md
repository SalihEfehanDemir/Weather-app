# Vercel Deployment Gereksinimleri - HavaPro

Bu belge, HavaPro uygulamasının Vercel'e dağıtımı için gereksinimleri ve karşılaşılan sorunları içerir.

## Ortam Değişkenleri

Vercel'de aşağıdaki ortam değişkenlerinin eklenmesi **zorunludur**:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase projenizin URL'i
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase projenizin anonim anahtarı
- `OPENWEATHER_API_KEY`: OpenWeather API anahtarı (API istekleri için gerekli)

Bu değişkenler iki şekilde eklenebilir:

1. **Vercel Web Arayüzü**: Settings > Environment Variables bölümünden
2. **Vercel CLI**: `vercel env add [DEĞIŞKEN_ADI]` komutu ile

## vercel.json Konfigürasyonu

Proje kök dizininde bir `vercel.json` dosyası oluşturun:

```json
{
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "https://your-supabase-url.supabase.co",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "your-anon-key"
  },
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

## Karşılaşılan Sorunlar ve Çözümleri

### 1. Supabase URL Hatası

Hata mesajı: `supabaseUrl is required`

Çözüm: Ortam değişkenlerini doğru şekilde yapılandırın. Web arayüzünden veya CLI aracılığıyla ekleyin.

### 2. TypeScript Hataları

TypeScript hatalarını gidermek için `tsconfig.json` dosyasında aşağıdaki ayarları yapın:

```json
{
  "compilerOptions": {
    "strict": false,
    "strictNullChecks": true
  }
}
```

### 3. SWC Bağımlılık Uyarısı

Uyarı: `Found lockfile missing swc dependencies`

Çözüm: Deployment öncesi `npm install` komutunu çalıştırarak Next.js SWC bağımlılıklarının yüklü olduğundan emin olun.

## Deployment Adımları

1. Vercel CLI kurulumu:
   ```
   npm install -g vercel
   ```

2. Projeye giriş yapın:
   ```
   vercel login
   ```

3. Ortam değişkenlerini ekleyin (Web arayüzü önerilir)

4. Production deployment başlatın:
   ```
   vercel --prod
   ```

## Önemli Notlar

- `vercel.json` dosyasındaki değişkenlere rağmen, web arayüzünden ortam değişkenlerini eklemek daha güvenilir bir yöntemdir.
- TypeScript hatalarını gidermek için `tsconfig.json` dosyasında `"strict": false` ayarını yapın.
- Next.js 14+ sürümlerinde SWC bağımlılıkları için `npm install` komutu ile bağımlılıkları güncelleyin. 