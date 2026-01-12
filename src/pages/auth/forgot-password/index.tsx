import { AuthLayout } from '@widgets/auth-layout';
import { ForgotPasswordForm } from '@features/auth-forgot-password';
import procareLogo from '@assets/svg/procare-big-logo.svg';

/**
 * Forgot password sahifasi
 */
export default function ForgotPasswordPage() {
  const customCardContent = (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-20-medium text-white">
          Ko'rsatmalarga amal qiling
        </h3>
        <div className="h-12 w-12 rounded-lg bg-white/20 p-2">
          <img
            src={procareLogo}
            alt="Procare"
            className="h-full w-full brightness-0 invert"
          />
        </div>
      </div>
      <p className="mb-4 text-14-regular text-white/80">
        Agar SMS kiruvchi xabarlar qutingizda ko'rinmasa, spam yoki keraksiz
        xabarlar ("корзинка") papkasini tekshirib ko'ring.
      </p>
    </>
  );

  return (
    <AuthLayout
      title="Parolni unutdingizmi?"
      description="Tashvishlanmang, siz uni qayta tiklay olasiz!"
      brandingTitle="Xavotir olmang, bunday holatlar bo'lib turadi! Bizda parolni tiklash tez va oson."
      brandingDescription="Quyida ro'yxatdan o'tgan telefon raqamingizni kiriting, biz sizga parolni tiklash uchun SMS kodini yuboramiz. SMS'dagi ko'rsatmalarga amal qiling — qisqa fursatda hisobingizga qayta kira olasiz."
      showUserCard={true}
      customCardContent={customCardContent}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
