/**
 * İletişim Sayfası
 * Kullanıcıların bizimle iletişime geçebileceği sayfa
 */
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    isim: '',
    email: '',
    konu: '',
    mesaj: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API çağrısı yapılacak
    console.log('Form gönderildi:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ isim: '', email: '', konu: '', mesaj: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'E-posta',
      value: 'info@isbul.com',
      link: 'mailto:info@isbul.com',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Phone,
      title: 'Telefon',
      value: '+90 (212) 123 45 67',
      link: 'tel:+902121234567',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: MapPin,
      title: 'Adres',
      value: 'Maslak, İstanbul, Türkiye',
      link: '#',
      color: 'bg-red-50 text-red-600'
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      value: 'Pzt-Cum: 09:00 - 18:00',
      link: '#',
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white page-transition">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <MessageCircle className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">Bizimle İletişime Geçin</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşın. Size yardımcı olmaktan mutluluk duyarız!
            </p>
          </div>
        </div>
      </section>

      {/* İletişim Bilgileri */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all animate-scale-in group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`w-14 h-14 ${info.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-600">{info.value}</p>
              </a>
            ))}
          </div>

          {/* İletişim Formu ve Harita */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg animate-slide-in-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Mesaj Gönderin</h2>
              
              {submitted ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg flex items-center gap-4 animate-scale-in">
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-green-900 mb-1">Mesajınız Gönderildi!</h3>
                    <p className="text-green-700 text-sm">En kısa sürede size geri dönüş yapacağız.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="isim" className="block text-sm font-semibold text-gray-700 mb-2">
                      Adınız Soyadınız
                    </label>
                    <input
                      type="text"
                      id="isim"
                      name="isim"
                      required
                      value={formData.isim}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      E-posta Adresiniz
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="konu" className="block text-sm font-semibold text-gray-700 mb-2">
                      Konu
                    </label>
                    <input
                      type="text"
                      id="konu"
                      name="konu"
                      required
                      value={formData.konu}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Mesajınızın konusu"
                    />
                  </div>

                  <div>
                    <label htmlFor="mesaj" className="block text-sm font-semibold text-gray-700 mb-2">
                      Mesajınız
                    </label>
                    <textarea
                      id="mesaj"
                      name="mesaj"
                      required
                      rows="5"
                      value={formData.mesaj}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-3 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-[1.02] shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                    Mesajı Gönder
                  </button>
                </form>
              )}
            </div>

            {/* Harita ve Ek Bilgi */}
            <div className="space-y-6 animate-slide-in-up" style={{animationDelay: '0.2s'}}>
              {/* Harita */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ofisimiz</h3>
                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.8662793935395!2d29.01066931542!3d41.08128797929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab5f2b8e6e0e1%3A0x2e7e5e5e5e5e5e5e!2sMaslak%2C%20Istanbul!5e0!3m2!1sen!2str!4v1234567890123!5m2!1sen!2str"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ofis Konumu"
                  />
                </div>
              </div>

              {/* SSS */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sık Sorulan Sorular</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Ortalama yanıt süresi: 24 saat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>7/24 e-posta desteği</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Telefon desteği: Hafta içi 09:00-18:00</span>
                  </li>
                </ul>
                <a
                  href="/faq"
                  className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Tüm SSS'leri Görüntüle →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
