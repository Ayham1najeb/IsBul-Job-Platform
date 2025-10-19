<?php
/**
 * Script لإنشاء Super Admin مع كلمة مرور مشفرة
 */

require_once '../api/config/database.php';

$database = new Database();
$db = $database->getConnection();

// معلومات Super Admin
$email = 'ayhamoy2@gmail.com';
$password = 'ABCabc123321#';
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// حذف Super Admin القديم إن وجد
$delete_query = "DELETE FROM kullanicilar WHERE email = :email";
$delete_stmt = $db->prepare($delete_query);
$delete_stmt->bindParam(':email', $email);
$delete_stmt->execute();

// إنشاء Super Admin جديد
$query = "INSERT INTO kullanicilar 
          (email, sifre, isim, soyisim, rol, aktif, email_verified, is_super_admin, admin_approved, rol_confirmed) 
          VALUES 
          (:email, :sifre, 'Super', 'Admin', 'admin', 1, 1, 1, 1, 1)";

$stmt = $db->prepare($query);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':sifre', $hashed_password);

if ($stmt->execute()) {
    echo "✅ Super Admin oluşturuldu!\n";
    echo "📧 Email: $email\n";
    echo "🔑 Şifre: $password\n";
    echo "🆔 ID: " . $db->lastInsertId() . "\n";
} else {
    echo "❌ Hata oluştu!\n";
}
