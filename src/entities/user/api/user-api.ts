import { apiClient } from '@shared/api';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from '../model';

/**
 * User API funksiyalari
 */
export const userApi = {
  /**
   * Login qilish
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return apiClient.post<LoginResponse, LoginRequest>('/auth/login', data);
  },

  /**
   * Ro'yxatdan o'tish
   */
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    return apiClient.post<RegisterResponse, RegisterRequest>(
      '/auth/register',
      data,
    );
  },

  /**
   * OTP kodni tasdiqlash
   */
  verifyOtp: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    return apiClient.post<VerifyOtpResponse, VerifyOtpRequest>(
      '/auth/verify-otp',
      data,
    );
  },

  /**
   * OTP kodni qayta yuborish
   */
  resendOtp: async (data: ResendOtpRequest): Promise<ResendOtpResponse> => {
    return apiClient.post<ResendOtpResponse, ResendOtpRequest>(
      '/auth/resend-otp',
      data,
    );
  },

  /**
   * Parolni tiklash uchun SMS yuborish
   */
  forgotPassword: async (
    data: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> => {
    return apiClient.post<ForgotPasswordResponse, ForgotPasswordRequest>(
      '/auth/forgot-password',
      data,
    );
  },
};
