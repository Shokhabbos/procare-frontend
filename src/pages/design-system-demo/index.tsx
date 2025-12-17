/**
 * Design System Demo Page
 * Design system'ning barcha komponentlarini ko'rsatish uchun demo sahifa
 */

export default function DesignSystemDemoPage() {
  return (
    <div className="space-y-12 p-8">
      {/* Typography */}
      <section>
        <h1 className="text-24-bold text-text-body mb-6">Typography</h1>

        <div className="space-y-4">
          <div>
            <p className="text-12-regular text-text-description mb-2">
              24px variants:
            </p>
            <h2 className="text-24-bold text-text-body">Sarlavha 24px Bold</h2>
            <h2 className="text-24-medium text-text-body">
              Sarlavha 24px Medium
            </h2>
            <h2 className="text-24-regular text-text-body">
              Sarlavha 24px Regular
            </h2>
            <h2 className="text-24-light text-text-body">
              Sarlavha 24px Light
            </h2>
          </div>

          <div>
            <p className="text-12-regular text-text-description mb-2">
              20px variants:
            </p>
            <h3 className="text-20-bold text-text-body">Sarlavha 20px Bold</h3>
            <h3 className="text-20-medium text-text-body">
              Sarlavha 20px Medium
            </h3>
          </div>

          <div>
            <p className="text-12-regular text-text-description mb-2">
              16px variants:
            </p>
            <p className="text-16-bold text-text-body">Matn 16px Bold</p>
            <p className="text-16-regular text-text-body">Matn 16px Regular</p>
          </div>

          <div>
            <p className="text-12-regular text-text-description mb-2">
              14px variants:
            </p>
            <p className="text-14-medium text-text-body">Matn 14px Medium</p>
            <p className="text-14-regular text-text-description">
              Matn 14px Regular (Description)
            </p>
          </div>
        </div>
      </section>

      {/* Colors */}
      <section>
        <h2 className="text-24-bold text-text-body mb-6">Brand Colors</h2>

        <div className="grid grid-cols-5 gap-4">
          <div>
            <div className="h-20 bg-brand-blue rounded-lg mb-2"></div>
            <p className="text-12-medium text-text-body">Blue</p>
            <p className="text-12-regular text-text-description">#00BFFF</p>
          </div>
          <div>
            <div className="h-20 bg-brand-green rounded-lg mb-2"></div>
            <p className="text-12-medium text-text-body">Green</p>
            <p className="text-12-regular text-text-description">#16A34A</p>
          </div>
          <div>
            <div className="h-20 bg-brand-orange rounded-lg mb-2"></div>
            <p className="text-12-medium text-text-body">Orange</p>
            <p className="text-12-regular text-text-description">#D97706</p>
          </div>
          <div>
            <div className="h-20 bg-brand-red rounded-lg mb-2"></div>
            <p className="text-12-medium text-text-body">Red</p>
            <p className="text-12-regular text-text-description">#DC2626</p>
          </div>
          <div>
            <div className="h-20 bg-brand-purple rounded-lg mb-2"></div>
            <p className="text-12-medium text-text-body">Purple</p>
            <p className="text-12-regular text-text-description">#BB73FF</p>
          </div>
        </div>
      </section>

      {/* Background Colors */}
      <section>
        <h2 className="text-24-bold text-text-body mb-6">Background Colors</h2>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-bg-blue border border-border-primary rounded-lg p-4">
            <p className="text-14-medium text-text-body">bg_Blue</p>
          </div>
          <div className="bg-bg-green border border-border-primary rounded-lg p-4">
            <p className="text-14-medium text-text-body">bg_Green</p>
          </div>
          <div className="bg-bg-orange border border-border-primary rounded-lg p-4">
            <p className="text-14-medium text-text-body">bg_Orange</p>
          </div>
          <div className="bg-bg-red border border-border-primary rounded-lg p-4">
            <p className="text-14-medium text-text-body">bg_Red</p>
          </div>
        </div>
      </section>

      {/* Gradients */}
      <section>
        <h2 className="text-24-bold text-text-body mb-6">Linear Gradients</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-gradient-linear-1 rounded-lg flex items-center justify-center">
            <p className="text-16-bold text-white">Linear 1</p>
          </div>
          <div className="h-24 bg-gradient-linear-2 rounded-lg flex items-center justify-center">
            <p className="text-16-bold text-white">Linear 2</p>
          </div>
          <div className="h-24 bg-gradient-linear-3 rounded-lg flex items-center justify-center">
            <p className="text-16-bold text-white">Linear 3</p>
          </div>
          <div className="h-24 bg-gradient-linear-4 rounded-lg flex items-center justify-center">
            <p className="text-16-bold text-white">Linear 4</p>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section>
        <h2 className="text-24-bold text-text-body mb-6">Alerts</h2>

        <div className="space-y-4">
          <div className="bg-background-brand border border-brand-blue rounded-lg p-4">
            <p className="text-16-medium text-brand-blue">
              Brand alert - Bu brend xabardir
            </p>
          </div>

          <div className="bg-background-success border border-brand-green rounded-lg p-4">
            <p className="text-16-medium text-brand-green">
              Success alert - Amal muvaffaqiyatli bajarildi!
            </p>
          </div>

          <div className="bg-background-warning border border-brand-orange rounded-lg p-4">
            <p className="text-16-medium text-brand-orange">
              Warning alert - Diqqat! Ma'lumotni tekshiring.
            </p>
          </div>

          <div className="bg-background-error border border-brand-red rounded-lg p-4">
            <p className="text-16-medium text-brand-red">
              Error alert - Xatolik yuz berdi!
            </p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-24-bold text-text-body mb-6">Buttons</h2>

        <div className="flex flex-wrap gap-4">
          <button className="bg-brand-blue text-white text-16-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Primary Button
          </button>

          <button className="bg-background-primary text-text-body text-16-medium px-6 py-3 rounded-lg hover:bg-black-200 transition-colors">
            Secondary Button
          </button>

          <button className="bg-gradient-linear-3 text-white text-16-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Gradient Button
          </button>

          <button className="border-2 border-brand-blue text-brand-blue text-16-medium px-6 py-3 rounded-lg hover:bg-bg-blue transition-colors">
            Outline Button
          </button>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-24-bold text-text-body mb-6">Badges</h2>

        <div className="flex flex-wrap gap-4">
          <span className="bg-background-success text-brand-green text-12-medium px-3 py-1 rounded-full">
            Faol
          </span>

          <span className="bg-background-warning text-brand-orange text-12-medium px-3 py-1 rounded-full">
            Kutilmoqda
          </span>

          <span className="bg-background-error text-brand-red text-12-medium px-3 py-1 rounded-full">
            Bekor qilingan
          </span>

          <span className="bg-background-brand text-brand-blue text-12-medium px-3 py-1 rounded-full">
            Yangi
          </span>
        </div>
      </section>

      {/* Card */}
      <section>
        <h2 className="text-24-bold text-text-body mb-6">Cards</h2>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white border border-border-divider rounded-lg p-6">
            <h3 className="text-20-medium text-text-body mb-2">
              Card sarlavhasi
            </h3>
            <p className="text-14-regular text-text-description mb-4">
              Card tavsifi va qo'shimcha ma'lumot. Bu yerda muhim ma'lumotlar
              joylashishi mumkin.
            </p>
            <button className="text-text-brand text-14-medium hover:underline">
              Batafsil →
            </button>
          </div>

          <div className="bg-gradient-linear-3 rounded-lg p-6">
            <h3 className="text-20-medium text-white mb-2">Gradient Card</h3>
            <p className="text-14-regular text-white opacity-90 mb-4">
              Gradient fon bilan card. Premium xizmatlar uchun.
            </p>
            <button className="bg-white text-brand-blue text-14-medium px-4 py-2 rounded-lg">
              Premium
            </button>
          </div>

          <div className="bg-background-brand border border-brand-blue rounded-lg p-6">
            <h3 className="text-20-medium text-brand-blue mb-2">Brand Card</h3>
            <p className="text-14-regular text-text-body mb-4">
              Brend ranglari bilan card. Maxsus xabarlar uchun.
            </p>
            <span className="text-12-medium text-brand-blue">Yangi ✨</span>
          </div>
        </div>
      </section>
    </div>
  );
}
