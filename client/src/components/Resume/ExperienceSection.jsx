/**
 * İş Deneyimi Bölümü
 */
import { useState } from 'react';
import { resumeService } from '../../services/resumeService';
import { Plus, Edit, Trash2, Briefcase, Save, X } from 'lucide-react';

const ExperienceSection = ({ experiences, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    sirket_adi: '',
    pozisyon: '',
    baslangic_tarihi: '',
    bitis_tarihi: '',
    halen_calisiyor: false,
    aciklama: '',
    sehir: '',
    sektor: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await resumeService.updateExperience({ ...formData, id: editingId });
      } else {
        await resumeService.addExperience(formData);
      }
      resetForm();
      onUpdate();
    } catch (error) {
      console.error('Hata:', error);
      alert('İşlem başarısız oldu');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu deneyimi silmek istediğinizden emin misiniz?')) return;
    try {
      await resumeService.deleteExperience(id);
      onUpdate();
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  const handleEdit = (exp) => {
    setFormData(exp);
    setEditingId(exp.id);
    setIsAdding(true);
  };

  const resetForm = () => {
    setFormData({
      sirket_adi: '',
      pozisyon: '',
      baslangic_tarihi: '',
      bitis_tarihi: '',
      halen_calisiyor: false,
      aciklama: '',
      sehir: '',
      sektor: ''
    });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">İş Deneyimi</h2>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Deneyim Ekle
          </button>
        )}
      </div>

      {/* Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şirket Adı *
              </label>
              <input
                type="text"
                required
                value={formData.sirket_adi}
                onChange={(e) => setFormData({ ...formData, sirket_adi: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Örn: ABC Teknoloji A.Ş."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pozisyon *
              </label>
              <input
                type="text"
                required
                value={formData.pozisyon}
                onChange={(e) => setFormData({ ...formData, pozisyon: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Örn: Senior Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlangıç Tarihi *
              </label>
              <input
                type="date"
                required
                value={formData.baslangic_tarihi}
                onChange={(e) => setFormData({ ...formData, baslangic_tarihi: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bitiş Tarihi
              </label>
              <input
                type="date"
                disabled={formData.halen_calisiyor}
                value={formData.bitis_tarihi}
                onChange={(e) => setFormData({ ...formData, bitis_tarihi: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={formData.halen_calisiyor}
                  onChange={(e) => setFormData({ ...formData, halen_calisiyor: e.target.checked, bitis_tarihi: '' })}
                  className="rounded text-blue-600"
                />
                <span className="text-sm text-gray-600">Halen çalışıyorum</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şehir
              </label>
              <input
                type="text"
                value={formData.sehir}
                onChange={(e) => setFormData({ ...formData, sehir: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Örn: İstanbul"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sektör
              </label>
              <input
                type="text"
                value={formData.sektor}
                onChange={(e) => setFormData({ ...formData, sektor: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Örn: Yazılım"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama
              </label>
              <textarea
                rows="4"
                value={formData.aciklama}
                onChange={(e) => setFormData({ ...formData, aciklama: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="İş tanımınızı ve sorumluluklarınızı yazın..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              {editingId ? 'Güncelle' : 'Kaydet'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
              İptal
            </button>
          </div>
        </form>
      )}

      {/* Liste */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Henüz iş deneyimi eklenmemiş</p>
          </div>
        ) : (
          experiences.map((exp) => (
            <div key={exp.id} className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{exp.pozisyon}</h3>
                  <p className="text-gray-700">{exp.sirket_adi}</p>
                  <p className="text-sm text-gray-500">
                    {exp.baslangic_tarihi} - {exp.halen_calisiyor ? 'Devam Ediyor' : exp.bitis_tarihi}
                    {exp.sehir && ` • ${exp.sehir}`}
                  </p>
                  {exp.aciklama && (
                    <p className="text-sm text-gray-600 mt-2">{exp.aciklama}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;
