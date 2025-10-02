/**
 * İlan Oluşturma Sayfası
 * Yeni iş ilanı oluşturma
 */
import { useNavigate } from 'react-router-dom';
import { jobService } from '../../services/jobService';
import JobForm from '../../components/Company/JobForm';
import { ArrowLeft } from 'lucide-react';

const CreateJobPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await jobService.createJob(formData);
      alert('İlan başarıyla oluşturuldu!');
      navigate('/company/jobs');
    } catch (error) {
      console.error('İlan oluşturma hatası:', error);
      alert(error.response?.data?.mesaj || 'İlan oluşturulamadı.');
    }
  };

  const handleCancel = () => {
    navigate('/company/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/company/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Panele Dön
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Yeni İlan Oluştur</h1>
          <p className="text-gray-600 mt-2">
            İş ilanı bilgilerini doldurun
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <JobForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateJobPage;
