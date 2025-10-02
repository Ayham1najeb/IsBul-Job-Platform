/**
 * Başvuru Butonu Bileşeni
 * İlana başvuru yapma butonu
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Check, Loader } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import ApplicationModal from '../Applications/ApplicationModal';

const ApplyButton = ({ jobId, jobTitle, onApply }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const handleOpenModal = () => {
    // Giriş kontrolü
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: `/jobs/${jobId}` } });
      return;
    }

    // Sadece iş arayanlar başvurabilir
    if (user?.rol !== 'is_arayan') {
      alert('Sadece iş arayanlar başvuru yapabilir.');
      return;
    }

    setIsModalOpen(true);
  };

  const handleSubmitApplication = async (formData) => {
    try {
      await onApply({ ilan_id: jobId, ...formData });
      setHasApplied(true);
      alert('Başvurunuz alındı!');
    } catch (error) {
      console.error('Başvuru hatası:', error);
      throw error;
    }
  };

  // Başvuru yapıldıysa
  if (hasApplied) {
    return (
      <button
        disabled
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium cursor-not-allowed"
      >
        <Check className="w-5 h-5" />
        Başvuru Yapıldı
      </button>
    );
  }

  // Giriş yapılmamışsa
  if (!isAuthenticated()) {
    return (
      <button
        onClick={handleOpenModal}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
      >
        <Send className="w-5 h-5" />
        Başvur (Giriş Gerekli)
      </button>
    );
  }

  // Şirket hesabıysa
  if (user?.rol === 'firma') {
    return (
      <button
        disabled
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
      >
        Şirketler Başvuru Yapamaz
      </button>
    );
  }

  // Normal başvuru butonu
  return (
    <>
      <button
        onClick={handleOpenModal}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
      >
        <Send className="w-5 h-5" />
        Başvur
      </button>

      {/* Başvuru Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitApplication}
        jobTitle={jobTitle}
      />
    </>
  );
};

export default ApplyButton;
