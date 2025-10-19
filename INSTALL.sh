#!/bin/bash

# ============================================
# İş Bul Platform - Otomatik Kurulum Scripti
# macOS / Linux
# ============================================

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
clear
echo -e "${GREEN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║              İŞ BUL PLATFORM - KURULUM                     ║"
echo "║                                                            ║"
echo "║         Otomatik kurulum başlatılıyor...                  ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo

# Proje dizini
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

echo -e "${BLUE}[1/6]${NC} Proje dizini kontrol ediliyor..."
echo "└─ Dizin: $PROJECT_DIR"
sleep 1

# ============================================
# XAMPP Kontrolü ve Başlatma
# ============================================
echo
echo -e "${BLUE}[2/6]${NC} XAMPP kontrol ediliyor..."

# XAMPP dizini
XAMPP_DIR="/Applications/XAMPP/xamppfiles"
if [ ! -d "$XAMPP_DIR" ]; then
    echo -e "${RED}└─ ⚠️  XAMPP bulunamadı! /Applications/XAMPP dizininde XAMPP kurulu olmalı.${NC}"
    echo "└─ XAMPP'i şuradan indirebilirsiniz: https://www.apachefriends.org/"
    exit 1
fi

echo -e "${GREEN}└─ ✓ XAMPP bulundu: $XAMPP_DIR${NC}"

# Apache kontrolü
echo "└─ Apache kontrol ediliyor..."
if pgrep -x "httpd" > /dev/null; then
    echo -e "${GREEN}└─ ✓ Apache zaten çalışıyor${NC}"
else
    echo "└─ Apache başlatılıyor..."
    sudo "$XAMPP_DIR/xamppfiles/xampp" startapache
    sleep 2
    echo -e "${GREEN}└─ ✓ Apache başlatıldı${NC}"
fi

# MySQL kontrolü
echo "└─ MySQL kontrol ediliyor..."
if pgrep -x "mysqld" > /dev/null; then
    echo -e "${GREEN}└─ ✓ MySQL zaten çalışıyor${NC}"
else
    echo "└─ MySQL başlatılıyor..."
    sudo "$XAMPP_DIR/xamppfiles/xampp" startmysql
    sleep 3
    echo -e "${GREEN}└─ ✓ MySQL başlatıldı${NC}"
fi

# ============================================
# Veritabanı Kurulumu
# ============================================
echo
echo -e "${BLUE}[3/6]${NC} Veritabanı kuruluyor..."

# Schema dosyasını dinamik olarak bul
SCHEMA_FILE="$PROJECT_DIR/api/database/schema.sql"
if [ ! -f "$SCHEMA_FILE" ]; then
    echo -e "${RED}└─ ⚠️  Schema dosyası bulunamadı: $SCHEMA_FILE${NC}"
    exit 1
fi

echo "└─ Schema dosyası bulundu"
echo "└─ Veritabanı oluşturuluyor..."

# Veritabanını oluştur
"$XAMPP_DIR/bin/mysql" -u root -e "DROP DATABASE IF EXISTS isbul; CREATE DATABASE isbul CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null
if [ $? -ne 0 ]; then
    echo -e "${RED}└─ ⚠️  Veritabanı oluşturulamadı!${NC}"
    exit 1
fi

echo -e "${GREEN}└─ ✓ Veritabanı oluşturuldu${NC}"
echo "└─ Tablolar içe aktarılıyor..."

# Schema'yı içe aktar
"$XAMPP_DIR/bin/mysql" -u root isbul < "$SCHEMA_FILE" 2>/dev/null
if [ $? -ne 0 ]; then
    echo -e "${RED}└─ ⚠️  Tablolar içe aktarılamadı!${NC}"
    exit 1
fi

echo -e "${GREEN}└─ ✓ Veritabanı başarıyla kuruldu${NC}"

# ============================================
# Backend Kontrolü (PHP)
# ============================================
echo
echo -e "${BLUE}[4/6]${NC} Backend kontrol ediliyor..."

if [ ! -d "$PROJECT_DIR/api" ]; then
    echo -e "${RED}└─ ⚠️  API dizini bulunamadı!${NC}"
    exit 1
fi

echo -e "${GREEN}└─ ✓ Backend hazır (PHP API)${NC}"
echo "└─ API URL: http://localhost/IsBul-Job-Platform/api"

# ============================================
# Frontend Kurulumu (React)
# ============================================
echo
echo -e "${BLUE}[5/6]${NC} Frontend kuruluyor..."

cd "$PROJECT_DIR/client"

# Node.js kontrolü
if ! command -v node &> /dev/null; then
    echo -e "${RED}└─ ⚠️  Node.js bulunamadı!${NC}"
    echo "└─ Node.js'i şuradan indirin: https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}└─ ✓ Node.js bulundu${NC}"
node --version

# node_modules kontrolü
if [ ! -d "node_modules" ]; then
    echo "└─ Bağımlılıklar yükleniyor (bu birkaç dakika sürebilir)..."
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}└─ ⚠️  Bağımlılıklar yüklenemedi!${NC}"
        exit 1
    fi
    echo -e "${GREEN}└─ ✓ Bağımlılıklar yüklendi${NC}"
else
    echo -e "${GREEN}└─ ✓ Bağımlılıklar zaten yüklü${NC}"
fi

# .env dosyası kontrolü
if [ ! -f ".env" ]; then
    echo "└─ .env dosyası oluşturuluyor..."
    echo "VITE_API_URL=http://localhost/IsBul-Job-Platform/api" > .env
    echo -e "${GREEN}└─ ✓ .env dosyası oluşturuldu${NC}"
fi

# ============================================
# Projeyi Başlat
# ============================================
echo
echo -e "${BLUE}[6/6]${NC} Proje başlatılıyor..."
echo
echo -e "${GREEN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║              KURULUM TAMAMLANDI! ✓                         ║"
echo "║                                                            ║"
echo "║  Backend:  http://localhost/IsBul-Job-Platform/api        ║"
echo "║  Frontend: http://localhost:5173                          ║"
echo "║                                                            ║"
echo "║  Tarayıcı otomatik olarak açılacak...                     ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo

sleep 2

# Tarayıcıyı aç
echo "Tarayıcı açılıyor..."
open http://localhost:5173 2>/dev/null || xdg-open http://localhost:5173 2>/dev/null

# Development server'ı başlat
echo
echo -e "${GREEN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Development server başlatılıyor...                       ║"
echo "║  Kapatmak için Ctrl+C tuşlarına basın                     ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo

npm run dev
