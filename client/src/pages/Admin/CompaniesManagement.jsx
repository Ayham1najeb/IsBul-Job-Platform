/**
 * Şirket Yönetimi Sayfası
 * Şirketleri listeleme ve yönetme
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Building2, Mail, Phone, MapPin, 
  CheckCircle, XCircle, Loader, User 
} from 'lucide-react';
import DataTable from '../../components/Admin/DataTable';
import { adminService } from '../../services/adminService';

const CompaniesManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCompanies();
  }, [currentPage, searchTerm]);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers({
        page: currentPage,
        limit: 20,
        search: searchTerm,
        rol: 'firma'
      });
      setCompanies(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Şirketler yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVerification = async (userId, currentStatus) => {
    try {
      await adminService.updateUser(userId, {
        email_verified: !currentStatus
      });
      alert('✅ Şirket güncellendi');
      loadCompanies();
    } catch (error) {
      alert('❌ Şirket güncellenemedi: ' + (error.response?.data?.mesaj || error.message));
    }
  };

  const columns = [
    {
      header: 'Şirket',
      accessor: 'isim',
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.profil_foto ? (
            <img
              src={row.profil_foto}
              alt={row.isim}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-500" />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{row.isim} {row.soyisim}</p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Mail className="w-3 h-3" />
              <span>{row.email}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'İletişim',
      accessor: 'telefon',
      render: (row) => (
        <div className="space-y-1">
          {row.telefon && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{row.telefon}</span>
            </div>
          )}
          {row.sehir && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{row.sehir}</span>
            </div>
          )}
        </div>
      )
    },
    {
      header: 'E-posta Doğrulama',
      accessor: 'email_verified',
      render: (row) => (
        <button
          onClick={() => handleToggleVerification(row.id, row.email_verified)}
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            row.email_verified
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {row.email_verified ? (
            <>
              <CheckCircle className="w-3 h-3" />
              Doğrulandı
            </>
          ) : (
            <>
              <XCircle className="w-3 h-3" />
              Doğrulanmadı
            </>
          )}
        </button>
      )
    },
    {
      header: 'Kayıt Tarihi',
      accessor: 'olusturulma_tarihi',
      render: (row) => new Date(row.olusturulma_tarihi).toLocaleDateString('tr-TR')
    }
  ];

  const actions = (row) => (
    <>
      <Link
        to={`/company/${row.id}`}
        className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      >
        Görüntüle
      </Link>
    </>
  );

  if (loading && companies.length === 0) {
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
                <h1 className="text-3xl font-bold text-gray-900">Şirket Yönetimi</h1>
                <p className="text-gray-600 mt-1">Şirketleri görüntüle ve yönet</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DataTable
          columns={columns}
          data={companies}
          pagination={pagination}
          onPageChange={setCurrentPage}
          onSearch={(term) => {
            setSearchTerm(term);
            setCurrentPage(1);
          }}
          searchPlaceholder="Şirket adı veya e-posta ile ara..."
          actions={actions}
        />
      </div>
    </div>
  );
};

export default CompaniesManagement;
