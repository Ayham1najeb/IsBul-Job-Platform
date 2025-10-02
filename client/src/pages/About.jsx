/**
 * Hakkımızda Sayfası
 * Şirket hakkında bilgi sayfası
 */
import { Users, Target, Award, TrendingUp, Heart, Zap, Shield, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Aktif Kullanıcı', value: '50,000+', color: 'text-blue-600' },
    { icon: Target, label: 'İş İlanı', value: '10,000+', color: 'text-purple-600' },
    { icon: Award, label: 'Şirket', value: '5,000+', color: 'text-green-600' },
    { icon: TrendingUp, label: 'Başarılı Eşleşme', value: '25,000+', color: 'text-orange-600' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'İnsana Değer',
      description: 'Her bireyin kariyer hedeflerine ulaşmasına yardımcı olmak için buradayız.',
      color: 'bg-red-50 text-red-600'
    },
    {
      icon: Zap,
      title: 'Hız ve Verimlilik',
      description: 'Modern teknoloji ile hızlı ve etkili iş bulma deneyimi sunuyoruz.',
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      icon: Shield,
      title: 'Güvenilirlik',
      description: 'Verilerinizin güvenliği bizim için öncelikli. %100 güvenli platform.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Globe,
      title: 'Erişilebilirlik',
      description: 'Türkiye\'nin her yerinden kolayca erişilebilir iş fırsatları.',
      color: 'bg-green-50 text-green-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white page-transition">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl font-bold mb-6">Hakkımızda</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Türkiye'nin en yenilikçi iş arama platformu olarak, iş arayanlar ve işverenler arasında köprü kuruyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all animate-scale-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misyon ve Vizyon */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg animate-slide-in-up">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Misyonumuz</h2>
              <p className="text-gray-600 leading-relaxed">
                İş arayanların hayallerindeki kariyere ulaşmalarını sağlamak ve şirketlerin en uygun yetenekleri bulmalarına yardımcı olmak. 
                Modern teknoloji ve kullanıcı dostu arayüzümüzle, iş bulma sürecini kolaylaştırıyoruz.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg animate-slide-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Vizyonumuz</h2>
              <p className="text-gray-600 leading-relaxed">
                Türkiye'nin lider iş arama platformu olmak ve her bireyin kariyer potansiyelini maksimize etmesine katkıda bulunmak. 
                Sürekli yenilik ve gelişimle, iş dünyasının dijital dönüşümüne öncülük ediyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Değerlerimiz */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
            <p className="text-gray-600 text-lg">Bizi biz yapan temel değerler</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all animate-scale-in group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`w-14 h-14 ${value.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hikayemiz */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Hikayemiz</h2>
          </div>
          
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              İş Bul, 2024 yılında Türkiye'de iş arama sürecini modernleştirmek ve kolaylaştırmak amacıyla kuruldu. 
              Kurucularımız, geleneksel iş arama yöntemlerinin yetersizliğini fark ederek, teknoloji odaklı bir çözüm geliştirmeye karar verdiler.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              Bugün, binlerce iş arayan ve yüzlerce şirketin güvendiği bir platform haline geldik. 
              Kullanıcı deneyimini ön planda tutarak, sürekli yenilik yapıyor ve platformumuzu geliştiriyoruz.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Hedefimiz, her bireyin potansiyelini keşfetmesine ve hayallerindeki kariyere ulaşmasına yardımcı olmak. 
              Bu yolculukta bizimle olduğunuz için teşekkür ederiz! 🚀
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Hayalinizdeki İşe Bugün Başlayın!</h2>
          <p className="text-xl text-blue-100 mb-8">
            Binlerce iş fırsatı arasından size en uygun olanı bulun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
            >
              Ücretsiz Kayıt Ol
            </a>
            <a
              href="/jobs"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all hover:scale-105"
            >
              İş İlanlarını İncele
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
