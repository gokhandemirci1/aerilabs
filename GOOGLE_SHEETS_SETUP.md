# Google Sheets Entegrasyonu Kurulum Rehberi

## 📋 Adım Adım Kurulum

### 1. Google Sheets Oluşturma

1. [Google Sheets](https://sheets.google.com) adresine git
2. Yeni bir spreadsheet oluştur
3. İlk satıra başlıkları ekle:
   ```
   A1: Name
   B1: Email
   C1: Message
   D1: Timestamp
   ```
4. Sayfayı adlandır (örn: "Contact Form Submissions")

### 2. Google Apps Script Kurulumu

1. Google Sheets'te **Extensions** > **Apps Script** menüsüne tıkla
2. Açılan editörde varsayılan kodu sil
3. `google-apps-script.js` dosyasındaki kodu yapıştır
4. **SHEET_ID** değişkenini güncelle:
   - Google Sheets URL'inden ID'yi kopyala
   - Örnek URL: `https://docs.google.com/spreadsheets/d/1ABC123xyz.../edit`
   - ID: `1ABC123xyz...` (d/ ile /edit arasındaki kısım)
5. **SHEET_NAME** değişkenini kontrol et (varsayılan: "Sheet1")

### 3. Script'i Deploy Etme

1. Apps Script editöründe **Deploy** > **New deployment** tıkla
2. **Select type** kısmında **Web app** seç
3. Ayarları yap:
   - **Description**: "Contact Form Handler"
   - **Execute as**: Me (your-email@gmail.com)
   - **Who has access**: Anyone
4. **Deploy** butonuna tıkla
5. İlk kez deploy ediyorsanız yetkilendirme isteyecek:
   - **Authorize access** tıkla
   - Google hesabını seç
   - **Advanced** > **Go to [Project Name] (unsafe)**
   - **Allow** tıkla
6. **Web app URL**'ini kopyala (örnek: `https://script.google.com/macros/s/AKfycby.../exec`)

### 4. Next.js Projesine Entegrasyon

1. `components/Contact.tsx` dosyasını güncelle
2. Web app URL'ini kullanarak form gönderimini yapılandır

## 🔧 Test Etme

1. Google Sheets'te formu gönder
2. Yeni bir satırın eklendiğini kontrol et
3. Verilerin doğru sütunlara kaydedildiğini doğrula

## 📝 Notlar

- Web app URL'i her deploy'ta değişebilir (yeni versiyon oluşturursanız)
- Script'i güncelledikten sonra **New version** oluşturup tekrar deploy et
- Güvenlik için CORS ayarlarını kontrol et
- Rate limiting için Google Apps Script kotalarını göz önünde bulundur

## 🐛 Sorun Giderme

**Hata: "Script function not found"**
- Fonksiyon adlarının doğru olduğundan emin ol (doPost, doGet)

**Hata: "Access denied"**
- Deploy ayarlarında "Who has access: Anyone" seçili olduğundan emin ol

**Veriler kaydedilmiyor**
- SHEET_ID ve SHEET_NAME'in doğru olduğunu kontrol et
- Google Sheets'in paylaşım ayarlarını kontrol et

