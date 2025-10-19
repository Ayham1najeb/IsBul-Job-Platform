/**
 * Özgeçmiş Sayfası
 * Kullanıcı özgeçmiş yönetimi ana sayfası
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resumeService } from '../../services/resumeService';
import { 
  FileText, 
  Loader, 
  Plus, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Languages, 
  Code,
  Edit,
  Download,
  Eye,
  Settings,
  Globe
} from 'lucide-react';

const ResumePage = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      setLoading(true);
      const data = await resumeService.getFullResume();
      setResumeData(data.data);
    } catch (error) {
      console.error('Özgeçmiş yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Özgeçmiş yükleniyor...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { 
      label: 'İş Deneyimi', 
      value: resumeData?.deneyimler?.length || 0, 
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Eğitim', 
      value: resumeData?.egitimler?.length || 0, 
      icon: GraduationCap,
      color: 'from-green-500 to-green-600'
    },
    { 
      label: 'Beceriler', 
      value: resumeData?.beceriler?.length || 0, 
      icon: Code,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'Sertifikalar', 
      value: resumeData?.sertifikalar?.length || 0, 
      icon: Award,
      color: 'from-orange-500 to-orange-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Özgeçmişim
                </h1>
                <p className="text-gray-600">Profesyonel özgeçmişinizi yönetin</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/resume/edit"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all"
              >
                <Edit className="w-4 h-4" />
                Düzenle
              </Link>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all">
                <Download className="w-4 h-4" />
                PDF İndir
              </button>
            </div>
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* İçerik */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Sol: Özgeçmiş Bölümleri */}
          <div className="lg:col-span-2 space-y-6">
            {/* İş Deneyimleri */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">İş Deneyimleri</h2>
                </div>
                <Link
                  to="/resume/edit#experience"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Ekle
                </Link>
              </div>

              {resumeData?.deneyimler?.length > 0 ? (
                <div className="space-y-4">
                  {resumeData.deneyimler.map((exp, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h3 className="font-semibold text-gray-900">{exp.pozisyon}</h3>
                      <p className="text-gray-700">{exp.sirket_adi}</p>
                      <p className="text-sm text-gray-500">
                        {exp.baslangic_tarihi} - {exp.halen_calisiyor ? 'Devam Ediyor' : exp.bitis_tarihi}
                      </p>
                      {exp.aciklama && (
                        <p className="text-sm text-gray-600 mt-2">{exp.aciklama}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Henüz iş deneyimi eklenmemiş</p>
                  <Link
                    to="/resume/edit#experience"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 inline-block"
                  >
                    İlk deneyiminizi ekleyin
                  </Link>
                </div>
              )}
            </div>

            {/* Eğitim */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Eğitim</h2>
                </div>
                <Link
                  to="/resume/edit#education"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Ekle
                </Link>
              </div>

              {resumeData?.egitimler?.length > 0 ? (
                <div className="space-y-4">
                  {resumeData.egitimler.map((edu, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                      <h3 className="font-semibold text-gray-900">{edu.okul_adi}</h3>
                      <p className="text-gray-700">{edu.bolum}</p>
                      <p className="text-sm text-gray-500">
                        {edu.derece} • {edu.baslangic_tarihi} - {edu.devam_ediyor ? 'Devam Ediyor' : edu.bitis_tarihi}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Henüz eğitim bilgisi eklenmemiş</p>
                  <Link
                    to="/resume/edit#education"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 inline-block"
                  >
                    Eğitim bilginizi ekleyin
                  </Link>
                </div>
              )}
            </div>

            {/* Beceriler */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Beceriler</h2>
                </div>
                <Link
                  to="/resume/edit#skills"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Ekle
                </Link>
              </div>

              {resumeData?.beceriler?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {resumeData.beceriler.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200"
                    >
                      {skill.beceri_adi} • {skill.seviye}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Code className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Henüz beceri eklenmemiş</p>
                  <Link
                    to="/resume/edit#skills"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 inline-block"
                  >
                    Becerilerinizi ekleyin
                  </Link>
                </div>
              )}
            </div>

            {/* Diller */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Diller</h2>
                </div>
                <Link
                  to="/resume/edit#languages"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Düzenle
                </Link>
              </div>
              {resumeData?.diller && resumeData.diller.length > 0 ? (
                <div className="space-y-3">
                  {resumeData.diller.map((lang) => (
                    <div key={lang.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h3 className="font-semibold text-gray-900">{lang.dil_adi}</h3>
                      <p className="text-sm text-gray-600">
                        Seviye: {lang.seviye} • Okuma: {lang.okuma_seviyesi} • Yazma: {lang.yazma_seviyesi} • Konuşma: {lang.konusma_seviyesi}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Henüz dil eklenmemiş</p>
                  <Link
                    to="/resume/edit#languages"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 inline-block"
                  >
                    Dillerinizi ekleyin
                  </Link>
                </div>
              )}
            </div>

            {/* Sertifikalar */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Sertifikalar</h2>
                </div>
                <Link
                  to="/resume/edit#certificates"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Düzenle
                </Link>
              </div>
              {resumeData?.sertifikalar && resumeData.sertifikalar.length > 0 ? (
                <div className="space-y-3">
                  {resumeData.sertifikalar.map((cert) => (
                    <div key={cert.id} className="border-l-4 border-orange-500 pl-4 py-2">
                      <h3 className="font-semibold text-gray-900">{cert.sertifika_adi}</h3>
                      <p className="text-gray-700">{cert.kurum}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(cert.tarih).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Henüz sertifika eklenmemiş</p>
                  <Link
                    to="/resume/edit#certificates"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 inline-block"
                  >
                    Sertifikalarınızı ekleyin
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sağ: Hızlı İşlemler */}
          <div className="lg:col-span-1 space-y-6">
            {/* Önizleme */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Önizleme</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Özgeçmişinizin nasıl göründüğünü görün
              </p>
              <Link
                to="/resume/preview"
                className="block w-full px-4 py-2 bg-primary-50 text-primary-700 rounded-xl hover:bg-primary-100 transition-colors text-center font-medium"
              >
                Önizlemeyi Aç
              </Link>
            </div>

            {/* Ayarlar */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Ayarlar</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Özgeçmiş görünürlüğü ve şablon ayarları
              </p>
              <Link
                to="/resume/settings"
                className="block w-full px-4 py-2 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-colors text-center font-medium"
              >
                Ayarları Düzenle
              </Link>
            </div>

            {/* Diller */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Languages className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Diller</h3>
                </div>
                <Link
                  to="/resume/edit#languages"
                  className="text-primary-600 hover:text-primary-700"
                >
                  <Plus className="w-4 h-4" />
                </Link>
              </div>
              {resumeData?.diller?.length > 0 ? (
                <div className="space-y-2">
                  {resumeData.diller.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{lang.dil_adi}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {lang.seviye}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Dil bilgisi eklenmemiş</p>
              )}
            </div>

            {/* Sertifikalar */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Sertifikalar</h3>
                </div>
                <Link
                  to="/resume/edit#certificates"
                  className="text-primary-600 hover:text-primary-700"
                >
                  <Plus className="w-4 h-4" />
                </Link>
              </div>
              {resumeData?.sertifikalar?.length > 0 ? (
                <div className="space-y-2">
                  {resumeData.sertifikalar.slice(0, 3).map((cert, index) => (
                    <div key={index} className="text-sm">
                      <p className="text-gray-900 font-medium">{cert.sertifika_adi}</p>
                      <p className="text-gray-500 text-xs">{cert.kurum}</p>
                    </div>
                  ))}
                  {resumeData.sertifikalar.length > 3 && (
                    <Link
                      to="/resume/edit#certificates"
                      className="text-primary-600 text-xs hover:text-primary-700"
                    >
                      +{resumeData.sertifikalar.length - 3} daha fazla
                    </Link>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Sertifika eklenmemiş</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
