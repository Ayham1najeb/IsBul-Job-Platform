/**
 * SSS (Sık Sorulan Sorular) Sayfası
 * Kullanıcıların sık sorduğu sorular ve cevapları
 */
import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      category: 'Genel',
      questions: [
        {
          q: 'İş Bul nedir?',
          a: 'İş Bul, iş arayanlar ve işverenler arasında köprü kuran modern bir iş arama platformudur. Binlerce iş ilanı ve şirket profili ile hayalinizdeki kariyere ulaşmanızı sağlıyoruz.'
        },
        {
          q: 'Kayıt olmak ücretsiz mi?',
          a: 'Evet, İş Bul\'a kayıt olmak tamamen ücretsizdir. İş arayanlar için tüm temel özellikler ücretsiz olarak sunulmaktadır.'
        },
        {
          q: 'Hangi şehirlerde iş ilanları var?',
          a: 'Türkiye\'nin tüm şehirlerinde iş ilanları bulunmaktadır. İstanbul, Ankara, İzmir başta olmak üzere 81 ilde iş fırsatları sunuyoruz.'
        }
      ]
    },
    {
      category: 'İş Arayanlar',
      questions: [
        {
          q: 'Nasıl iş başvurusu yapabilirim?',
          a: 'İlgilendiğiniz iş ilanına tıklayın ve "Başvur" butonuna basın. Özgeçmişinizi yükleyin veya platformda oluşturun ve başvurunuzu tamamlayın.'
        },
        {
          q: 'Özgeçmişimi nasıl oluşturabilirim?',
          a: 'Hesabınıza giriş yaptıktan sonra "Özgeçmiş" bölümüne gidin. Adım adım rehber eşliğinde özgeçmişinizi oluşturabilir veya mevcut özgeçmişinizi yükleyebilirsiniz.'
        },
        {
          q: 'Başvurularımı nasıl takip edebilirim?',
          a: 'Dashboard\'unuzdaki "Başvurularım" bölümünden tüm başvurularınızı ve durumlarını görebilirsiniz.'
        },
        {
          q: 'İş ilanlarını nasıl filtreleyebilirim?',
          a: 'İş İlanları sayfasında şehir, kategori, çalışma şekli gibi filtreleri kullanarak size uygun ilanları bulabilirsiniz.'
        }
      ]
    },
    {
      category: 'Şirketler',
      questions: [
        {
          q: 'Şirket hesabı nasıl oluşturulur?',
          a: 'Kayıt olurken "Şirket" seçeneğini seçin. Şirket bilgilerinizi doldurun ve hesabınızı oluşturun.'
        },
        {
          q: 'İlan yayınlamak ücretli mi?',
          a: 'Temel ilan yayınlama ücretsizdir. Premium özellikler için farklı paketlerimiz bulunmaktadır.'
        },
        {
          q: 'Başvuruları nasıl yönetebilirim?',
          a: 'Şirket panelinizdeki "Başvurular" bölümünden tüm başvuruları görüntüleyebilir, filtreleyebilir ve yönetebilirsiniz.'
        }
      ]
    },
    {
      category: 'Güvenlik',
      questions: [
        {
          q: 'Verilerim güvende mi?',
          a: 'Evet, tüm verileriniz SSL şifreleme ile korunmaktadır. Kişisel bilgileriniz üçüncü şahıslarla paylaşılmaz.'
        },
        {
          q: 'Şifremi unuttum, ne yapmalıyım?',
          a: 'Giriş sayfasındaki "Şifremi Unuttum" linkine tıklayın. E-posta adresinize şifre sıfırlama linki gönderilecektir.'
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq =>
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white page-transition">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <HelpCircle className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">Sık Sorulan Sorular</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Merak ettiğiniz her şeyin cevabı burada!
            </p>

            {/* Arama */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Soru ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SSS İçeriği */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Aradığınız soruyu bulamadık. Lütfen farklı bir arama yapın.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFaqs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, questionIndex) => {
                      const index = `${categoryIndex}-${questionIndex}`;
                      const isOpen = openIndex === index;

                      return (
                        <div
                          key={questionIndex}
                          className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
                        >
                          <button
                            onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-4 text-gray-600 leading-relaxed animate-slide-in-up">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* İletişim CTA */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Cevabını bulamadınız mı?
            </h3>
            <p className="text-gray-600 mb-6">
              Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız!
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg"
            >
              İletişime Geç
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
