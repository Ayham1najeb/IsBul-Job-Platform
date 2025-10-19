<?php
/**
 * Email Service
 * خدمة إرسال البريد الإلكتروني باستخدام PHPMailer
 */

// Composer autoloader'ı yükle
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class EmailService {
    private $mailer;
    
    public function __construct() {
        $this->mailer = new PHPMailer(true);
        
        try {
            // SMTP ayarları
            $this->mailer->isSMTP();
            $this->mailer->Host = 'smtp.gmail.com';
            $this->mailer->SMTPAuth = true;
            $this->mailer->Username = 'ayhamoy2@gmail.com';
            $this->mailer->Password = 'empz jcwh nqjj imxw'; // App Password
            $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $this->mailer->Port = 587;
            $this->mailer->CharSet = 'UTF-8';
            
            // Gönderen
            $this->mailer->setFrom('ayhamoy2@gmail.com', 'IsBul Platform');
        } catch (Exception $e) {
            error_log("EmailService initialization error: " . $e->getMessage());
        }
    }
    
    /**
     * Doğrulama kodu gönder
     */
    public function sendVerificationCode($to, $name, $code) {
        try {
            $this->mailer->clearAddresses();
            $this->mailer->addAddress($to, $name);
            
            $this->mailer->isHTML(true);
            $this->mailer->Subject = 'IsBul - E-posta Doğrulama Kodu';
            
            $body = $this->getVerificationEmailTemplate($name, $code);
            $this->mailer->Body = $body;
            $this->mailer->AltBody = "Merhaba $name,\n\nDoğrulama kodunuz: $code\n\nBu kod 15 dakika geçerlidir.";
            
            $this->mailer->send();
            return ['success' => true, 'message' => 'E-posta gönderildi'];
        } catch (Exception $e) {
            error_log("Email send error: " . $this->mailer->ErrorInfo);
            return ['success' => false, 'message' => 'E-posta gönderilemedi: ' . $this->mailer->ErrorInfo];
        }
    }
    
    /**
     * E-posta şablonu
     */
    private function getVerificationEmailTemplate($name, $code) {
        return "
        <!DOCTYPE html>
        <html dir='ltr' lang='tr'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>E-posta Doğrulama</title>
        </head>
        <body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;'>
            <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #f4f4f4; padding: 20px;'>
                <tr>
                    <td align='center'>
                        <table width='600' cellpadding='0' cellspacing='0' style='background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);'>
                            <!-- Header -->
                            <tr>
                                <td style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;'>
                                    <h1 style='color: #ffffff; margin: 0; font-size: 28px;'>
                                        💼 IsBul Platform
                                    </h1>
                                    <p style='color: #ffffff; margin: 10px 0 0 0; font-size: 16px;'>
                                        E-posta Doğrulama
                                    </p>
                                </td>
                            </tr>
                            
                            <!-- Body -->
                            <tr>
                                <td style='padding: 40px 30px;'>
                                    <h2 style='color: #333333; margin: 0 0 20px 0; font-size: 24px;'>
                                        Merhaba $name! 👋
                                    </h2>
                                    
                                    <p style='color: #666666; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;'>
                                        IsBul platformuna hoş geldiniz! Hesabınızı aktifleştirmek için aşağıdaki doğrulama kodunu kullanın:
                                    </p>
                                    
                                    <!-- Verification Code -->
                                    <table width='100%' cellpadding='0' cellspacing='0' style='margin: 30px 0;'>
                                        <tr>
                                            <td align='center' style='background-color: #f8f9fa; padding: 30px; border-radius: 10px; border: 2px dashed #667eea;'>
                                                <div style='font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px; font-family: monospace;'>
                                                    $code
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <p style='color: #666666; line-height: 1.6; margin: 0 0 10px 0; font-size: 14px;'>
                                        ⏰ Bu kod <strong>15 dakika</strong> geçerlidir.
                                    </p>
                                    
                                    <p style='color: #666666; line-height: 1.6; margin: 0; font-size: 14px;'>
                                        🔒 Bu kodu kimseyle paylaşmayın.
                                    </p>
                                    
                                    <div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee;'>
                                        <p style='color: #999999; font-size: 12px; margin: 0; line-height: 1.5;'>
                                            Bu e-postayı siz talep etmediyseniz, lütfen görmezden gelin.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style='background-color: #f8f9fa; padding: 20px; text-align: center;'>
                                    <p style='color: #999999; font-size: 12px; margin: 0;'>
                                        © 2025 IsBul Platform. Tüm hakları saklıdır.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        ";
    }
    
    /**
     * Şifre sıfırlama kodu gönder
     */
    public function sendPasswordResetCode($to, $name, $code) {
        try {
            $this->mailer->clearAddresses();
            $this->mailer->addAddress($to, $name);
            
            $this->mailer->isHTML(true);
            $this->mailer->Subject = 'IsBul - Şifre Sıfırlama Kodu';
            
            $body = $this->getPasswordResetEmailTemplate($name, $code);
            $this->mailer->Body = $body;
            $this->mailer->AltBody = "Merhaba $name,\n\nŞifre sıfırlama kodunuz: $code\n\nBu kod 15 dakika geçerlidir.";
            
            $this->mailer->send();
            return ['success' => true, 'message' => 'E-posta gönderildi'];
        } catch (Exception $e) {
            error_log("Password reset email error: " . $this->mailer->ErrorInfo);
            return ['success' => false, 'message' => 'E-posta gönderilemedi: ' . $this->mailer->ErrorInfo];
        }
    }
    
    /**
     * Şifre sıfırlama e-posta şablonu
     */
    private function getPasswordResetEmailTemplate($name, $code) {
        return "
        <!DOCTYPE html>
        <html dir='ltr' lang='tr'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Şifre Sıfırlama</title>
        </head>
        <body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;'>
            <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #f4f4f4; padding: 20px;'>
                <tr>
                    <td align='center'>
                        <table width='600' cellpadding='0' cellspacing='0' style='background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);'>
                            <!-- Header -->
                            <tr>
                                <td style='background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 20px; text-align: center;'>
                                    <h1 style='color: #ffffff; margin: 0; font-size: 28px;'>
                                        🔐 IsBul Platform
                                    </h1>
                                    <p style='color: #ffffff; margin: 10px 0 0 0; font-size: 16px;'>
                                        Şifre Sıfırlama
                                    </p>
                                </td>
                            </tr>
                            
                            <!-- Body -->
                            <tr>
                                <td style='padding: 40px 30px;'>
                                    <h2 style='color: #333333; margin: 0 0 20px 0; font-size: 24px;'>
                                        Merhaba $name! 👋
                                    </h2>
                                    
                                    <p style='color: #666666; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;'>
                                        Şifrenizi sıfırlamak için bir talepte bulundunuz. Aşağıdaki kodu kullanarak yeni şifrenizi oluşturabilirsiniz:
                                    </p>
                                    
                                    <!-- Reset Code -->
                                    <table width='100%' cellpadding='0' cellspacing='0' style='margin: 30px 0;'>
                                        <tr>
                                            <td align='center' style='background-color: #fff5f5; padding: 30px; border-radius: 10px; border: 2px dashed #f5576c;'>
                                                <div style='font-size: 36px; font-weight: bold; color: #f5576c; letter-spacing: 8px; font-family: monospace;'>
                                                    $code
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <p style='color: #666666; line-height: 1.6; margin: 0 0 10px 0; font-size: 14px;'>
                                        ⏰ Bu kod <strong>15 dakika</strong> geçerlidir.
                                    </p>
                                    
                                    <p style='color: #666666; line-height: 1.6; margin: 0 0 20px 0; font-size: 14px;'>
                                        🔒 Bu kodu kimseyle paylaşmayın.
                                    </p>
                                    
                                    <div style='background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 5px; margin: 20px 0;'>
                                        <p style='color: #856404; font-size: 14px; margin: 0; line-height: 1.5;'>
                                            ⚠️ <strong>Önemli:</strong> Bu talebi siz yapmadıysanız, bu e-postayı görmezden gelin. Şifreniz değiştirilmeyecektir.
                                        </p>
                                    </div>
                                    
                                    <div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee;'>
                                        <p style='color: #999999; font-size: 12px; margin: 0; line-height: 1.5;'>
                                            Güvenlik nedeniyle, şifrenizi düzenli olarak değiştirmenizi öneririz.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style='background-color: #f8f9fa; padding: 20px; text-align: center;'>
                                    <p style='color: #999999; font-size: 12px; margin: 0;'>
                                        © 2025 IsBul Platform. Tüm hakları saklıdır.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        ";
    }
    
    /**
     * Doğrulamadan sonra hoş geldin e-postası gönder
     */
    public function sendWelcomeEmail($to, $name) {
        try {
            $this->mailer->clearAddresses();
            $this->mailer->addAddress($to, $name);
            
            $this->mailer->isHTML(true);
            $this->mailer->Subject = 'IsBul - Hoş Geldiniz! 🎉';
            
            $body = "
            <!DOCTYPE html>
            <html>
            <body style='font-family: Arial, sans-serif; padding: 20px;'>
                <h2>Hoş Geldiniz $name! 🎉</h2>
                <p>Hesabınız başarıyla oluşturuldu.</p>
                <p>Artık IsBul platformunda iş arayabilir ve özgeçmişinizi oluşturabilirsiniz.</p>
                <p>İyi günler dileriz!</p>
                <p><strong>IsBul Ekibi</strong></p>
            </body>
            </html>
            ";
            
            $this->mailer->Body = $body;
            $this->mailer->send();
            return ['success' => true];
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
    
    /**
     * Admin doğrulama kodu gönder
     */
    public function sendAdminVerificationCode($to, $code, $tempPassword) {
        try {
            $this->mailer->clearAddresses();
            $this->mailer->addAddress($to);
            
            $this->mailer->isHTML(true);
            $this->mailer->Subject = 'IsBul - Admin Hesabı Doğrulama 🔐';
            
            $body = "
            <!DOCTYPE html>
            <html>
            <body style='font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;'>
                <div style='max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;'>
                    <h2 style='color: #333;'>Admin Hesabı Doğrulama 🔐</h2>
                    <p>Merhaba,</p>
                    <p>IsBul platformu için Admin hesabınız oluşturuldu. Hesabınızı aktifleştirmek için aşağıdaki doğrulama kodunu kullanın:</p>
                    
                    <div style='background-color: #f0f0f0; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0;'>
                        <h1 style='color: #4CAF50; font-size: 36px; letter-spacing: 5px; margin: 0;'>$code</h1>
                    </div>
                    
                    <p><strong>Geçici Şifreniz:</strong> <code style='background-color: #f0f0f0; padding: 5px 10px; border-radius: 3px;'>$tempPassword</code></p>
                    
                    <p style='color: #666; font-size: 14px;'>⏰ Bu kod 30 dakika geçerlidir.</p>
                    <p style='color: #666; font-size: 14px;'>🔒 İlk girişinizde şifrenizi değiştirmeniz önerilir.</p>
                    
                    <div style='background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;'>
                        <p style='color: #856404; margin: 0;'>⚠️ Bu kodu kimseyle paylaşmayın.</p>
                    </div>
                    
                    <p style='color: #999; font-size: 12px; margin-top: 30px;'>© 2025 IsBul Platform</p>
                </div>
            </body>
            </html>
            ";
            
            $this->mailer->Body = $body;
            $this->mailer->send();
            return ['success' => true];
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
}
?>
