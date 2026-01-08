import { AuthLayout } from '@widgets/auth-layout';
import { RegisterForm } from '@features/auth-register';

/**
 * Register sahifasi
 */
export default function RegisterPage() {
  return (
    <AuthLayout
      title="Ro'yhatdan o'tish"
      brandingTitle="Assalomu alaykum, boshlash uchun hisob yarating"
      brandingDescription="Hisobingiz orqali ma'lumotlarni xavfsiz saqlashingiz, sozlamalaringizni moslashtirishingiz va barcha qurilmalaringizda Probox bilan uzluksiz aloqada bo'lishingiz mumkin."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
