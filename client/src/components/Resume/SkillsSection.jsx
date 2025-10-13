/**
 * Beceriler Bölümü
 */
import { useState } from 'react';
import { resumeService } from '../../services/resumeService';
import { Plus, Trash2, Code, Save, X } from 'lucide-react';

const SkillsSection = ({ skills, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    beceri_adi: '',
    kategori: '',
    seviye: 'orta',
    yil_deneyim: 0
  });

  const levels = [
    { value: 'baslangic', label: 'Başlangıç', color: 'gray' },
    { value: 'orta', label: 'Orta', color: 'blue' },
    { value: 'ileri', label: 'İleri', color: 'purple' },
    { value: 'uzman', label: 'Uzman', color: 'green' }
  ];

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Design', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resumeService.addSkill(formData);
      resetForm();
      onUpdate();
    } catch (error) {
      console.error('Hata:', error);
      alert('İşlem başarısız oldu');
    }
  };

  const handleDelete = async (id) => {
    try {
      await resumeService.deleteSkill(id);
      onUpdate();
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      beceri_adi: '',
      kategori: '',
      seviye: 'orta',
      yil_deneyim: 0
    });
    setIsAdding(false);
  };

  const getLevelColor = (level) => {
    const levelObj = levels.find(l => l.value === level);
    return levelObj?.color || 'gray';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Beceriler</h2>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Beceri Ekle
          </button>
        )}
      </div>

      {/* Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beceri Adı *
              </label>
              <input
                type="text"
                required
                value={formData.beceri_adi}
                onChange={(e) => setFormData({ ...formData, beceri_adi: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Örn: React, Python, Photoshop"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Seçiniz</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seviye *
              </label>
              <select
                value={formData.seviye}
                onChange={(e) => setFormData({ ...formData, seviye: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deneyim (Yıl)
              </label>
              <input
                type="number"
                min="0"
                value={formData.yil_deneyim}
                onChange={(e) => setFormData({ ...formData, yil_deneyim: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Kaydet
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
        {skills.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Code className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Henüz beceri eklenmemiş</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className={`group relative px-4 py-2 bg-${getLevelColor(skill.seviye)}-50 border border-${getLevelColor(skill.seviye)}-200 rounded-full flex items-center gap-2 hover:shadow-md transition-all`}
              >
                <span className="font-medium text-gray-900">{skill.beceri_adi}</span>
                <span className={`text-xs text-${getLevelColor(skill.seviye)}-600 bg-${getLevelColor(skill.seviye)}-100 px-2 py-0.5 rounded-full`}>
                  {skill.seviye}
                </span>
                {skill.yil_deneyim > 0 && (
                  <span className="text-xs text-gray-500">
                    {skill.yil_deneyim}y
                  </span>
                )}
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="opacity-0 group-hover:opacity-100 ml-2 p-1 text-red-600 hover:bg-red-50 rounded-full transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
