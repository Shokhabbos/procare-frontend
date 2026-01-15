import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@shared/constants';

/**
 * Auth guard - foydalanuvchi tizimga kirganini tekshiradi
 * Hozircha API ishlamayotganligi uchun comment qilingan
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const token = localStorage.getItem('auth_token');

  // Agar token yo'q bo'lsa, login sahifasiga yo'naltirish
  if (!token) {
    return (
      <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
}

/**
 * Guest guard - foydalanuvchi tizimga kirmaganini tekshiradi
 * Hozircha API ishlamayotganligi uchun comment qilingan
 */
export function GuestGuard({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('auth_token');

  // Agar token bo'lsa, dashboard'ga yo'naltirish
  if (token) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
}
