/**
 * Klasik CV Template
 * Profesyonel ve resmi tasarım
 */
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Briefcase, GraduationCap, Code, Languages, Award } from 'lucide-react';

const KlasikTemplate = ({ user, settings, resumeData }) => {
  return (
    <div className="p-12 bg-white" style={{ minHeight: '1122px' }}>
      {/* Başlık - Klasik */}
      <div className="border-b-4 border-gray-800 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
          {user.isim} {user.soyisim}
        </h1>
        {settings.baslik && (
          <p className="text-xl text-gray-700 font-medium mb-4">{settings.baslik}</p>
        )}
        
        {/* İletişim Bilgileri */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {user.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {user.email}
            </div>
          )}
          {user.telefon && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {user.telefon}
            </div>
          )}
          {user.sehir && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {user.sehir}
            </div>
          )}
        </div>

        {/* Sosyal Medya */}
        {(settings.linkedin_url || settings.github_url || settings.website_url) && (
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-700">
            {settings.linkedin_url && (
              <a href={settings.linkedin_url} className="flex items-center gap-2 hover:text-gray-900">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            )}
            {settings.github_url && (
              <a href={settings.github_url} className="flex items-center gap-2 hover:text-gray-900">
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            {settings.website_url && (
              <a href={settings.website_url} className="flex items-center gap-2 hover:text-gray-900">
                <Globe className="w-4 h-4" />
                Website
              </a>
            )}
          </div>
        )}
      </div>

      {/* Özet */}
      {settings.ozet && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
            Özet
          </h2>
          <p className="text-gray-700 leading-relaxed">{settings.ozet}</p>
        </div>
      )}

      {/* İş Deneyimi */}
      {resumeData?.deneyimler?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            İş Deneyimi
          </h2>
          <div className="space-y-4">
            {resumeData.deneyimler.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-400 pl-4">
                <h3 className="font-bold text-gray-900">{exp.pozisyon}</h3>
                <p className="text-gray-700 font-medium">{exp.sirket_adi}</p>
                <p className="text-sm text-gray-500">
                  {exp.baslangic_tarihi} - {exp.halen_calisiyor ? 'Devam Ediyor' : exp.bitis_tarihi}
                  {exp.sehir && ` • ${exp.sehir}`}
                </p>
                {exp.aciklama && (
                  <p className="text-sm text-gray-600 mt-2">{exp.aciklama}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Eğitim */}
      {resumeData?.egitimler?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Eğitim
          </h2>
          <div className="space-y-4">
            {resumeData.egitimler.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-400 pl-4">
                <h3 className="font-bold text-gray-900">{edu.okul_adi}</h3>
                <p className="text-gray-700">{edu.bolum}</p>
                <p className="text-sm text-gray-500">
                  {edu.derece} • {edu.baslangic_tarihi} - {edu.devam_ediyor ? 'Devam Ediyor' : edu.bitis_tarihi}
                  {edu.not_ortalamasi && ` • GPA: ${edu.not_ortalamasi}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Beceriler */}
      {resumeData?.beceriler?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2 flex items-center gap-2">
            <Code className="w-5 h-5" />
            Beceriler
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.beceriler.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-gray-800 text-sm font-medium border border-gray-400"
              >
                {skill.beceri_adi}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Diller */}
      {resumeData?.diller?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2 flex items-center gap-2">
            <Languages className="w-5 h-5" />
            Diller
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {resumeData.diller.map((lang, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-900 font-medium">{lang.dil_adi}</span>
                <span className="text-sm text-gray-600">{lang.seviye}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sertifikalar */}
      {resumeData?.sertifikalar?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Sertifikalar
          </h2>
          <div className="space-y-3">
            {resumeData.sertifikalar.map((cert, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900">{cert.sertifika_adi}</h3>
                <p className="text-sm text-gray-700">{cert.kurum} • {cert.tarih}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KlasikTemplate;
