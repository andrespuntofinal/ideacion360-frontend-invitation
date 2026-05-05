import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/wedding/Admin" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Si no tiene el rol, lo enviamos a una ruta por defecto (ej. home o forbidden)
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
