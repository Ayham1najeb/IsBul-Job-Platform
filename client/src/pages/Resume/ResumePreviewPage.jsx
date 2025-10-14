/**
 * Özgeçmiş Önizleme Sayfası
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeService } from '../../services/resumeService';
import { useAuthStore } from '../../store/authStore';
import KlasikTemplate from '../../components/Resume/Templates/KlasikTemplate';
import MinimalTemplate from '../../components/Resume/Templates/MinimalTemplate';
import { 
  Eye, 
  Loader, 
  Download, 
  Edit,
  RefreshCw
} from 'lucide-react';

const ResumePreviewPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('klasik');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    loadResume();
  }, [refreshKey]);

  const loadResume = async () => {
    try {
      setLoading(true);
      const data = await resumeService.getFullResume();
      console.log('Yüklenen özgeçmiş verisi:', data);
      console.log('Deneyimler:', data.data?.deneyimler);
      setResumeData(data.data);
      if (data.data?.ayarlar?.pdf_template && data.data.ayarlar.pdf_template !== 'modern') {
        setSelectedTemplate(data.data.ayarlar.pdf_template);
      }
    } catch (error) {
      console.error('Özgeçmiş yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleDownloadPDF = async () => {
    try {
      setDownloading(true);
      
      const { jsPDF } = await import('jspdf');
      await import('jspdf-autotable');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      let yPos = 20;
      const pageWidth = 210;
      const margin = selectedTemplate === 'minimal' ? 25 : 20;
      const contentWidth = pageWidth - (2 * margin);

      // Başlık - farklı stiller
      if (selectedTemplate === 'klasik') {
        pdf.setFontSize(26);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${user.isim.toUpperCase()} ${user.soyisim.toUpperCase()}`, margin, yPos);
        yPos += 10;
      } else if (selectedTemplate === 'minimal') {
        pdf.setFontSize(32);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${user.isim} ${user.soyisim}`, margin, yPos);
        yPos += 12;
      }

      // Alt başlık
      if (settings.baslik) {
        pdf.setFontSize(selectedTemplate === 'minimal' ? 12 : 14);
        pdf.setFont('helvetica', selectedTemplate === 'klasik' ? 'bold' : 'normal');
        pdf.setTextColor(selectedTemplate === 'minimal' ? 100 : 0);
        pdf.text(settings.baslik, margin, yPos);
        yPos += 8;
        pdf.setTextColor(0);
      }

      // İletişim bilgileri
      pdf.setFontSize(10);
      let contactInfo = [];
      if (user.email) contactInfo.push(user.email);
      if (user.telefon) contactInfo.push(user.telefon);
      if (user.sehir) contactInfo.push(user.sehir);
      if (contactInfo.length > 0) {
        pdf.text(contactInfo.join(' | '), margin, yPos);
        yPos += 6;
      }

      // Sosyal medya
      let socialLinks = [];
      if (settings.linkedin_url) socialLinks.push(`LinkedIn: ${settings.linkedin_url}`);
      if (settings.github_url) socialLinks.push(`GitHub: ${settings.github_url}`);
      if (settings.website_url) socialLinks.push(`Website: ${settings.website_url}`);
      if (socialLinks.length > 0) {
        pdf.setFontSize(8);
        pdf.text(socialLinks.join(' | '), margin, yPos);
        yPos += 10;
      }

      // Çizgi - sadece Klasik'te kalın
      if (selectedTemplate === 'klasik') {
        pdf.setDrawColor(0);
        pdf.setLineWidth(1);
        pdf.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;
      } else if (selectedTemplate === 'minimal') {
        pdf.setDrawColor(200);
        pdf.setLineWidth(0.3);
        pdf.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
      } else {
        yPos += 4;
      }

      // Özet
      if (settings.ozet) {
        const headerSize = selectedTemplate === 'minimal' ? 10 : 12;
        pdf.setFontSize(headerSize);
        pdf.setFont('helvetica', selectedTemplate === 'minimal' ? 'bold' : 'bold');
        pdf.text(selectedTemplate === 'klasik' ? 'ÖZET' : 'Özet', margin, yPos);
        yPos += 6;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const ozetLines = pdf.splitTextToSize(settings.ozet, contentWidth);
        pdf.text(ozetLines, margin, yPos);
        yPos += (ozetLines.length * 5) + 8;
      }

      // İş Deneyimi
      if (resumeData?.deneyimler?.length > 0) {
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('İŞ DENEYİMİ', margin, yPos);
        yPos += 8;

        resumeData.deneyimler.forEach((exp, index) => {
          if (yPos > 270) {
            pdf.addPage();
            yPos = 20;
          }

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          pdf.text(exp.pozisyon, margin, yPos);
          yPos += 5;

          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.text(exp.sirket_adi, margin, yPos);
          yPos += 5;

          pdf.setFontSize(9);
          pdf.setTextColor(100);
          const tarih = `${exp.baslangic_tarihi} - ${exp.halen_calisiyor ? 'Devam Ediyor' : exp.bitis_tarihi}`;
          pdf.text(tarih + (exp.sehir ? ` | ${exp.sehir}` : ''), margin, yPos);
          yPos += 5;

          if (exp.aciklama) {
            pdf.setTextColor(0);
            const aciklamaLines = pdf.splitTextToSize(exp.aciklama, contentWidth);
            pdf.text(aciklamaLines, margin, yPos);
            yPos += (aciklamaLines.length * 4) + 6;
          } else {
            yPos += 4;
          }
        });
        yPos += 4;
      }

      // Eğitim
      if (resumeData?.egitimler?.length > 0) {
        if (yPos > 250) {
          pdf.addPage();
          yPos = 20;
        }

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0);
        pdf.text('EĞİTİM', margin, yPos);
        yPos += 8;

        resumeData.egitimler.forEach((edu) => {
          if (yPos > 270) {
            pdf.addPage();
            yPos = 20;
          }

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          pdf.text(edu.okul_adi, margin, yPos);
          yPos += 5;

          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.text(edu.bolum, margin, yPos);
          yPos += 5;

          pdf.setFontSize(9);
          pdf.setTextColor(100);
          const egitimInfo = `${edu.derece} | ${edu.baslangic_tarihi} - ${edu.devam_ediyor ? 'Devam Ediyor' : edu.bitis_tarihi}`;
          pdf.text(egitimInfo + (edu.not_ortalamasi ? ` | GPA: ${edu.not_ortalamasi}` : ''), margin, yPos);
          yPos += 8;
          pdf.setTextColor(0);
        });
        yPos += 4;
      }

      // Beceriler
      if (resumeData?.beceriler?.length > 0) {
        if (yPos > 260) {
          pdf.addPage();
          yPos = 20;
        }

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('BECERİLER', margin, yPos);
        yPos += 6;

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const beceriler = resumeData.beceriler.map(b => b.beceri_adi).join(' • ');
        const becerilerLines = pdf.splitTextToSize(beceriler, contentWidth);
        pdf.text(becerilerLines, margin, yPos);
        yPos += (becerilerLines.length * 5) + 6;
      }

      // Diller ve Sertifikalar yan yana
      const hasLanguages = resumeData?.diller?.length > 0;
      const hasCerts = resumeData?.sertifikalar?.length > 0;

      if (hasLanguages || hasCerts) {
        if (yPos > 240) {
          pdf.addPage();
          yPos = 20;
        }

        const halfWidth = (contentWidth / 2) - 5;

        // Diller (sol)
        if (hasLanguages) {
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text('DİLLER', margin, yPos);
          
          let langYPos = yPos + 6;
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          resumeData.diller.forEach((lang) => {
            pdf.text(`${lang.dil_adi}: ${lang.seviye}`, margin, langYPos);
            langYPos += 5;
          });
        }

        // Sertifikalar (sağ)
        if (hasCerts) {
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text('SERTİFİKALAR', margin + halfWidth + 10, yPos);
          
          let certYPos = yPos + 6;
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          resumeData.sertifikalar.forEach((cert) => {
            pdf.text(cert.sertifika_adi, margin + halfWidth + 10, certYPos);
            certYPos += 4;
            pdf.setFontSize(8);
            pdf.setTextColor(100);
            pdf.text(`${cert.kurum} | ${cert.tarih}`, margin + halfWidth + 10, certYPos);
            certYPos += 6;
            pdf.setFontSize(10);
            pdf.setTextColor(0);
          });
        }
      }

      // PDF'i kaydet
      pdf.save(`${user.isim}_${user.soyisim}_CV_${selectedTemplate}.pdf`);
      
      setTimeout(() => {
        alert('✅ PDF başarıyla indirildi!');
      }, 500);
      
    } catch (error) {
      console.error('PDF indirme hatası:', error);
      console.error('Hata detayı:', error.message);
      alert(`❌ PDF indirilemedi.\nHata: ${error.message}\nLütfen tekrar deneyin.`);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 flex items-center justify-center">
        <Loader className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    );
  }

  const settings = resumeData?.ayarlar || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Özgeçmiş Önizleme
                </h1>
                <p className="text-gray-600">Özgeçmişinizin nasıl göründüğünü görün</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                title="Yenile"
              >
                <RefreshCw className="w-4 h-4" />
                Yenile
              </button>
              <button
                onClick={() => navigate('/resume/edit')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
              >
                <Edit className="w-4 h-4" />
                Düzenle
              </button>
              <button 
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    İndiriliyor...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    PDF İndir
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Template Seçici */}
        <div className="mb-6 bg-white rounded-xl shadow-md border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Şablon Seç:</span>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedTemplate('klasik')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTemplate === 'klasik'
                    ? 'bg-gray-800 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📋 Klasik
              </button>
              <button
                onClick={() => setSelectedTemplate('minimal')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTemplate === 'minimal'
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ✨ Minimal
              </button>
            </div>
          </div>
        </div>

        {/* CV Önizleme */}
        <div id="resume-content" className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {selectedTemplate === 'klasik' && (
            <KlasikTemplate user={user} settings={settings} resumeData={resumeData} />
          )}
          {selectedTemplate === 'minimal' && (
            <MinimalTemplate user={user} settings={settings} resumeData={resumeData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewPage;
