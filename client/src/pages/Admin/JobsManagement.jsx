/**
 * İlan Yönetimi Sayfası
 * İş ilanlarını listeleme ve moderasyon
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle, XCircle, Eye, Loader, 
  Briefcase, MapPin, Calendar, Building2 
} from 'lucide-react';
import DataTable from '../../components/Admin/DataTable';
import { adminService } from '../../services/adminService';
import { jobService } from '../../services/jobService';

const JobsManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    loadJobs();
  }, [currentPage, searchTerm, selectedStatus]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await jobService.getJobs({
        page: currentPage,
        limit: 20,
        search: searchTerm,
        durum: selectedStatus
      });
      setJobs(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('İlanlar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModerate = async (jobId, action) => {
    const confirmMessage = action === 'approve' 
      ? 'Bu ilanı onaylamak istediğinizden emin misiniz?' 
      : 'Bu ilanı reddetmek istediğinizden emin misiniz?';
    
    if (!confirm(confirmMessage)) {
      return;
    }

    let reason = '';
    if (action === 'reject') {
      reason = prompt('Red sebebini girin (opsiyonel):') || '';
    }

    try {
      await adminService.moderate('job', jobId, action, reason);
      alert(`✅ İlan ${action === 'approve' ? 'onaylandı' : 'reddedildi'}`);
      loadJobs();
    } catch (error) {
      alert('❌ İşlem başarısız: ' + (error.response?.data?.mesaj || error.message));
    }
  };

  const getStatusBadge = (durum) => {
    const badges = {
      'aktif': { text: 'Aktif', color: 'bg-green-100 text-green-800' },
      'pasif': { text: 'Pasif', color: 'bg-gray-100 text-gray-800' },
      'beklemede': { text: 'Beklemede', color: 'bg-yellow-100 text-yellow-800' },
      'reddedildi': { text: 'Reddedildi', color: 'bg-red-100 text-red-800' }
    };
    
    const badge = badges[durum] || badges['beklemede'];
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  const columns = [
    {
      header: 'İlan',
      accessor: 'baslik',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.baslik}</p>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <Building2 className="w-4 h-4" />
            <span>{row.firma_adi || 'Şirket Adı'}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Konum',
      accessor: 'sehir',
      render: (row) => (
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{row.sehir}</span>
        </div>
      )
    },
    {
      header: 'Kategori',
      accessor: 'kategori_adi',
      render: (row) => row.kategori_adi || '-'
    },
    {
      header: 'Çalışma Şekli',
      accessor: 'calisma_sekli',
      render: (row) => {
        const types = {
          'tam_zamanli': 'Tam Zamanlı',
          'yari_zamanli': 'Yarı Zamanlı',
          'freelance': 'Freelance',
          'staj': 'Staj'
        };
        return types[row.calisma_sekli] || row.calisma_sekli;
      }
    },
    {
      header: 'Durum',
      accessor: 'durum',
      render: (row) => getStatusBadge(row.durum)
    },
    {
      header: 'Oluşturulma',
      accessor: 'olusturulma_tarihi',
      render: (row) => (
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date(row.olusturulma_tarihi).toLocaleDateString('tr-TR')}</span>
        </div>
      )
    }
  ];

  const actions = (row) => (
    <>
      <Link
        to={`/jobs/${row.id}`}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="Görüntüle"
      >
        <Eye className="w-4 h-4" />
      </Link>
      {row.durum === 'beklemede' && (
        <>
          <button
            onClick={() => handleModerate(row.id, 'approve')}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Onayla"
          >
            <CheckCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleModerate(row.id, 'reject')}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Reddet"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </>
      )}
    </>
  );

  if (loading && jobs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">İlan Yönetimi</h1>
                <p className="text-gray-600 mt-1">İş ilanlarını görüntüle ve modera et</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Tüm Durumlar</option>
                <option value="aktif">Aktif</option>
                <option value="beklemede">Beklemede</option>
                <option value="pasif">Pasif</option>
                <option value="reddedildi">Reddedildi</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DataTable
          columns={columns}
          data={jobs}
          pagination={pagination}
          onPageChange={setCurrentPage}
          onSearch={(term) => {
            setSearchTerm(term);
            setCurrentPage(1);
          }}
          searchPlaceholder="İlan başlığı veya şirket adı ile ara..."
          actions={actions}
        />
      </div>
    </div>
  );
};

export default JobsManagement;
