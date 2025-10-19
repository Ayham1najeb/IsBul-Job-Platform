/**
 * Şirket Layout Bileşeni
 * Şirket sayfaları için özel layout
 */
import { Outlet } from 'react-router-dom';
import CompanyNavbar from './CompanyNavbar';
import Footer from './Footer';

const CompanyLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <CompanyNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CompanyLayout;
