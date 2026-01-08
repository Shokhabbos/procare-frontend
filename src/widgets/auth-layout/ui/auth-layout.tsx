import type { ReactNode } from 'react';
import { LanguageSwitcher } from '@shared/ui';
import procareLogo from '@assets/svg/procare-big-logo.svg';

export interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  brandingTitle: string;
  brandingDescription: string;
  showUserCard?: boolean;
  customCardContent?: ReactNode;
}

/**
 * Auth sahifalar uchun 2-column layout
 * Left: Branding block (gradient background)
 * Right: Auth form
 */
export function AuthLayout({
  children,
  title,
  description,
  brandingTitle,
  brandingDescription,
  showUserCard = true,
  customCardContent,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left Column - Branding */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-3 lg:flex lg:flex-col lg:justify-between lg:p-12">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="mb-12">
            <img
              src={procareLogo}
              alt="Procare"
              className="h-8 brightness-0 invert"
            />
          </div>

          {/* Main Heading */}
          <h1 className="mb-4 text-32-bold text-white lg:text-40-bold">
            {brandingTitle}
          </h1>

          {/* Description */}
          <p className="text-16-regular text-white/90 lg:max-w-md">
            {brandingDescription}
          </p>
        </div>

        {/* Bottom Card */}
        {showUserCard && (
          <div className="relative z-10 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            {customCardContent ? (
              customCardContent
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-20-medium text-white">
                    Hamjamiyatimizga qo'shilayotganingizdan juda xursandmiz!
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
                  Hisobingiz orqali jarayoningizni xavfsiz saqlashingiz va
                  sozlamalaringizni moslashtirishingiz mumkin.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full bg-white/20"
                      />
                    ))}
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue text-12-bold text-white">
                    +3695
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Right Column - Form */}
      <div className="flex w-full flex-col bg-white lg:w-1/2">
        {/* Header with Language Switcher */}
        <div className="flex justify-end p-6">
          <LanguageSwitcher />
        </div>

        {/* Form Container */}
        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
          <div className="w-full max-w-md">
            <h2 className="mb-2 text-20-bold text-text-body sm:text-24-bold">
              {title}
            </h2>
            {description && (
              <p className="mb-6 text-14-regular text-text-description sm:mb-8">
                {description}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
