/**
 * Özgeçmiş Düzenleme Sayfası
 * Tüm özgeçmiş bölümlerini düzenleme
 */
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resumeService } from '../../services/resumeService';
import ExperienceSection from '../../components/Resume/ExperienceSection';
import EducationSection from '../../components/Resume/EducationSection';
import SkillsSection from '../../components/Resume/SkillsSection';
import LanguagesSection from '../../components/Resume/LanguagesSection';
import CertificatesSection from '../../components/Resume/CertificatesSection';
import { 
  FileText, 
  Loader, 
  Save,
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  Award,
  ChevronRight
} from 'lucide-react';

const EditResumePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('experience');
  const [resumeData, setResumeData] = useState({
    deneyimler: [],
    egitimler: [],
    beceriler: [],
    diller: [],
    sertifikalar: []
  });

  useEffect(() => {
    loadResume();
  }, []);

  useEffect(() => {
    // Hash'e göre aktif bölümü ayarla ve scroll yap
    const hash = location.hash.replace('#', '');
    if (hash) {
      setActiveSection(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const yOffset = -100; // Navbar yüksekliği için offset
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location.hash]);

  const loadResume = async () => {
    try {
      setLoading(true);
      const data = await resumeService.getFullResume();
      setResumeData(data.data || {
        deneyimler: [],
        egitimler: [],
        beceriler: [],
        diller: [],
        sertifikalar: []
      });
    } catch (error) {
      console.error('Özgeçmiş yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Kaydetme işlemi her bölüm kendi içinde yapılıyor
      alert('✅ Tüm değişiklikler kaydedildi!');
      navigate('/resume');
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      alert('❌ Kaydetme sırasında bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { id: 'experience', label: 'İş Deneyimi', icon: Briefcase, color: 'blue' },
    { id: 'education', label: 'Eğitim', icon: GraduationCap, color: 'green' },
    { id: 'skills', label: 'Beceriler', icon: Code, color: 'purple' },
    { id: 'languages', label: 'Diller', icon: Languages, color: 'indigo' },
    { id: 'certificates', label: 'Sertifikalar', icon: Award, color: 'orange' }
  ];

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
                  Özgeçmiş Düzenle
                </h1>
                <p className="text-gray-600">Bilgilerinizi güncelleyin</p>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sol: Navigasyon */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Bölümler</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection(section.id);
                      setTimeout(() => {
                        const element = document.getElementById(section.id);
                        if (element) {
                          const yOffset = -100;
                          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeSection === section.id
                        ? `bg-${section.color}-50 text-${section.color}-700 border-l-4 border-${section.color}-600`
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Sağ: Bölümler */}
          <div className="lg:col-span-3 space-y-6">
            {/* İş Deneyimi */}
            <div id="experience">
              <ExperienceSection 
                experiences={resumeData.deneyimler || []}
                onUpdate={loadResume}
              />
            </div>

            {/* Eğitim */}
            <div id="education">
              <EducationSection 
                education={resumeData.egitimler || []}
                onUpdate={loadResume}
              />
            </div>

            {/* Beceriler */}
            <div id="skills">
              <SkillsSection 
                skills={resumeData.beceriler || []}
                onUpdate={loadResume}
              />
            </div>

            {/* Diller */}
            <div id="languages">
              <LanguagesSection 
                languages={resumeData.diller || []}
                onUpdate={loadResume}
              />
            </div>

            {/* Sertifikalar */}
            <div id="certificates">
              <CertificatesSection 
                certificates={resumeData.sertifikalar || []}
                onUpdate={loadResume}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditResumePage;
