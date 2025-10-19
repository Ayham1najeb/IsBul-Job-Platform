/**
 * Kullanıcı Yönetimi Sayfası
 * Kullanıcıları listeleme, düzenleme ve silme
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Edit, Trash2, CheckCircle, XCircle, 
  User, Briefcase, Shield, Loader 
} from 'lucide-react';
import DataTable from '../../components/Admin/DataTable';
import { adminService } from '../../services/adminService';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    loadUsers();
  }, [currentPage, searchTerm, selectedRole]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers({
        page: currentPage,
        limit: 20,
        search: searchTerm,
        rol: selectedRole
      });
      setUsers(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Kullanıcılar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await adminService.deleteUser(userId);
      alert('✅ Kullanıcı silindi');
      loadUsers();
    } catch (error) {
      alert('❌ Kullanıcı silinemedi: ' + (error.response?.data?.mesaj || error.message));
    }
  };

  const handleToggleVerification = async (userId, currentStatus) => {
    try {
      await adminService.updateUser(userId, {
        email_verified: !currentStatus
      });
      alert('✅ Kullanıcı güncellendi');
      loadUsers();
    } catch (error) {
      alert('❌ Kullanıcı güncellenemedi: ' + (error.response?.data?.mesaj || error.message));
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminService.updateUser(userId, {
        rol: newRole
      });
      alert('✅ Kullanıcı rolü güncellendi');
      loadUsers();
    } catch (error) {
      alert('❌ Rol güncellenemedi: ' + (error.response?.data?.mesaj || error.message));
    }
  };

  const getRoleBadge = (rol) => {
    const badges = {
      'is_arayan': { text: 'İş Arayan', icon: User, color: 'bg-blue-100 text-blue-800' },
      'firma': { text: 'Şirket', icon: Briefcase, color: 'bg-green-100 text-green-800' },
      'admin': { text: 'Admin', icon: Shield, color: 'bg-purple-100 text-purple-800' }
    };
    
    const badge = badges[rol] || badges['is_arayan'];
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {badge.text}
      </span>
    );
  };

  const columns = [
    {
      header: 'Kullanıcı',
      accessor: 'isim',
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.profil_foto ? (
            <img
              src={row.profil_foto}
              alt={row.isim}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{row.isim} {row.soyisim}</p>
            <p className="text-sm text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Telefon',
      accessor: 'telefon',
      render: (row) => row.telefon || '-'
    },
    {
      header: 'Şehir',
      accessor: 'sehir',
      render: (row) => row.sehir || '-'
    },
    {
      header: 'Rol',
      accessor: 'rol',
      render: (row) => getRoleBadge(row.rol)
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
      <select
        value={row.rol}
        onChange={(e) => handleRoleChange(row.id, e.target.value)}
        className="px-2 py-1 border border-gray-300 rounded text-sm"
      >
        <option value="is_arayan">İş Arayan</option>
        <option value="firma">Şirket</option>
        <option value="admin">Admin</option>
      </select>
      <button
        onClick={() => handleDelete(row.id)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Sil"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </>
  );

  if (loading && users.length === 0) {
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
                <h1 className="text-3xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
                <p className="text-gray-600 mt-1">Tüm kullanıcıları görüntüle ve yönet</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Tüm Roller</option>
                <option value="is_arayan">İş Arayan</option>
                <option value="firma">Şirket</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DataTable
          columns={columns}
          data={users}
          pagination={pagination}
          onPageChange={setCurrentPage}
          onSearch={(term) => {
            setSearchTerm(term);
            setCurrentPage(1);
          }}
          searchPlaceholder="İsim, e-posta veya telefon ile ara..."
          actions={actions}
        />
      </div>
    </div>
  );
};

export default UsersManagement;
