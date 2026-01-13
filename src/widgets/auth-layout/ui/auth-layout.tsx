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
    <div className="flex min-h-screen bg-[#F5F5F5]">
      {/* Left Column - Branding */}
      <div className="relative hidden w-1/2 overflow-hidden p-4 lg:flex">
        <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-3 p-12">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url(${authBgPattern})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-between">
            {/* Logo */}
            <div>
              <img
                src={procareLogo}
                alt="Procare"
                className="h-8 brightness-0 invert"
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center space-y-8">
              <div>
                <h1 className="mb-6 text-40-bold leading-tight text-white">
                  {brandingTitle}
                </h1>
                <p className="text-16-regular text-white/90 max-w-lg">
                  {brandingDescription}
                </p>
              </div>
            </div>

            {/* Bottom Card */}
            {showUserCard && (
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                {customCardContent ? (
                  customCardContent
                ) : (
                  <>
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-20-medium text-white">
                        {t('pages.auth.layout.cardTitle')}
                      </h3>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white p-2">
                        <ProcareTinyLogo
                          size={32}
                          className="text-brand-blue"
                        />
                      </div>
                    </div>
                    <p className="text-14-regular text-white/80">
                      {t('pages.auth.layout.cardDescription')}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
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
