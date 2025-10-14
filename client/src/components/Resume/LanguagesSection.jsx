/**
 * Diller Bölümü
 */
import { useState } from 'react';
import { resumeService } from '../../services/resumeService';
import { Plus, Edit, Trash2, Languages, Save, X } from 'lucide-react';

const LanguagesSection = ({ languages, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    dil_adi: '',
    seviye: 'orta',
    okuma_seviyesi: 'orta',
    yazma_seviyesi: 'orta',
    konusma_seviyesi: 'orta',
    sertifika: ''
  });

  const levels = ['zayif', 'orta', 'iyi', 'cok_iyi'];
  const mainLevels = ['baslangic', 'orta', 'ileri', 'anadil'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await resumeService.updateLanguage({ ...formData, id: editingId });
        alert('✅ Dil başarıyla güncellendi!');
      } else {
        await resumeService.addLanguage(formData);
        alert('✅ Dil başarıyla eklendi!');
      }
      resetForm();
      onUpdate();
    } catch (error) {
      console.error('Hata:', error);
      alert('❌ İşlem başarısız oldu: ' + (error.response?.data?.mesaj || error.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await resumeService.deleteLanguage(id);
      onUpdate();
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  const handleEdit = (lang) => {
    setFormData(lang);
    setEditingId(lang.id);
    setIsAdding(true);
  };

  const resetForm = () => {
    setFormData({
      dil_adi: '',
      seviye: 'orta',
      okuma_seviyesi: 'orta',
      yazma_seviyesi: 'orta',
      konusma_seviyesi: 'orta',
      sertifika: ''
    });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Languages className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Diller</h2>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Dil Ekle
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-6 bg-indigo-50 rounded-xl border-2 border-indigo-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dil *</label>
              <input
                type="text"
                required
                value={formData.dil_adi}
                onChange={(e) => setFormData({ ...formData, dil_adi: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Örn: İngilizce"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Genel Seviye *</label>
              <select
                value={formData.seviye}
                onChange={(e) => setFormData({ ...formData, seviye: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                {mainLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Okuma</label>
              <select
                value={formData.okuma_seviyesi}
                onChange={(e) => setFormData({ ...formData, okuma_seviyesi: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Yazma</label>
              <select
                value={formData.yazma_seviyesi}
                onChange={(e) => setFormData({ ...formData, yazma_seviyesi: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Konuşma</label>
              <select
                value={formData.konusma_seviyesi}
                onChange={(e) => setFormData({ ...formData, konusma_seviyesi: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sertifika</label>
              <input
                type="text"
                value={formData.sertifika}
                onChange={(e) => setFormData({ ...formData, sertifika: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Örn: TOEFL 95"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
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
        {languages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Languages className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Henüz dil eklenmemiş</p>
          </div>
        ) : (
          languages.map((lang) => (
            <div key={lang.id} className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
              <div>
                <h4 className="font-semibold text-gray-900">{lang.dil_adi}</h4>
                <p className="text-sm text-gray-600">
                  Seviye: {lang.seviye} • Okuma: {lang.okuma_seviyesi} • Yazma: {lang.yazma_seviyesi} • Konuşma: {lang.konusma_seviyesi}
                </p>
                {lang.sertifika && <p className="text-xs text-indigo-600 mt-1">{lang.sertifika}</p>}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(lang)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(lang.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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

export default LanguagesSection;
