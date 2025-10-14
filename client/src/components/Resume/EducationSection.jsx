/**
 * Eğitim Bölümü
 */
import { useState } from 'react';
import { resumeService } from '../../services/resumeService';
import { Plus, Edit, Trash2, GraduationCap, Save, X } from 'lucide-react';

const EducationSection = ({ education, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    okul_adi: '',
    bolum: '',
    derece: 'lisans',
    baslangic_tarihi: '',
    bitis_tarihi: '',
    devam_ediyor: false,
    not_ortalamasi: '',
    aciklama: '',
    sehir: ''
  });

  const degrees = [
    { value: 'lise', label: 'Lise' },
    { value: 'onlisans', label: 'Ön Lisans' },
    { value: 'lisans', label: 'Lisans' },
    { value: 'yuksek_lisans', label: 'Yüksek Lisans' },
    { value: 'doktora', label: 'Doktora' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await resumeService.updateEducation({ ...formData, id: editingId });
        alert('✅ Eğitim başarıyla güncellendi!');
      } else {
        await resumeService.addEducation(formData);
        alert('✅ Eğitim başarıyla eklendi!');
      }
      resetForm();
      onUpdate();
    } catch (error) {
      console.error('Hata:', error);
      alert('❌ İşlem başarısız oldu: ' + (error.response?.data?.mesaj || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu eğitimi silmek istediğinizden emin misiniz?')) return;
    try {
      await resumeService.deleteEducation(id);
      onUpdate();
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  const handleEdit = (edu) => {
    setFormData(edu);
    setEditingId(edu.id);
    setIsAdding(true);
  };

  const resetForm = () => {
    setFormData({
      okul_adi: '',
      bolum: '',
      derece: 'lisans',
      baslangic_tarihi: '',
      bitis_tarihi: '',
      devam_ediyor: false,
      not_ortalamasi: '',
      aciklama: '',
      sehir: ''
    });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Eğitim</h2>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Eğitim Ekle
          </button>
        )}
      </div>

      {/* Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-6 bg-green-50 rounded-xl border-2 border-green-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Okul Adı *
              </label>
              <input
                type="text"
                required
                value={formData.okul_adi}
                onChange={(e) => setFormData({ ...formData, okul_adi: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Örn: İstanbul Üniversitesi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bölüm *
              </label>
              <input
                type="text"
                required
                value={formData.bolum}
                onChange={(e) => setFormData({ ...formData, bolum: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Örn: Bilgisayar Mühendisliği"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Derece *
              </label>
              <select
                value={formData.derece}
                onChange={(e) => setFormData({ ...formData, derece: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {degrees.map(degree => (
                  <option key={degree.value} value={degree.value}>{degree.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şehir
              </label>
              <input
                type="text"
                value={formData.sehir}
                onChange={(e) => setFormData({ ...formData, sehir: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Örn: İstanbul"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bitiş Tarihi
              </label>
              <input
                type="date"
                disabled={formData.devam_ediyor}
                value={formData.bitis_tarihi}
                onChange={(e) => setFormData({ ...formData, bitis_tarihi: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
              />
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={formData.devam_ediyor}
                  onChange={(e) => setFormData({ ...formData, devam_ediyor: e.target.checked, bitis_tarihi: '' })}
                  className="rounded text-green-600"
                />
                <span className="text-sm text-gray-600">Devam ediyor</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Not Ortalaması
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4"
                value={formData.not_ortalamasi}
                onChange={(e) => setFormData({ ...formData, not_ortalamasi: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Örn: 3.50"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama
              </label>
              <textarea
                rows="3"
                value={formData.aciklama}
                onChange={(e) => setFormData({ ...formData, aciklama: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Başarılar, projeler, kulüpler vb..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
        {education.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Henüz eğitim bilgisi eklenmemiş</p>
          </div>
        ) : (
          education.map((edu) => (
            <div key={edu.id} className="border-l-4 border-green-500 pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{edu.okul_adi}</h3>
                  <p className="text-gray-700">{edu.bolum}</p>
                  <p className="text-sm text-gray-500">
                    {edu.derece} • {edu.baslangic_tarihi} - {edu.devam_ediyor ? 'Devam Ediyor' : edu.bitis_tarihi}
                    {edu.not_ortalamasi && ` • GPA: ${edu.not_ortalamasi}`}
                  </p>
                  {edu.aciklama && (
                    <p className="text-sm text-gray-600 mt-2">{edu.aciklama}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
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

export default EducationSection;
