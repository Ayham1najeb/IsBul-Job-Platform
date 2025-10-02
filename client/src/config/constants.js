/**
 * Uygulama Sabitleri
 * Tüm uygulama genelinde kullanılan sabit değerler
 */

// Kullanıcı Rolleri
export const USER_ROLES = {
  JOB_SEEKER: 'is_arayan',
  COMPANY: 'firma',
  ADMIN: 'admin',
};

// Başvuru Durumları
export const APPLICATION_STATUS = {
  PENDING: 'beklemede',
  REVIEWING: 'inceleniyor',
  REJECTED: 'reddedildi',
  ACCEPTED: 'kabul_edildi',
  INTERVIEW: 'mülakat',
};

// Çalışma Şekli
export const WORK_TYPE = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  REMOTE: 'remote',
  HYBRID: 'hybrid',
  CONTRACT: 'contract',
};

// Pozisyon Seviyesi
export const POSITION_LEVEL = {
  ENTRY: 'entry',
  MID: 'mid',
  SENIOR: 'senior',
  LEAD: 'lead',
  MANAGER: 'manager',
};

// Cinsiyet
export const GENDER = {
  MALE: 'erkek',
  FEMALE: 'kadin',
  OTHER: 'diger',
};

// Rotalar
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  JOBS: '/jobs',
  JOB_DETAILS: '/jobs/:id',
  COMPANIES: '/companies',
  COMPANY_DETAILS: '/companies/:id',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  APPLICATIONS: '/applications',
  MESSAGES: '/messages',
  RESUME: '/resume',
  ADMIN: '/admin',
};
