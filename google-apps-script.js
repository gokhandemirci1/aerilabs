/**
 * Google Apps Script - Contact Form Handler
 * 
 * Bu script, web formundan gelen iletişim formu verilerini Google Sheets'e kaydeder.
 * 
 * KURULUM:
 * 1. Google Sheets'te yeni bir sayfa oluştur
 * 2. İlk satıra başlıkları ekle: Name | Email | Message | Timestamp
 * 3. Google Apps Script editörünü aç (Extensions > Apps Script)
 * 4. Bu kodu yapıştır
 * 5. Deploy > New deployment > Web app olarak deploy et
 * 6. Execute as: Me, Who has access: Anyone
 * 7. Web app URL'ini kopyala ve Contact.tsx'te kullan
 */

// Google Sheets ID'ni buraya yapıştır
const SHEET_ID = 'BURAYA_SHEET_ID_YAPIŞTIR';
const SHEET_NAME = 'Sheet1'; // Veya kendi sayfa adınız

/**
 * POST isteği ile form verilerini alır ve Sheets'e kaydeder
 */
function doPost(e) {
  try {
    // JSON verisini parse et
    const data = JSON.parse(e.postData.contents);
    
    // Google Sheets'i aç
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Veriyi hazırla
    const timestamp = new Date();
    const rowData = [
      data.name || '',
      data.email || '',
      data.phone || '',
      data.message || '',
      timestamp
    ];
    
    // Yeni satıra ekle
    sheet.appendRow(rowData);
    
    // Başarılı yanıt döndür
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Form başarıyla gönderildi!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Hata durumunda
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Bir hata oluştu: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET isteği için test fonksiyonu
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'OK',
      message: 'Google Apps Script çalışıyor!'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

