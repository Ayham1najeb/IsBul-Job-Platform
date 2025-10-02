/**
 * Başvuru İşlemleri Bileşeni
 * Başvuru durumu güncelleme butonları
 */
import { Check, X, Eye, Clock } from 'lucide-react';

const ApplicationActions = ({ currentStatus, onStatusChange, loading }) => {
  const actions = [
    {
      status: 'inceleniyor',
      label: 'İncele',
      icon: Eye,
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      disabled: currentStatus === 'inceleniyor'
    },
    {
      status: 'kabul',
      label: 'Kabul Et',
      icon: Check,
      color: 'bg-green-600 hover:bg-green-700 text-white',
      disabled: currentStatus === 'kabul'
    },
    {
      status: 'red',
      label: 'Reddet',
      icon: X,
      color: 'bg-red-600 hover:bg-red-700 text-white',
      disabled: currentStatus === 'red'
    }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.status}
            onClick={() => onStatusChange(action.status)}
            disabled={action.disabled || loading}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
              ${action.disabled ? 'opacity-50 cursor-not-allowed' : action.color}
              ${loading ? 'opacity-50 cursor-wait' : ''}
            `}
          >
            <Icon className="w-4 h-4" />
            {action.label}
          </button>
        );
      })}
    </div>
  );
};

export default ApplicationActions;
