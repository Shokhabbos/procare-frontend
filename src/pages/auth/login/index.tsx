import { AuthLayout } from '@widgets/auth-layout';
import { LoginForm } from '@features/auth-login';

/**
 * Login sahifasi
 */
export default function LoginPage() {
  return (
    <AuthLayout
      title="Xush kelibsiz!"
      description="Qaytganingizdan xursandmiz. Kirish usulini tanlang!"
      brandingTitle="Assalomu alaykum, hisobingizga tez va xavfsiz kiring"
      brandingDescription="Ro'yhatdan o'tganingiz uchun rahmat! Iltimos, elektron pochtangizga yuborilgan tasdiqlash havolasi ustiga bosing."
    >
      <LoginForm />
    </AuthLayout>
  );
}
