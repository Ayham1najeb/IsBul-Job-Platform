// Format date to readable string
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format date to relative time (e.g., "2 days ago")
export const formatRelativeTime = (date) => {
  if (!date) return '';
  const now = new Date();
  const past = new Date(date);
  const diffInMs = now - past;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Bugün';
  if (diffInDays === 1) return 'Dün';
  if (diffInDays < 7) return `${diffInDays} gün önce`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} hafta önce`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} ay önce`;
  return `${Math.floor(diffInDays / 365)} yıl önce`;
};

// Truncate text to specified length
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Format salary range
export const formatSalary = (salaryRange) => {
  if (!salaryRange) return 'Belirtilmemiş';
  return salaryRange;
};

// Get initials from name
export const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return '?';
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return first + last;
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (Turkish format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+90|0)?[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Format phone number
export const formatPhone = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  return phone;
};

// Get file extension
export const getFileExtension = (filename) => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

// Check if file is valid image
export const isValidImage = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  return validTypes.includes(file.type);
};

// Check if file is valid PDF
export const isValidPDF = (file) => {
  return file.type === 'application/pdf';
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
