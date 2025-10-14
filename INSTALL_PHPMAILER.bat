@echo off
echo ========================================
echo Installing PHPMailer for IsBul Project
echo ========================================
echo.

cd /d C:\xampp\htdocs\IsBul\api

echo Checking if Composer exists...
if exist composer.phar (
    echo Composer found!
) else (
    echo Downloading Composer...
    C:\xampp\php\php.exe -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    C:\xampp\php\php.exe composer-setup.php
    del composer-setup.php
)

echo.
echo Installing PHPMailer...
C:\xampp\php\php.exe composer.phar require phpmailer/phpmailer

echo.
echo ========================================
echo Installation Complete!
echo ========================================
pause
