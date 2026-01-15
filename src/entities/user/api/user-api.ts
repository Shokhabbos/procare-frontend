import { apiClient } from '@shared/api';
import { API_ENDPOINTS } from '@shared/constants';
import { normalizePhoneNumber } from '@shared/lib/phone';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  SendCodeResponse,
  VerifyOtpRequest,
  VerifyCodeResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  CompleteRegistrationRequest,
  CompleteRegistrationResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../model';

/**
 * User API funksiyalari
 */
export const userApi = {
  /**
   * Login qilish
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const payload = {
      phone_number: normalizePhoneNumber(data.phone),
      password: data.password,
    };

    const raw = await apiClient.post<
      { access_token?: string; token?: string; user?: unknown },
      typeof payload
    >(API_ENDPOINTS.AUTH.ADMIN.LOGIN, payload);

    const token = raw.access_token ?? raw.token;
    return { token: token ?? '' };
  },

  /**
   * Registratsiya uchun SMS kod yuborish
   */
  sendCode: async (data: RegisterRequest): Promise<SendCodeResponse> => {
    const payload = {
      phone_number: normalizePhoneNumber(data.phone),
      language: data.language ?? 'uz',
    };

    return apiClient.post<SendCodeResponse, typeof payload>(
      API_ENDPOINTS.AUTH.ADMIN.SEND_CODE,
      payload,
    );
  },

  /**
   * Kodni tasdiqlash (registratsiya flow)
   */
  verifyCode: async (data: VerifyOtpRequest): Promise<VerifyCodeResponse> => {
    const payload = {
      phone_number: normalizePhoneNumber(data.phone),
      code: data.otp,
    };

    return apiClient.post<VerifyCodeResponse, typeof payload>(
      API_ENDPOINTS.AUTH.ADMIN.VERIFY_CODE,
      payload,
    );
  },

  /**
   * Kodni qayta yuborish (registratsiya)
   */
  resendOtp: async (data: ResendOtpRequest): Promise<ResendOtpResponse> => {
    const payload = {
      phone_number: normalizePhoneNumber(data.phone),
      language: data.language ?? 'uz',
    };

    return apiClient.post<ResendOtpResponse, typeof payload>(
      API_ENDPOINTS.AUTH.ADMIN.SEND_CODE,
      payload,
    );
  },

  /**
   * Parolni tiklash uchun SMS yuborish
   */
  forgotPassword: async (
    data: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> => {
    const payload = { phone_number: normalizePhoneNumber(data.phone) };

    return apiClient.post<ForgotPasswordResponse, typeof payload>(
      API_ENDPOINTS.AUTH.ADMIN.FORGOT_PASSWORD,
      payload,
    );
  },

  /**
   * Registratsiyani yakunlash (parol o'rnatish)
   */
  completeRegistration: async (
    data: CompleteRegistrationRequest,
  ): Promise<CompleteRegistrationResponse> => {
    const payload = {
      phone_number: normalizePhoneNumber(data.phone),
      password: data.password,
      confirm_password: data.confirmPassword,
    };

    const raw = await apiClient.post<
      { access_token?: string; token?: string; message?: string },
      typeof payload
    >(API_ENDPOINTS.AUTH.ADMIN.REGISTER, payload);

    return {
      message: raw.message,
      token: raw.access_token ?? raw.token,
    };
  },

  /**
   * Reset password using reset code
   */
  resetPassword: async (
    data: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> => {
    const payload = {
      phone_number: normalizePhoneNumber(data.phone),
      code: data.code,
      new_password: data.newPassword,
      confirm_new_password: data.confirmNewPassword,
    };

    return apiClient.post<ResetPasswordResponse, typeof payload>(
      API_ENDPOINTS.AUTH.ADMIN.RESET_PASSWORD,
      payload,
    );
  },

  /**
   * Logout current admin
   */
  logout: async (): Promise<{ message?: string }> => {
    return apiClient.post<{ message?: string }, undefined>(
      API_ENDPOINTS.AUTH.ADMIN.LOGOUT,
      undefined,
    );
  },
};
