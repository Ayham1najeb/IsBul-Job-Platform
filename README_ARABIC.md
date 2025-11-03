# 📚 دليل المشروع الشامل - İş Bul Platform

**منصة البحث عن الوظائف** - دليل تفصيلي باللغة العربية

---

## 📋 جدول المحتويات

1. [نظرة عامة على المشروع](#نظرة-عامة-على-المشروع)
2. [نظام المحادثة (Real-time Messaging)](#نظام-المحادثة-real-time-messaging)
3. [نظام الإشعارات (Notifications)](#نظام-الإشعارات-notifications)
4. [نظام حالة الاتصال (Online/Offline Status)](#نظام-حالة-الاتصال-onlineoffline-status)
5. [تحسينات واجهة المستخدم (UI/UX Improvements)](#تحسينات-واجهة-المستخدم-uiux-improvements)
6. [تحسينات الأمان (Security Improvements)](#تحسينات-الأمان-security-improvements)
7. [تحسينات الأداء (Performance Optimization)](#تحسينات-الأداء-performance-optimization)
8. [الملفات والمكونات](#الملفات-والمكونات)
9. [كيفية الاستخدام](#كيفية-الاستخدام)
10. [الإحصائيات](#الإحصائيات)

---

## 🎯 نظرة عامة على المشروع

**İş Bul** هو منصة شاملة للبحث عن الوظائف تربط بين الباحثين عن العمل والشركات. تم تطويرها كـ **مشروع تخرج نهائي** باستخدام أحدث التقنيات.

### التقنيات المستخدمة:
- **Frontend**: React 18 + Vite + TailwindCSS
- **Backend**: PHP 7.4+ + MySQL 5.7+
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Polling Mechanism (WhatsApp/Messenger style)

---

## 💬 نظام المحادثة (Real-time Messaging)

### 📖 الوصف
نظام محادثة فوري (Real-time) بين الباحثين عن العمل والشركات، مشابه لـ WhatsApp و Messenger و Instagram. يعمل بدون الحاجة لتحديث الصفحة.

### ✨ الميزات الرئيسية:
1. **محادثة فورية**: ظهور الرسائل الجديدة تلقائياً بدون تحديث الصفحة
2. **مرتبط بالوظيفة**: كل محادثة مرتبطة بوظيفة معينة
3. **شريط لاصق للوظيفة**: يظهر اسم الوظيفة في أعلى المحادثة
4. **رسائل نصية فقط**: لا توجد صور أو مكالمات
5. **وقت الرسالة**: يعرض وقت إرسال واستقبال كل رسالة
6. **حالة القراءة**: يعرض إذا كانت الرسالة تم قراءتها أم لا

### 📁 الملفات والملفات المهمة:

#### Backend (API):

**1. `/api/messages/send.php`**
- **الوظيفة**: إرسال رسالة جديدة
- **الوصف**: يستقبل الرسالة من المستخدم، يربطها بالوظيفة (إذا كانت موجودة)، وينشئ إشعاراً للمستقبل إذا كانت أول رسالة
- **المدخلات**: `alici_id`, `mesaj`, `konu`, `ilan_id` (اختياري)
- **المخرجات**: تأكيد إرسال الرسالة

**2. `/api/messages/conversation.php`**
- **الوظيفة**: جلب جميع الرسائل في محادثة معينة
- **الوصف**: يسترجع جميع الرسائل بين مستخدمين معينين، مرتبة حسب التاريخ
- **المدخلات**: `user_id` (المستخدم الآخر)
- **المخرجات**: قائمة بجميع الرسائل مع معلومات المرسل والوظيفة

**3. `/api/messages/new-messages.php`** ⭐ **جديد**
- **الوظيفة**: جلب الرسائل الجديدة فقط (لتحسين الأداء)
- **الوصف**: يسترجع الرسائل التي تم إرسالها بعد رسالة معينة (بناءً على `last_message_id`)
- **المدخلات**: `user_id`, `last_message_id`
- **المخرجات**: قائمة بالرسائل الجديدة فقط
- **الاستخدام**: يستخدم في النظام الفوري (Real-time) لعدم الحاجة لجلب جميع الرسائل كل مرة

**4. `/api/messages/index.php`**
- **الوظيفة**: جلب قائمة المحادثات
- **الوصف**: يعرض جميع المحادثات للمستخدم مع آخر رسالة لكل محادثة
- **المخرجات**: قائمة المحادثات مع معلومات المستخدم الآخر

**5. `/api/messages/online-status.php`**
- **الوظيفة**: التحقق من حالة الاتصال للمستخدم الآخر
- **الوصف**: يتحقق إذا كان المستخدم الآخر متصل حالياً في نفس المحادثة
- **المدخلات**: `user_id`
- **المخرجات**: `online` (true/false), `son_aktivite` (تاريخ آخر نشاط)

**6. `/api/messages/heartbeat.php`** ⭐ **جديد**
- **الوظيفة**: إرسال إشارة "نبض" لإعلام النظام أن المستخدم متصل
- **الوصف**: عند فتح محادثة، يرسل المستخدم إشارة كل 5 ثوانٍ لإعلام النظام أنه متصل
- **المدخلات**: `diger_kullanici_id` (المستخدم الآخر في المحادثة)
- **الاستخدام**: يستخدم لتحديد حالة "متصل الآن" (Online Now)

**7. `/api/messages/remove-heartbeat.php`** ⭐ **جديد**
- **الوظيفة**: إزالة إشارة "نبض" عند إغلاق المحادثة
- **الوصف**: عند إغلاق المحادثة، يتم إزالة إشارة الاتصال
- **المدخلات**: `diger_kullanici_id`

#### Database:

**1. `/api/database/add_ilan_id_to_mesajlar.sql`**
- **الوظيفة**: إضافة عمود `ilan_id` إلى جدول `mesajlar`
- **الوصف**: يربط كل رسالة بوظيفة معينة (إذا كانت المحادثة مرتبطة بوظيفة)
- **الاستخدام**: `ALTER TABLE mesajlar ADD COLUMN ilan_id INT NULL`

**2. `/api/database/create_aktif_sohbetler_table.sql`**
- **الوظيفة**: إنشاء جدول لتتبع المحادثات النشطة
- **الوصف**: يخزن معلومات المستخدمين المتصلين حالياً في محادثة
- **الجدول**: `aktif_sohbetler`
- **الأعمدة**: `kullanici_id`, `diger_kullanici_id`, `son_aktivite`

#### Frontend (React):

**1. `/client/src/components/Messages/Conversation.jsx`** ⭐ **الأهم**
- **الوظيفة**: مكون المحادثة الرئيسي
- **الوصف**: يعرض جميع الرسائل ويسمح بإرسال رسائل جديدة
- **الميزات الرئيسية**:
  - **Real-time Updates**: يستخدم `setInterval` للتحقق من الرسائل الجديدة كل 2 ثانية
  - **Heartbeat System**: يرسل إشارة كل 5 ثوانٍ لإعلام النظام بالاتصال
  - **Scroll Management**: يحافظ على موضع التمرير عند وصول رسائل جديدة
  - **Online Status**: يعرض حالة الاتصال للمستخدم الآخر
  - **Job Sticky Bar**: شريط لاصق يظهر اسم الوظيفة في أعلى المحادثة
  - **Message Time**: يعرض وقت كل رسالة
  - **Default Avatar**: يعرض أيقونة افتراضية إذا لم يكن هناك صورة للمستخدم

**2. `/client/src/components/Messages/MessageInput.jsx`**
- **الوظيفة**: حقل إدخال الرسالة
- **الوصف**: يسمح للمستخدم بإدخال وإرسال رسالة
- **الميزات**: 
  - رسائل نصية فقط (لا توجد مرفقات)
  - إزالة التركيز بعد الإرسال
  - زر إرسال مع حالة التحميل

**3. `/client/src/components/Messages/MessageList.jsx`**
- **الوظيفة**: قائمة المحادثات
- **الوصف**: يعرض جميع المحادثات في الشريط الجانبي
- **الميزات**: 
  - آخر رسالة لكل محادثة
  - صورة المستخدم أو أيقونة افتراضية
  - عدد الرسائل غير المقروءة

**4. `/client/src/pages/Messages/MessagesPage.jsx`**
- **الوظيفة**: الصفحة الرئيسية للمحادثات
- **الوصف**: تجمع بين `MessageList` و `Conversation`
- **الميزات**: 
  - فتح محادثة تلقائياً من `location.state`
  - تمرير `current_user_id` للمكونات

#### Services:

**1. `/client/src/services/messageService.js`**
- **الوظيفة**: خدمة للتعامل مع API المحادثات
- **الوظائف**:
  - `getMessages()`: جلب قائمة المحادثات
  - `getConversation(userId)`: جلب محادثة معينة
  - `sendMessage(data)`: إرسال رسالة
  - `getNewMessages(userId, lastMessageId)`: جلب الرسائل الجديدة ⭐
  - `checkOnlineStatus(userId)`: التحقق من حالة الاتصال
  - `sendHeartbeat(otherUserId)`: إرسال إشارة نبض ⭐
  - `removeHeartbeat(otherUserId)`: إزالة إشارة نبض ⭐

### 🔄 آلية العمل:

1. **عند فتح المحادثة**:
   - يتم تحميل جميع الرسائل السابقة
   - يبدأ نظام الـ Polling (كل 2 ثانية)
   - يبدأ نظام الـ Heartbeat (كل 5 ثوانٍ)

2. **عند إرسال رسالة**:
   - يتم إرسال الرسالة عبر API
   - يتم التحقق من الرسائل الجديدة عدة مرات (بعد 500ms، 1000ms، 1800ms)
   - يتم التمرير تلقائياً لآخر رسالة

3. **عند وصول رسالة جديدة**:
   - يتم التحقق من الرسائل الجديدة كل 2 ثانية
   - يتم إضافة الرسائل الجديدة فقط (بدون تكرار)
   - يتم الحفاظ على موضع التمرير (إذا كان المستخدم يقرأ رسائل قديمة)
   - يتم التمرير تلقائياً (إذا كان المستخدم في نهاية المحادثة)

4. **نظام Heartbeat**:
   - عند فتح المحادثة: يتم إرسال إشارة كل 5 ثوانٍ
   - عند إغلاق المحادثة: يتم إزالة الإشارة
   - يتم التحقق من حالة الاتصال: إذا كان كلا المستخدمين متصلين → "متصل الآن"

---

## 🔔 نظام الإشعارات (Notifications)

### 📖 الوصف
نظام إشعارات شامل يخبر المستخدمين بالأحداث المهمة مثل:
- تقديم طلب وظيفة جديد
- قبول طلب وظيفة
- استلام رسالة جديدة

### ✨ الميزات الرئيسية:
1. **إشعارات تلقائية**: يتم إنشاء الإشعارات تلقائياً عند حدوث الأحداث
2. **عدّاد الإشعارات**: يعرض عدد الإشعارات غير المقروءة
3. **قائمة الإشعارات**: قائمة منسدلة تعرض جميع الإشعارات
4. **علامة مقروء/غير مقروء**: يمكن تمييز الإشعارات المقروءة
5. **تحديد الكل كمقروء**: زر لتحديد جميع الإشعارات كمقروءة

### 📁 الملفات والملفات المهمة:

#### Backend (API):

**1. `/api/models/Notification.php`** ⭐ **جديد**
- **الوظيفة**: نموذج التعامل مع جدول الإشعارات
- **الوصف**: يحتوي على جميع دوال CRUD للإشعارات
- **الوظائف**:
  - `create()`: إنشاء إشعار جديد
  - `getUserNotifications()`: جلب إشعارات مستخدم معين
  - `markAsRead()`: تحديد إشعار كمقروء
  - `markAllAsRead()`: تحديد جميع الإشعارات كمقروءة
  - `getUnreadCount()`: جلب عدد الإشعارات غير المقروءة

**2. `/api/notifications/index.php`** ⭐ **جديد**
- **الوظيفة**: جلب جميع إشعارات المستخدم الحالي
- **الوصف**: يعرض جميع الإشعارات مرتبة حسب التاريخ (الأحدث أولاً)
- **المخرجات**: قائمة الإشعارات مع المعلومات الكاملة

**3. `/api/notifications/mark-read.php`** ⭐ **جديد**
- **الوظيفة**: تحديد إشعار واحد كمقروء
- **المدخلات**: `bildirim_id`
- **المخرجات**: تأكيد التحديث

**4. `/api/notifications/mark-all-read.php`** ⭐ **جديد**
- **الوظيفة**: تحديد جميع الإشعارات كمقروءة
- **المخرجات**: تأكيد التحديث

#### Database:

**1. `/api/database/create_bildirimler_table.sql`** ⭐ **جديد**
- **الوظيفة**: إنشاء جدول الإشعارات
- **الوصف**: جدول `bildirimler` لتخزين جميع الإشعارات
- **الأعمدة**:
  - `id`: معرف فريد
  - `kullanici_id`: معرف المستخدم المستقبل
  - `tip`: نوع الإشعار (`application_created`, `application_accepted`, `message_received`)
  - `baslik`: عنوان الإشعار
  - `mesaj`: نص الإشعار
  - `okundu`: حالة القراءة (0/1)
  - `ilan_id`: معرف الوظيفة (إذا كان مرتبطاً)
  - `basvuru_id`: معرف الطلب (إذا كان مرتبطاً)
  - `mesaj_id`: معرف الرسالة (إذا كان مرتبطاً)
  - `olusturma_tarihi`: تاريخ الإنشاء

#### Integration Points:

**1. `/api/applications/create.php`**
- **الوظيفة**: عند تقديم طلب وظيفة جديد
- **الإجراء**: يتم إنشاء إشعار للشركة
- **النوع**: `application_created`
- **الرسالة**: "قام [اسم المستخدم] بتقديم على الوظيفة [اسم الوظيفة]"

**2. `/api/applications/update-status.php`**
- **الوظيفة**: عند تغيير حالة الطلب إلى "مقبول"
- **الإجراء**: يتم إنشاء إشعار للباحث عن العمل
- **النوع**: `application_accepted`
- **الرسالة**: "تم قبول طلبك على الوظيفة [اسم الوظيفة]"

**3. `/api/messages/send.php`**
- **الوظيفة**: عند إرسال أول رسالة في محادثة مرتبطة بوظيفة
- **الإجراء**: يتم إنشاء إشعار للمستقبل
- **النوع**: `message_received`
- **الرسالة**: "تم إرسال رسالة من الشركة [اسم الشركة] بخصوص الوظيفة [اسم الوظيفة]"

#### Frontend (React):

**1. `/client/src/components/Notifications/NotificationBell.jsx`** ⭐ **مهم**
- **الوظيفة**: أيقونة الإشعارات في الهيدر
- **الوصف**: يعرض أيقونة الجرس مع عدّاد الإشعارات غير المقروءة
- **الميزات**:
  - عدّاد الإشعارات غير المقروءة (badge أحمر)
  - قائمة منسدلة عند النقر
  - تحديث تلقائي كل بضع ثوانٍ

**2. `/client/src/components/Notifications/NotificationList.jsx`** ⭐ **مهم**
- **الوظيفة**: قائمة الإشعارات المنسدلة
- **الوصف**: يعرض جميع الإشعارات مع إمكانية تحديدها كمقروءة
- **الميزات**:
  - عرض جميع الإشعارات مرتبة حسب التاريخ
  - أيقونات مختلفة حسب نوع الإشعار
  - زر "تحديد الكل كمقروء"
  - روابط للانتقال إلى الصفحة ذات الصلة

**3. `/client/src/services/notificationService.js`** ⭐ **جديد**
- **الوظيفة**: خدمة للتعامل مع API الإشعارات
- **الوظائف**:
  - `getNotifications()`: جلب جميع الإشعارات
  - `markAsRead(notificationId)`: تحديد إشعار كمقروء
  - `markAllAsRead()`: تحديد جميع الإشعارات كمقروءة
  - `getUnreadCount()`: جلب عدد الإشعارات غير المقروءة

**4. `/client/src/components/Layout/Navbar.jsx`**
- **التعديل**: إضافة `NotificationBell` في الهيدر للمستخدمين

**5. `/client/src/components/Layout/CompanyNavbar.jsx`**
- **التعديل**: إضافة `NotificationBell` في الهيدر للشركات

### 🔄 آلية العمل:

1. **عند حدوث حدث** (مثل تقديم طلب):
   - يتم إنشاء إشعار في قاعدة البيانات
   - يتم حفظ جميع المعلومات اللازمة (المستخدم، الوظيفة، النوع، إلخ)

2. **عند فتح قائمة الإشعارات**:
   - يتم جلب جميع الإشعارات من API
   - يتم عرضها مرتبة حسب التاريخ
   - يتم تمييز الإشعارات غير المقروءة

3. **عند قراءة إشعار**:
   - يتم تحديث حالة الإشعار في قاعدة البيانات
   - يتم تحديث العدّاد تلقائياً

---

## 🟢 نظام حالة الاتصال (Online/Offline Status)

### 📖 الوصف
نظام لتحديد حالة الاتصال للمستخدمين (متصل الآن / غير متصل) بناءً على وجودهم في المحادثة نفسها.

### ✨ الميزات الرئيسية:
1. **"متصل الآن"**: يظهر فقط عندما يكون كلا المستخدمين في نفس المحادثة
2. **"غير متصل"**: يظهر إذا كان مستخدم واحد فقط في المحادثة
3. **تحديث فوري**: يتم تحديث الحالة تلقائياً
4. **دائرة خضراء**: تظهر بجانب "متصل الآن"

### 📁 الملفات والملفات المهمة:

#### Backend:

**1. `/api/messages/heartbeat.php`**
- **الوظيفة**: تسجيل/تحديث نشاط المستخدم في محادثة
- **الوصف**: 
  - عند فتح محادثة، يتم تسجيل `kullanici_id` و `diger_kullanici_id` و `son_aktivite`
  - يتم تحديث `son_aktivite` كل 5 ثوانٍ
  - يتم تنظيف السجلات القديمة (أكثر من 30 ثانية)

**2. `/api/messages/remove-heartbeat.php`**
- **الوظيفة**: إزالة نشاط المستخدم عند إغلاق المحادثة
- **الوصف**: يتم حذف السجل من جدول `aktif_sohbetler`

**3. `/api/messages/online-status.php`**
- **الوظيفة**: التحقق من حالة الاتصال
- **الوصف**: 
  - يتحقق إذا كان كلا المستخدمين لديهم سجلات نشطة في `aktif_sohbetler`
  - إذا كان كلا المستخدمين متصلين (آخر نشاط أقل من 30 ثانية) → "متصل الآن"
  - إذا كان مستخدم واحد فقط متصل → "غير متصل"

#### Database:

**1. `/api/database/create_aktif_sohbetler_table.sql`**
- **الوظيفة**: إنشاء جدول لتتبع المحادثات النشطة
- **الجدول**: `aktif_sohbetler`
- **الأعمدة**:
  - `id`: معرف فريد
  - `kullanici_id`: معرف المستخدم المتصل
  - `diger_kullanici_id`: معرف المستخدم الآخر في المحادثة
  - `son_aktivite`: تاريخ آخر نشاط (timestamp)

#### Frontend:

**1. `/client/src/components/Messages/Conversation.jsx`**
- **الوظيفة**: إدارة نظام Heartbeat وعرض حالة الاتصال
- **الوصف**:
  - عند فتح المحادثة: يبدأ إرسال heartbeat كل 5 ثوانٍ
  - عند إغلاق المحادثة: يتم إزالة heartbeat
  - يتم التحقق من حالة الاتصال كل بضع ثوانٍ
  - يتم عرض "متصل الآن" أو "غير متصل" مع دائرة ملونة

**2. `/client/src/services/messageService.js`**
- **الوظائف**:
  - `sendHeartbeat(otherUserId)`: إرسال heartbeat
  - `removeHeartbeat(otherUserId)`: إزالة heartbeat
  - `checkOnlineStatus(userId)`: التحقق من حالة الاتصال

### 🔄 آلية العمل:

1. **عند فتح المحادثة**:
   - يتم إرسال heartbeat أولي
   - يبدأ `setInterval` لإرسال heartbeat كل 5 ثوانٍ
   - يتم التحقق من حالة الاتصال للمستخدم الآخر

2. **أثناء المحادثة**:
   - يتم إرسال heartbeat كل 5 ثوانٍ
   - يتم التحقق من حالة الاتصال كل بضع ثوانٍ
   - إذا كان كلا المستخدمين متصلين → "متصل الآن" (أخضر)
   - إذا كان مستخدم واحد فقط → "غير متصل" (رمادي)

3. **عند إغلاق المحادثة**:
   - يتم إزالة heartbeat
   - يتم تنظيف `useEffect` cleanup

---

## 🎨 تحسينات واجهة المستخدم (UI/UX Improvements)

### 📖 الوصف
تحسينات شاملة لواجهة المستخدم لتجربة أفضل مع دعم إمكانية الوصول (Accessibility).

### ✨ الميزات الرئيسية:

#### 1. Skeleton Screens
- **الوصف**: شاشات تحميل تفاعلية بدلاً من spinner بسيط
- **المكونات**:
  - `Skeleton.jsx`: مكون أساسي للـ skeleton
  - `SkeletonCard.jsx`: skeleton للبطاقات (job, company)
- **الاستخدام**: في `JobsPage`, `CompaniesPage`, `Dashboard`

#### 2. Scroll Animations
- **الوصف**: رسوم متحركة عند التمرير
- **المكون**: `ScrollReveal.jsx`
- **الاستخدام**: في قوائم الوظائف والشركات

#### 3. Accessibility
- **الوصف**: دعم إمكانية الوصول للمستخدمين ذوي الإعاقة
- **المكونات**:
  - `SkipToContent.jsx`: رابط للانتقال إلى المحتوى الرئيسي
  - ARIA labels في جميع المكونات
  - Keyboard navigation support
- **الميزات**:
  - High contrast mode support
  - Reduced motion support
  - Focus-visible styles

#### 4. Button Animations
- **الوصف**: رسوم متحركة للأزرار (pulse, shine effects)
- **الاستخدام**: في CSS (`index.css`)

### 📁 الملفات والملفات المهمة:

#### Frontend Components:

**1. `/client/src/components/UI/Skeleton.jsx`** ⭐ **جديد**
- **الوظيفة**: مكون skeleton أساسي
- **الاستخدام**: 
  ```jsx
  <Skeleton variant="text" />
  <Skeleton variant="title" />
  <Skeleton variant="avatar" />
  <Skeleton variant="button" />
  ```

**2. `/client/src/components/UI/SkeletonCard.jsx`** ⭐ **جديد**
- **الوظيفة**: skeleton للبطاقات
- **الأنواع**: `job`, `company`, `default`
- **الاستخدام**: في `JobsPage`, `CompaniesPage`

**3. `/client/src/components/UI/ScrollReveal.jsx`** ⭐ **جديد**
- **الوظيفة**: مكون للرسوم المتحركة عند التمرير
- **الاستخدام**: 
  ```jsx
  <ScrollReveal delay={100}>
    <JobCard />
  </ScrollReveal>
  ```

**4. `/client/src/components/UI/SkipToContent.jsx`** ⭐ **جديد**
- **الوظيفة**: رابط للانتقال إلى المحتوى الرئيسي (لإمكانية الوصول)
- **الاستخدام**: في `App.jsx`

#### CSS:

**1. `/client/src/index.css`**
- **التحسينات**:
  - Skeleton shimmer animations
  - Scroll reveal animations
  - Button animations (pulse, shine)
  - Focus-visible styles
  - Responsive typography
  - Touch gestures support
  - High contrast mode support
  - Reduced motion support

#### App Configuration:

**1. `/client/src/App.jsx`**
- **التحسينات**:
  - Lazy loading لجميع الصفحات
  - Code splitting (manual chunks)
  - Suspense wrapper مع PageLoader
  - SkipToContent component

**2. `/client/vite.config.js`**
- **التحسينات**:
  - Manual chunks configuration
  - Image optimization
  - Bundle size optimization

---

## 🔒 تحسينات الأمان (Security Improvements)

### 📖 الوصف
تحسينات أمنية شاملة لحماية النظام من الهجمات المختلفة.

### ✨ الميزات الرئيسية:

#### 1. Rate Limiting
- **الوصف**: تحديد عدد الطلبات لكل IP (60 طلب/دقيقة)
- **الحماية**: ضد Brute Force attacks
- **الاستخدام**: في `login.php`, `register.php`

#### 2. Input Sanitization
- **الوصف**: تنظيف جميع المدخلات من المستخدم
- **الحماية**: ضد XSS و SQL Injection
- **الاستخدام**: في جميع endpoints التي تستقبل بيانات من المستخدم

### 📁 الملفات والملفات المهمة:

#### Backend:

**1. `/api/middleware/rate_limiter.php`** ⭐ **جديد**
- **الوظيفة**: تحديد عدد الطلبات
- **الوصف**: 
  - يتحقق من عدد الطلبات لكل IP
  - الحد: 60 طلب/دقيقة
  - إذا تجاوز الحد: يرسل HTTP 429 (Too Many Requests)
- **الاستخدام**: في `login.php`, `register.php`

**2. `/api/utils/input_sanitizer.php`** ⭐ **جديد**
- **الوظيفة**: تنظيف المدخلات
- **الوظائف**:
  - `sanitizeString()`: تنظيف النصوص
  - `sanitizeEmail()`: تنظيف وتحقق من البريد الإلكتروني
  - `sanitizeInt()`: تنظيف الأرقام
  - `sanitizeURL()`: تنظيف وتحقق من الروابط
  - `preventXSS()`: حماية من XSS
  - `preventSQLInjection()`: حماية من SQL Injection
  - `sanitizeArray()`: تنظيف المصفوفات (recursive)

#### Integration:

**1. `/api/auth/login.php`**
- **التعديل**: إضافة rate limiting + input sanitization
- **الحماية**: ضد brute force attacks

**2. `/api/auth/register.php`**
- **التعديل**: إضافة rate limiting + input sanitization
- **الحماية**: ضد spam registrations

**3. `/api/messages/send.php`**
- **التعديل**: إضافة input sanitization
- **الحماية**: ضد XSS في الرسائل

**4. `/api/jobs/create.php`**
- **التعديل**: إضافة input sanitization
- **الحماية**: ضد XSS في أوصاف الوظائف

**5. `/api/jobs/update.php`**
- **التعديل**: إضافة input sanitization

**6. `/api/applications/create.php`**
- **التعديل**: إضافة input sanitization

**7. `/api/companies/update.php`**
- **التعديل**: إضافة input sanitization

---

## ⚡ تحسينات الأداء (Performance Optimization)

### 📖 الوصف
تحسينات شاملة لتحسين أداء التطبيق وسرعة التحميل.

### ✨ الميزات الرئيسية:

#### 1. Lazy Loading
- **الوصف**: تحميل الصفحات عند الحاجة فقط
- **الاستخدام**: جميع الصفحات في `App.jsx` تستخدم `React.lazy()`

#### 2. Code Splitting
- **الوصف**: تقسيم الكود إلى chunks منفصلة
- **الاستخدام**: 
  - `react-vendor`: React, React-DOM, React-Router
  - `query-vendor`: TanStack Query
  - `ui-vendor`: Lucide React icons

#### 3. Image Optimization
- **الوصف**: تحسين الصور في Vite config

### 📁 الملفات والملفات المهمة:

**1. `/client/src/App.jsx`**
- **Lazy Loading**: جميع الصفحات
- **Suspense**: مع PageLoader fallback

**2. `/client/vite.config.js`**
- **Manual Chunks**: تقسيم الكود
- **Image Optimization**: إعدادات Vite

---

## 📁 الملفات والمكونات

### هيكل المشروع الكامل:

```
IsBul-Job-Platform/
├── api/                                    # Backend (PHP)
│   ├── config/
│   │   ├── cors_headers.php               # CORS configuration
│   │   └── database.php                   # Database connection
│   ├── models/
│   │   ├── Message.php                    # Message model (updated)
│   │   ├── Notification.php              # Notification model ⭐ NEW
│   │   └── ...
│   ├── middleware/
│   │   ├── auth.php                       # Authentication middleware
│   │   └── rate_limiter.php               # Rate limiting ⭐ NEW
│   ├── utils/
│   │   ├── jwt.php                        # JWT utilities
│   │   └── input_sanitizer.php           # Input sanitization ⭐ NEW
│   ├── messages/
│   │   ├── send.php                       # Send message (updated)
│   │   ├── index.php                      # Get conversations
│   │   ├── conversation.php              # Get conversation
│   │   ├── new-messages.php               # Get new messages ⭐ NEW
│   │   ├── online-status.php              # Check online status
│   │   ├── heartbeat.php                  # Send heartbeat ⭐ NEW
│   │   └── remove-heartbeat.php           # Remove heartbeat ⭐ NEW
│   ├── notifications/
│   │   ├── index.php                      # Get notifications ⭐ NEW
│   │   ├── mark-read.php                  # Mark as read ⭐ NEW
│   │   └── mark-all-read.php             # Mark all as read ⭐ NEW
│   ├── applications/
│   │   ├── create.php                     # Create application (updated)
│   │   └── update-status.php             # Update status (updated)
│   └── database/
│       ├── add_ilan_id_to_mesajlar.sql    # Add ilan_id column ⭐ NEW
│       ├── create_bildirimler_table.sql   # Create notifications table ⭐ NEW
│       └── create_aktif_sohbetler_table.sql # Create active chats table ⭐ NEW
│
├── client/                                 # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── UI/
│   │   │   │   ├── Skeleton.jsx           # Skeleton component ⭐ NEW
│   │   │   │   ├── SkeletonCard.jsx       # Skeleton card ⭐ NEW
│   │   │   │   ├── ScrollReveal.jsx      # Scroll animation ⭐ NEW
│   │   │   │   └── SkipToContent.jsx     # Skip link ⭐ NEW
│   │   │   ├── Messages/
│   │   │   │   ├── Conversation.jsx      # Chat component (updated)
│   │   │   │   ├── MessageInput.jsx      # Message input (updated)
│   │   │   │   └── MessageList.jsx       # Conversations list
│   │   │   ├── Notifications/
│   │   │   │   ├── NotificationBell.jsx  # Notification icon (updated)
│   │   │   │   └── NotificationList.jsx  # Notification list (updated)
│   │   │   ├── Layout/
│   │   │   │   ├── Navbar.jsx            # Main navbar (updated)
│   │   │   │   └── CompanyNavbar.jsx     # Company navbar (updated)
│   │   │   └── Company/
│   │   │       └── AcceptanceModal.jsx   # Job acceptance modal
│   │   ├── services/
│   │   │   ├── messageService.js         # Message service (updated)
│   │   │   └── notificationService.js   # Notification service ⭐ NEW
│   │   ├── pages/
│   │   │   ├── Messages/
│   │   │   │   └── MessagesPage.jsx      # Messages page
│   │   │   ├── Company/
│   │   │   │   └── ApplicationsPage.jsx  # Applications page (updated)
│   │   │   ├── Jobs/
│   │   │   │   └── JobsPage.jsx          # Jobs page (updated)
│   │   │   └── Companies/
│   │   │       └── CompaniesPage.jsx    # Companies page (updated)
│   │   ├── App.jsx                        # Main app (updated)
│   │   ├── index.css                      # Global styles (updated)
│   │   └── ...
│   └── vite.config.js                      # Vite config (updated)
│
└── Documentation/
    ├── README.md                           # Main README
    ├── README_ARABIC.md                    # Arabic README ⭐ NEW
    ├── DEPLOYMENT.md                       # Deployment guide ⭐ NEW
    ├── API_DOCUMENTATION.md                # API documentation ⭐ NEW
    └── AYLIK_PLAN.md                       # Project plan
```

---

## 🔄 كيفية الاستخدام

### للمطورين:

#### 1. تشغيل المشروع محلياً:

```bash
# Backend (XAMPP)
# 1. شغّل XAMPP (Apache + MySQL)
# 2. افتح http://localhost/IsBul-Job-Platform/api

# Frontend
cd client
npm install
npm run dev
# افتح http://localhost:5173
```

#### 2. استخدام نظام المحادثة:

```javascript
// في مكون React
import { messageService } from '../services/messageService';

// جلب المحادثات
const conversations = await messageService.getMessages();

// فتح محادثة
const messages = await messageService.getConversation(userId);

// إرسال رسالة
await messageService.sendMessage({
  alici_id: userId,
  mesaj: "مرحباً!",
  ilan_id: jobId // اختياري
});

// جلب الرسائل الجديدة (Real-time)
const newMessages = await messageService.getNewMessages(userId, lastMessageId);

// التحقق من حالة الاتصال
const status = await messageService.checkOnlineStatus(userId);

// إرسال heartbeat
await messageService.sendHeartbeat(otherUserId);

// إزالة heartbeat
await messageService.removeHeartbeat(otherUserId);
```

#### 3. استخدام نظام الإشعارات:

```javascript
// في مكون React
import { notificationService } from '../services/notificationService';

// جلب الإشعارات
const notifications = await notificationService.getNotifications();

// تحديد إشعار كمقروء
await notificationService.markAsRead(notificationId);

// تحديد الكل كمقروء
await notificationService.markAllAsRead();

// جلب عدد الإشعارات غير المقروءة
const count = await notificationService.getUnreadCount();
```

#### 4. استخدام Input Sanitization:

```php
// في PHP
require_once '../utils/input_sanitizer.php';

// تنظيف النص
$cleanText = InputSanitizer::sanitizeString($userInput);

// تنظيف البريد
$cleanEmail = InputSanitizer::sanitizeEmail($userInput);

// تنظيف الرقم
$cleanInt = InputSanitizer::sanitizeInt($userInput);

// حماية من XSS
$safeText = InputSanitizer::preventXSS($userInput);
```

#### 5. استخدام Rate Limiting:

```php
// في PHP
require_once '../middleware/rate_limiter.php';

// التحقق من Rate Limit
$clientIP = RateLimiter::getClientIP();
RateLimiter::check($clientIP);
```

---

## 📊 الإحصائيات

### الملفات الجديدة المُنشأة:

#### Backend:
- ✅ `api/models/Notification.php`
- ✅ `api/middleware/rate_limiter.php`
- ✅ `api/utils/input_sanitizer.php`
- ✅ `api/notifications/index.php`
- ✅ `api/notifications/mark-read.php`
- ✅ `api/notifications/mark-all-read.php`
- ✅ `api/messages/new-messages.php`
- ✅ `api/messages/heartbeat.php`
- ✅ `api/messages/remove-heartbeat.php`
- ✅ `api/database/create_bildirimler_table.sql`
- ✅ `api/database/create_aktif_sohbetler_table.sql`
- ✅ `api/database/add_ilan_id_to_mesajlar.sql`

#### Frontend:
- ✅ `client/src/components/UI/Skeleton.jsx`
- ✅ `client/src/components/UI/SkeletonCard.jsx`
- ✅ `client/src/components/UI/ScrollReveal.jsx`
- ✅ `client/src/components/UI/SkipToContent.jsx`
- ✅ `client/src/services/notificationService.js`

#### Documentation:
- ✅ `README_ARABIC.md` (هذا الملف)
- ✅ `DEPLOYMENT.md`
- ✅ `API_DOCUMENTATION.md`

### الملفات المُحدثة:

#### Backend:
- ✅ `api/models/Message.php` (إضافة `getNewMessages` method)
- ✅ `api/messages/send.php` (إضافة notification creation)
- ✅ `api/applications/create.php` (إضافة notification creation)
- ✅ `api/applications/update-status.php` (إضافة notification creation)
- ✅ `api/auth/login.php` (إضافة rate limiting + sanitization)
- ✅ `api/auth/register.php` (إضافة rate limiting + sanitization)
- ✅ `api/messages/send.php` (إضافة sanitization)
- ✅ `api/jobs/create.php` (إضافة sanitization)
- ✅ `api/jobs/update.php` (إضافة sanitization)
- ✅ `api/applications/create.php` (إضافة sanitization)
- ✅ `api/companies/update.php` (إضافة sanitization)

#### Frontend:
- ✅ `client/src/components/Messages/Conversation.jsx` (Real-time updates)
- ✅ `client/src/components/Messages/MessageInput.jsx` (Text-only, blur after send)
- ✅ `client/src/components/Notifications/NotificationBell.jsx` (Real notifications)
- ✅ `client/src/components/Notifications/NotificationList.jsx` (Real notifications)
- ✅ `client/src/components/Layout/Navbar.jsx` (Remove "Keşfet", add notifications)
- ✅ `client/src/components/Layout/CompanyNavbar.jsx` (Add notifications)
- ✅ `client/src/pages/Jobs/JobsPage.jsx` (Skeleton + ScrollReveal)
- ✅ `client/src/pages/Companies/CompaniesPage.jsx` (Skeleton + ScrollReveal)
- ✅ `client/src/pages/Dashboard.jsx` (Skeleton screens)
- ✅ `client/src/App.jsx` (Lazy loading + Code splitting)
- ✅ `client/src/index.css` (Animations + Accessibility)
- ✅ `client/vite.config.js` (Build optimization)
- ✅ `client/src/services/messageService.js` (New methods)

### الإحصائيات النهائية:

- **Backend**: 95% مكتمل
  - 8 Models
  - 57+ API Endpoints
  - Rate Limiting ✅
  - Input Sanitization ✅

- **Frontend**: 95% مكتمل
  - 20+ Pages
  - 90+ Components
  - Lazy Loading ✅
  - Code Splitting ✅
  - Skeleton Screens ✅
  - Accessibility ✅

- **Features**:
  - Real-time Messaging ✅
  - Notifications System ✅
  - Online/Offline Status ✅
  - Security Improvements ✅
  - Performance Optimization ✅

---

## 🎓 ملخص للعرض التقديمي

### النقاط الرئيسية:

1. **نظام المحادثة الفوري**:
   - يعمل بدون تحديث الصفحة
   - مشابه لـ WhatsApp/Messenger
   - مرتبط بالوظائف

2. **نظام الإشعارات**:
   - إشعارات تلقائية عند الأحداث المهمة
   - عدّاد الإشعارات غير المقروءة
   - قائمة منسدلة تفاعلية

3. **حالة الاتصال**:
   - "متصل الآن" فقط عندما يكون كلا المستخدمين في نفس المحادثة
   - Heartbeat system للتتبع

4. **تحسينات UI/UX**:
   - Skeleton screens
   - Scroll animations
   - Accessibility support

5. **تحسينات الأمان**:
   - Rate limiting
   - Input sanitization
   - XSS & SQL Injection protection

6. **تحسينات الأداء**:
   - Lazy loading
   - Code splitting
   - Image optimization

---

## 📞 للمزيد من المعلومات

- **README الرئيسي**: `README.md`
- **خطة المشروع**: `AYLIK_PLAN.md`
- **دليل النشر**: `DEPLOYMENT.md`
- **توثيق API**: `API_DOCUMENTATION.md`

---

**تم التحديث**: 15 يناير 2025  
**الإصدار**: 2.0.0  
**الحالة**: ✅ جاهز للاستخدام والتجربة

---

<div align="center">

**مشروع تخرج نهائي** ❤️  
**تم التطوير بـ**: React + PHP + MySQL

</div>

