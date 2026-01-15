/**
 * User entity tiplari
 */

export interface User {
  id: string;
  phone: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: User;
}

export interface RegisterRequest {
  phone: string;
  /**
   * Backend send-code uchun til parametri (uz/ru).
   * UI form bermasa ham bo'ladi; feature default locale'ni uzatadi.
   */
  language?: 'uz' | 'ru';
}

export interface SendCodeResponse {
  message?: string;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

export interface VerifyCodeResponse {
  message?: string;
}

export interface ResendOtpRequest {
  phone: string;
  language?: 'uz' | 'ru';
}

export interface ResendOtpResponse {
  message?: string;
}

export interface ForgotPasswordRequest {
  phone: string;
}

export interface ForgotPasswordResponse {
  message?: string;
}

export interface CompleteRegistrationRequest {
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface CompleteRegistrationResponse {
  message?: string;
  /**
   * Ba'zi backendlar registrationdan keyin token qaytarishi mumkin.
   * Biz frontend'ga tokenni normalize qilib beramiz (agar bo'lsa).
   */
  token?: string;
}

export interface ResetPasswordRequest {
  phone: string;
  code: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ResetPasswordResponse {
  message?: string;
}
