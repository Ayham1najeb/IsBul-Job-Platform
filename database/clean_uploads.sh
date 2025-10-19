#!/bin/bash

# =====================================================
# Script لحذف جميع الملفات المرفوعة
# =====================================================

echo "🧹 بدء تنظيف الملفات المرفوعة..."

# المسار الأساسي للمشروع
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# حذف ملفات الصور الشخصية
if [ -d "$PROJECT_DIR/uploads/profiles" ]; then
    echo "📁 حذف ملفات الصور الشخصية..."
    rm -rf "$PROJECT_DIR/uploads/profiles"/*
    echo "✅ تم حذف ملفات الصور الشخصية"
fi

# حذف ملفات صور الشركات
if [ -d "$PROJECT_DIR/uploads/companies" ]; then
    echo "📁 حذف ملفات صور الشركات..."
    rm -rf "$PROJECT_DIR/uploads/companies"/*
    echo "✅ تم حذف ملفات صور الشركات"
fi

# حذف ملفات الشهادات
if [ -d "$PROJECT_DIR/uploads/certificates" ]; then
    echo "📁 حذف ملفات الشهادات..."
    rm -rf "$PROJECT_DIR/uploads/certificates"/*
    echo "✅ تم حذف ملفات الشهادات"
fi

# إنشاء ملف .gitkeep للحفاظ على المجلدات
touch "$PROJECT_DIR/uploads/profiles/.gitkeep"
touch "$PROJECT_DIR/uploads/companies/.gitkeep"
touch "$PROJECT_DIR/uploads/certificates/.gitkeep"

echo ""
echo "✨ تم تنظيف جميع الملفات المرفوعة بنجاح!"
echo "📂 المجلدات محفوظة مع ملفات .gitkeep"
