@echo off
chcp 65001 >nul
color 0A
title İş Bul - Otomatik Kurulum

:: ============================================
:: İş Bul Platform - Otomatik Kurulum Scripti
:: ============================================

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║              İŞ BUL PLATFORM - KURULUM                     ║
echo ║                                                            ║
echo ║         Otomatik kurulum başlatılıyor...                  ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

:: Mevcut dizini al
set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

echo [1/6] Proje dizini kontrol ediliyor...
echo └─ Dizin: %PROJECT_DIR%
timeout /t 2 >nul

:: ============================================
:: XAMPP Kontrolü ve Başlatma
:: ============================================
echo.
echo [2/6] XAMPP kontrol ediliyor...

:: XAMPP dizinini bul
set "XAMPP_DIR=C:\xampp"
if not exist "%XAMPP_DIR%" (
    echo └─ ⚠️  XAMPP bulunamadı! C:\xampp dizininde XAMPP kurulu olmalı.
    echo └─ XAMPP'i şuradan indirebilirsiniz: https://www.apachefriends.org/
    pause
    exit /b 1
)

echo └─ ✓ XAMPP bulundu: %XAMPP_DIR%

:: Apache kontrolü
echo └─ Apache kontrol ediliyor...
tasklist /FI "IMAGENAME eq httpd.exe" 2>NUL | find /I /N "httpd.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo └─ ✓ Apache zaten çalışıyor
) else (
    echo └─ Apache başlatılıyor...
    start "" "%XAMPP_DIR%\apache_start.bat"
    timeout /t 3 >nul
    echo └─ ✓ Apache başlatıldı
)

:: MySQL kontrolü
echo └─ MySQL kontrol ediliyor...
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo └─ ✓ MySQL zaten çalışıyor
) else (
    echo └─ MySQL başlatılıyor...
    start "" "%XAMPP_DIR%\mysql_start.bat"
    timeout /t 5 >nul
    echo └─ ✓ MySQL başlatıldı
)

:: ============================================
:: Veritabanı Kurulumu
:: ============================================
echo.
echo [3/6] Veritabanı kuruluyor...

:: Schema dosyasını dinamik olarak bul
set "SCHEMA_FILE=%PROJECT_DIR%api\database\schema.sql"
if not exist "%SCHEMA_FILE%" (
    echo └─ ⚠️  Schema dosyası bulunamadı: %SCHEMA_FILE%
    pause
    exit /b 1
)

echo └─ Schema dosyası bulundu
echo └─ Veritabanı oluşturuluyor...

:: Veritabanını oluştur
"%XAMPP_DIR%\mysql\bin\mysql.exe" -u root -e "DROP DATABASE IF EXISTS isbul; CREATE DATABASE isbul CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo └─ ⚠️  Veritabanı oluşturulamadı!
    pause
    exit /b 1
)

echo └─ ✓ Veritabanı oluşturuldu
echo └─ Tablolar içe aktarılıyor...

:: Schema'yı içe aktar
"%XAMPP_DIR%\mysql\bin\mysql.exe" -u root isbul < "%SCHEMA_FILE%" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo └─ ⚠️  Tablolar içe aktarılamadı!
    pause
    exit /b 1
)

echo └─ ✓ Veritabanı başarıyla kuruldu

:: Super Admin oluştur
echo └─ Super Admin oluşturuluyor...
set "SETUP_ADMIN=%PROJECT_DIR%api\database\setup_super_admin.php"
if exist "%SETUP_ADMIN%" (
    "%XAMPP_DIR%\php\php.exe" "%SETUP_ADMIN%" 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo └─ ✓ Super Admin oluşturuldu
        echo └─ Email: ayhamoy2@gmail.com
        echo └─ Şifre: ABCabc123321#
    ) else (
        echo └─ ⚠️  Super Admin oluşturulamadı!
    )
) else (
    echo └─ ⚠️  setup_super_admin.php bulunamadı!
)

:: ============================================
:: Backend Kontrolü (PHP)
:: ============================================
echo.
echo [4/6] Backend kontrol ediliyor...

:: API dizinini kontrol et
if not exist "%PROJECT_DIR%api" (
    echo └─ ⚠️  API dizini bulunamadı!
    pause
    exit /b 1
)

echo └─ ✓ Backend hazır (PHP API)
echo └─ API URL: http://localhost/IsBul-Job-Platform/api

:: ============================================
:: Frontend Kurulumu (React)
:: ============================================
echo.
echo [5/6] Frontend kuruluyor...

cd /d "%PROJECT_DIR%client"

:: Node.js kontrolü
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo └─ ⚠️  Node.js bulunamadı!
    echo └─ Node.js'i şuradan indirin: https://nodejs.org/
    pause
    exit /b 1
)

echo └─ ✓ Node.js bulundu
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo └─ Node.js sürümü: %NODE_VERSION%

:: node_modules kontrolü
if not exist "node_modules" (
    echo └─ Bağımlılıklar yükleniyor ^(bu birkaç dakika sürebilir^)...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo └─ ⚠️  Bağımlılıklar yüklenemedi!
        pause
        exit /b 1
    )
    echo └─ ✓ Bağımlılıklar yüklendi
) else (
    echo └─ ✓ Bağımlılıklar zaten yüklü
)

:: .env dosyası kontrolü
if not exist ".env" (
    echo └─ .env dosyası oluşturuluyor...
    echo VITE_API_URL=http://localhost/IsBul-Job-Platform/api > .env
    echo └─ ✓ .env dosyası oluşturuldu
)

:: ============================================
:: Projeyi Başlat
:: ============================================
echo.
echo [6/6] Proje başlatılıyor...
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║              KURULUM TAMAMLANDI! ✓                         ║
echo ║                                                            ║
echo ║  Backend:  http://localhost/IsBul-Job-Platform/api        ║
echo ║  Frontend: http://localhost:5173                          ║
echo ║                                                            ║
echo ║  Tarayıcı otomatik olarak açılacak...                     ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

timeout /t 3 >nul

:: Tarayıcıyı aç
echo Tarayıcı açılıyor...
start http://localhost:5173

:: Development server'ı başlat
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  Development server başlatılıyor...                       ║
echo ║  Kapatmak için Ctrl+C tuşlarına basın                     ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

call npm run dev

pause
