#!/bin/bash
# Dependencies Installation Script
# Bu script backend deployment'tan sonra çalıştırılmalı

echo "📦 PHP Dependencies yükleniyor..."

# Composer kurulu mu kontrol et
if ! command -v composer &> /dev/null; then
    echo "⚠️ Composer bulunamadı. Kurulum yapılıyor..."
    
    # Composer'ı indir ve kur
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    php composer-setup.php --install-dir=. --filename=composer
    php -r "unlink('composer-setup.php');"
    
    # Composer'ı kullan
    php composer install --no-dev --optimize-autoloader
else
    # Composer kurulu, direkt kullan
    composer install --no-dev --optimize-autoloader
fi

echo "✅ Dependencies yüklendi!"

