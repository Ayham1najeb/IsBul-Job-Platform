/**
 * Sertifikalar Bölümü
 */
import { useState } from 'react';
import { resumeService } from '../../services/resumeService';
import { Plus, Edit, Trash2, Award, Save, X } from 'lucide-react';

const CertificatesSection = ({ certificates, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    sertifika_adi: '',
    kurum: '',
    tarih: '',
    gecerlilik_tarihi: '',
    sertifika_no: '',
    aciklama: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await resumeService.updateCertificate({ ...formData, id: editingId });
      } else {
        await resumeService.addCertificate(formData);
      }
      resetForm();
      onUpdate();
    } catch (error) {
      console.error('Hata:', error);
      alert('İşlem başarısız oldu');
    }
  };

  const handleDelete = async (id) => {
    try {
      await resumeService.deleteCertificate(id);
      onUpdate();
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  const handleEdit = (cert) => {
    setFormData(cert);
    setEditingId(cert.id);
    setIsAdding(true);
  };

  const resetForm = () => {
    setFormData({
      sertifika_adi: '',
      kurum: '',
      tarih: '',
      gecerlilik_tarihi: '',
      sertifika_no: '',
      aciklama: ''
    });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Sertifikalar</h2>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Sertifika Ekle
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-6 bg-orange-50 rounded-xl border-2 border-orange-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sertifika Adı *</label>
              <input
                type="text"
                required
                value={formData.sertifika_adi}
                onChange={(e) => setFormData({ ...formData, sertifika_adi: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Örn: AWS Certified Solutions Architect"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kurum *</label>
              <input
                type="text"
                required
                value={formData.kurum}
                onChange={(e) => setFormData({ ...formData, kurum: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Örn: Amazon Web Services"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tarih *</label>
              <input
                type="date"
                required
                value={formData.tarih}
                onChange={(e) => setFormData({ ...formData, tarih: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Geçerlilik Tarihi</label>
              <input
                type="date"
                value={formData.gecerlilik_tarihi}
                onChange={(e) => setFormData({ ...formData, gecerlilik_tarihi: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sertifika No</label>
              <input
                type="text"
                value={formData.sertifika_no}
                onChange={(e) => setFormData({ ...formData, sertifika_no: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Örn: ABC123XYZ"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
              <textarea
                rows="2"
                value={formData.aciklama}
                onChange={(e) => setFormData({ ...formData, aciklama: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
              <Save className="w-4 h-4" />
              {editingId ? 'Güncelle' : 'Kaydet'}
            </button>
            <button type="button" onClick={resetForm} className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              <X className="w-4 h-4" />
              İptal
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {certificates.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Henüz sertifika eklenmemiş</p>
          </div>
        ) : (
          certificates.map((cert) => (
            <div key={cert.id} className="flex items-start justify-between p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{cert.sertifika_adi}</h4>
                <p className="text-sm text-gray-700">{cert.kurum}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {cert.tarih} {cert.gecerlilik_tarihi && `• Geçerli: ${cert.gecerlilik_tarihi}`}
                  {cert.sertifika_no && ` • No: ${cert.sertifika_no}`}
                </p>
                {cert.aciklama && <p className="text-sm text-gray-600 mt-2">{cert.aciklama}</p>}
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button onClick={() => handleEdit(cert)} className="p-2 text-orange-600 hover:bg-orange-200 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(cert.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CertificatesSection;
