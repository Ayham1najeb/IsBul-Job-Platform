/**
 * Misafir Route Bileşeni
 * Sadece giriş yapmamış kullanıcılar erişebilir
 * Giriş yapmış kullanıcıları dashboard'a yönlendirir
 */
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const GuestRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user) {
    // Kullanıcı rolüne göre yönlendir
    if (user.rol === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (user.rol === 'firma') {
      return <Navigate to="/company/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default GuestRoute;
