/**
 * Başvuran Adayın Özgeçmişi
 * Sadece başvuru yapan adayların CV'sini göster (Güvenli)
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader, AlertCircle, Briefcase, GraduationCap, Award, Globe, FileCheck } from 'lucide-react';
import { resumeService } from '../../services/resumeService';

const ViewApplicantResume = () => {
  const { kullaniciId, basvuruId } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadResume();
  }, [kullaniciId]);

  const loadResume = async () => {
    try {
      setLoading(true);
      const data = await resumeService.getUserResume(kullaniciId);
      console.log('CV Data:', data);
      setResume(data.data);
    } catch (error) {
      console.error('CV yüklenemedi:', error);
      console.error('Error details:', error.response?.data);
      setError('CV yüklenirken bir hata oluştu veya erişim yetkiniz yok.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">CV yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erişim Hatası</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/company/applications')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Başvurulara Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/company/applications')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Başvurulara Dön
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {resume.kullanici.isim} {resume.kullanici.soyisim}
          </h1>
          <p className="text-gray-600 mt-1">Özgeçmiş</p>
        </div>

        {/* İletişim */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">İletişim Bilgileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resume.kullanici.email && (
              <div>
                <div className="text-sm text-gray-600">E-posta</div>
                <a href={`mailto:${resume.kullanici.email}`} className="font-medium text-blue-600">
                  {resume.kullanici.email}
                </a>
              </div>
            )}
            {resume.kullanici.telefon && (
              <div>
                <div className="text-sm text-gray-600">Telefon</div>
                <a href={`tel:${resume.kullanici.telefon}`} className="font-medium text-gray-900">
                  {resume.kullanici.telefon}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Deneyimler */}
        {resume.deneyimler && resume.deneyimler.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center mb-4">
              <Briefcase className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">İş Deneyimi</h2>
            </div>
            <div className="space-y-4">
              {resume.deneyimler.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-gray-900">{exp.pozisyon}</h3>
                  <p className="text-gray-700">{exp.sirket_adi}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(exp.baslangic_tarihi).toLocaleDateString('tr-TR')} - 
                    {exp.halen_calisiyor ? ' Devam Ediyor' : ` ${new Date(exp.bitis_tarihi).toLocaleDateString('tr-TR')}`}
                  </p>
                  {exp.aciklama && <p className="text-gray-700 mt-2">{exp.aciklama}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Eğitim */}
        {resume.egitimler && resume.egitimler.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center mb-4">
              <GraduationCap className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Eğitim</h2>
            </div>
            <div className="space-y-4">
              {resume.egitimler.map((edu, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-bold text-gray-900">{edu.okul_adi}</h3>
                  <p className="text-gray-700">{edu.bolum}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(edu.baslangic_tarihi).toLocaleDateString('tr-TR')} - 
                    {edu.devam_ediyor ? ' Devam Ediyor' : ` ${new Date(edu.bitis_tarihi).toLocaleDateString('tr-TR')}`}
                  </p>
                  {edu.not_ortalamasi && <p className="text-sm text-gray-600">Not Ortalaması: {edu.not_ortalamasi}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Beceriler */}
        {resume.beceriler && resume.beceriler.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center mb-4">
              <Award className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Beceriler</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {resume.beceriler.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium"
                >
                  {skill.beceri_adi}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Diller */}
        {resume.diller && resume.diller.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Diller</h2>
            </div>
            <div className="space-y-3">
              {resume.diller.map((lang, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-gray-900">{lang.dil_adi}</h3>
                  <p className="text-sm text-gray-600">
                    Seviye: {lang.seviye} • Okuma: {lang.okuma_seviyesi} • Yazma: {lang.yazma_seviyesi} • Konuşma: {lang.konusma_seviyesi}
                  </p>
                  {lang.sertifika && <p className="text-sm text-gray-600">Sertifika: {lang.sertifika}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sertifikalar */}
        {resume.sertifikalar && resume.sertifikalar.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <FileCheck className="w-6 h-6 text-orange-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Sertifikalar</h2>
            </div>
            <div className="space-y-3">
              {resume.sertifikalar.map((cert, index) => (
                <div key={index} className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-bold text-gray-900">{cert.sertifika_adi}</h3>
                  <p className="text-gray-700">{cert.kurum}</p>
                  <p className="text-sm text-gray-600">
                    Tarih: {new Date(cert.tarih).toLocaleDateString('tr-TR')}
                    {cert.gecerlilik_tarihi && ` • Geçerlilik: ${new Date(cert.gecerlilik_tarihi).toLocaleDateString('tr-TR')}`}
                    {cert.sertifika_no && ` • No: ${cert.sertifika_no}`}
                  </p>
                  {cert.aciklama && <p className="text-gray-700 mt-1">{cert.aciklama}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewApplicantResume;
