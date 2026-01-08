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
  user: User;
  requiresOtp?: boolean;
}

export interface RegisterRequest {
  phone: string;
}

export interface RegisterResponse {
  message: string;
  phone: string;
  otpSent: boolean;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

export interface VerifyOtpResponse {
  token: string;
  user: User;
}

export interface ResendOtpRequest {
  phone: string;
}

export interface ResendOtpResponse {
  message: string;
  otpSent: boolean;
}

export interface ForgotPasswordRequest {
  phone: string;
}

export interface ForgotPasswordResponse {
  message: string;
  phone: string;
  smsSent: boolean;
}
