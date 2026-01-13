import type { ReactNode } from 'react';
import { LanguageSwitcher } from '@shared/ui';
import { ProcareTinyLogo } from '@shared/ui/icons';
import procareLogo from '@assets/svg/procare-big-logo.svg';
import authBgPattern from '@assets/svg/auth-bg-pattern.svg';
import { useT } from '@shared/lib/i18n';

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
  const t = useT();
  return (
    <div className="flex min-h-screen">
      {/* Left Column - Branding */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-3 lg:flex lg:flex-col lg:justify-between lg:p-12">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${authBgPattern})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full  ">
          {/* Logo */}
          <div className="mb-12">
            <img
              src={procareLogo}
              alt="Procare"
              className="h-8 brightness-0 invert"
            />
          </div>

          <div>
            {/* Main Heading */}
            <h1 className="mb-6 text-32-bold text-white lg:text-40-bold ">
              {brandingTitle}
            </h1>

            {/* Description */}
            <p className="text-16-regular text-white/90 lg:max-w-md xl:max-w-lg">
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
                      {t('pages.auth.layout.cardTitle')}
                    </h3>
                    <div className="h-12 w-12 rounded-lg bg-white p-2">
                      <ProcareTinyLogo size={32} className="text-brand-blue" />
                    </div>
                  </div>
                  <p className="mb-4 text-14-regular text-white/80">
                    {t('pages.auth.layout.cardDescription')}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex w-full flex-col bg-white lg:w-1/2">
        {/* Header with Language Switcher */}
        <div className="flex justify-end p-6">
          <LanguageSwitcher />
        </div>

        {/* Form Container */}
        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
          <div className="w-full max-w-md ">
            <h2 className="mb-2 text-20-bold text-text-body sm:text-24-bold text-center">
              {title}
            </h2>
            {description && (
              <p className="mb-6 text-14-light text-text-description sm:mb-8 text-center">
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
