<?php
/**
 * Super Admin Kurulum Script
 * Sadece bir kez çalıştırılmalı
 */

require_once __DIR__ . '/../config/database.php';

$database = new Database();
$db = $database->getConnection();

try {
    // is_super_admin sütununu ekle
    $query = "ALTER TABLE kullanicilar 
              ADD COLUMN IF NOT EXISTS is_super_admin BOOLEAN DEFAULT FALSE AFTER email_verified";
    $db->exec($query);
    echo "✅ is_super_admin sütunu eklendi\n";
    
    // Super Admin şifresini hash'le
    $email = 'ayhamoy2@gmail.com';
    $password = 'ABCabc123321#';
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    
    // Super Admin'in var olup olmadığını kontrol et
    $query = "SELECT id FROM kullanicilar WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($existingUser) {
        // Mevcut kullanıcıyı güncelle
        $query = "UPDATE kullanicilar 
                  SET rol = 'admin', 
                      is_super_admin = TRUE, 
                      email_verified = TRUE,
                      sifre = :sifre
                  WHERE email = :email";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':sifre', $hashedPassword);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        echo "✅ Mevcut kullanıcı Super Admin olarak güncellendi\n";
    } else {
        // Yeni Super Admin ekle
        $query = "INSERT INTO kullanicilar (
                    isim, soyisim, email, sifre, rol, email_verified, is_super_admin
                  ) VALUES (
                    'Super', 'Admin', :email, :sifre, 'admin', TRUE, TRUE
                  )";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':sifre', $hashedPassword);
        $stmt->execute();
        echo "✅ Super Admin başarıyla oluşturuldu\n";
    }
    
    echo "\n📧 Email: $email\n";
    echo "🔑 Şifre: $password\n";
    echo "\n⚠️  Bu bilgileri güvenli bir yerde saklayın!\n";
    
} catch (Exception $e) {
    echo "❌ Hata: " . $e->getMessage() . "\n";
}
?>
