import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = ({ children, allowedRoles = [], requireAdmin = false, requireCompany = false, requireJobSeeker = false }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Admin kontrolü
  if (requireAdmin) {
    if (user?.rol !== 'admin') {
      // Admin olmayan kullanıcıyı kendi dashboard'una yönlendir
      if (user?.rol === 'firma') {
        return <Navigate to="/company/dashboard" replace />;
      }
      return <Navigate to="/dashboard" replace />;
    }
    
    // Rol onaylanmamışsa, onay sayfasına yönlendir
    if (user?.rol_confirmed === false) {
      return <Navigate to="/role-confirmation" replace />;
    }
  }

  // Şirket kontrolü
  if (requireCompany && user?.rol !== 'firma') {
    // Şirket olmayan kullanıcıyı kendi dashboard'una yönlendir
    if (user?.rol === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // İş arayan kontrolü
  if (requireJobSeeker && user?.rol !== 'is_arayan') {
    // İş arayan olmayan kullanıcıyı kendi dashboard'una yönlendir
    if (user?.rol === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (user?.rol === 'firma') {
      return <Navigate to="/company/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // Rol kontrolü
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.rol)) {
    // Kullanıcıyı kendi dashboard'una yönlendir
    if (user?.rol === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (user?.rol === 'firma') {
      return <Navigate to="/company/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
