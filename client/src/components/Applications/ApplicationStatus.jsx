/**
 * Başvuru Durum Badge Bileşeni
 * Başvuru durumunu renkli badge ile gösterir
 */

const ApplicationStatus = ({ durum }) => {
  const statusConfig = {
    'beklemede': {
      label: 'Beklemede',
      color: 'bg-yellow-100 text-yellow-800',
      icon: '⏳'
    },
    'inceleniyor': {
      label: 'İnceleniyor',
      color: 'bg-blue-100 text-blue-800',
      icon: '👀'
    },
    'kabul': {
      label: 'Kabul Edildi',
      color: 'bg-green-100 text-green-800',
      icon: '✅'
    },
    'red': {
      label: 'Reddedildi',
      color: 'bg-red-100 text-red-800',
      icon: '❌'
    }
  };

  const config = statusConfig[durum] || statusConfig['beklemede'];

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};

export default ApplicationStatus;
