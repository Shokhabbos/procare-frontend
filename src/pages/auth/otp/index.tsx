import { AuthLayout } from '@widgets/auth-layout';
import { OTPForm } from '@features/auth-otp';

/**
 * OTP tasdiqlash sahifasi
 */
export default function OTPPage() {
  return (
    <AuthLayout
      title="SMS kodni tasdiqlang!"
      brandingTitle="Assalomu alaykum, boshlash uchun hisob yarating"
      brandingDescription="Hisobingiz orqali ma'lumotlarni xavfsiz saqlashingiz, sozlamalaringizni moslashtirishingiz va barcha qurilmalaringizda Probox bilan uzluksiz aloqada bo'lishingiz mumkin."
      showUserCard={false}
    >
      <OTPForm />
    </AuthLayout>
  );
}
