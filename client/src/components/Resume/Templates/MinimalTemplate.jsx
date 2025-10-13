/**
 * Minimal CV Template
 * Sade ve şık tasarım
 */
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Circle } from 'lucide-react';

const MinimalTemplate = ({ user, settings, resumeData }) => {
  return (
    <div className="p-12 bg-gray-50" style={{ minHeight: '1122px' }}>
      {/* Başlık - Minimal */}
      <div className="mb-12">
        <h1 className="text-5xl font-light text-gray-900 mb-3">
          {user.isim} {user.soyisim}
        </h1>
        {settings.baslik && (
          <p className="text-lg text-gray-600 font-light mb-6">{settings.baslik}</p>
        )}
        
        {/* İletişim Bilgileri - Minimal */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-600 font-light">
          {user.email && <span>{user.email}</span>}
          {user.telefon && <span>{user.telefon}</span>}
          {user.sehir && <span>{user.sehir}</span>}
        </div>

        {/* Sosyal Medya - Icons Only */}
        {(settings.linkedin_url || settings.github_url || settings.website_url) && (
          <div className="flex gap-4 mt-4">
            {settings.linkedin_url && (
              <a href={settings.linkedin_url} className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {settings.github_url && (
              <a href={settings.github_url} className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            )}
            {settings.website_url && (
              <a href={settings.website_url} className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Özet */}
      {settings.ozet && (
        <div className="mb-12">
          <p className="text-gray-700 leading-relaxed font-light">{settings.ozet}</p>
        </div>
      )}

      {/* İş Deneyimi */}
      {resumeData?.deneyimler?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-900 mb-6 uppercase tracking-widest">
            İş Deneyimi
          </h2>
          <div className="space-y-8">
            {resumeData.deneyimler.map((exp, index) => (
              <div key={index}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{exp.pozisyon}</h3>
                    <p className="text-gray-600 font-light">{exp.sirket_adi}</p>
                  </div>
                  <p className="text-sm text-gray-500 font-light">
                    {exp.baslangic_tarihi} - {exp.halen_calisiyor ? 'Şimdi' : exp.bitis_tarihi}
                  </p>
                </div>
                {exp.aciklama && (
                  <p className="text-sm text-gray-600 font-light mt-2">{exp.aciklama}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Eğitim */}
      {resumeData?.egitimler?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-900 mb-6 uppercase tracking-widest">
            Eğitim
          </h2>
          <div className="space-y-6">
            {resumeData.egitimler.map((edu, index) => (
              <div key={index}>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-medium text-gray-900">{edu.okul_adi}</h3>
                    <p className="text-gray-600 font-light">{edu.bolum}</p>
                  </div>
                  <p className="text-sm text-gray-500 font-light">
                    {edu.baslangic_tarihi} - {edu.devam_ediyor ? 'Şimdi' : edu.bitis_tarihi}
                  </p>
                </div>
                <p className="text-sm text-gray-500 font-light">
                  {edu.derece}
                  {edu.not_ortalamasi && ` • GPA: ${edu.not_ortalamasi}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Beceriler */}
      {resumeData?.beceriler?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-900 mb-6 uppercase tracking-widest">
            Beceriler
          </h2>
          <div className="flex flex-wrap gap-4">
            {resumeData.beceriler.map((skill, index) => (
              <span
                key={index}
                className="text-sm text-gray-700 font-light"
              >
                {skill.beceri_adi}
                {index < resumeData.beceriler.length - 1 && ' •'}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Diller & Sertifikalar - Side by Side */}
      <div className="grid grid-cols-2 gap-12">
        {/* Diller */}
        {resumeData?.diller?.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-gray-900 mb-6 uppercase tracking-widest">
              Diller
            </h2>
            <div className="space-y-2">
              {resumeData.diller.map((lang, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-900 font-light">{lang.dil_adi}</span>
                  <span className="text-sm text-gray-500 font-light">{lang.seviye}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sertifikalar */}
        {resumeData?.sertifikalar?.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-gray-900 mb-6 uppercase tracking-widest">
              Sertifikalar
            </h2>
            <div className="space-y-3">
              {resumeData.sertifikalar.map((cert, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900 text-sm">{cert.sertifika_adi}</h3>
                  <p className="text-xs text-gray-600 font-light">{cert.kurum} • {cert.tarih}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;
