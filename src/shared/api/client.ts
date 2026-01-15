import { API_BASE_URL, API_TIMEOUT } from '@shared/constants';
import type { ApiError } from '@shared/types';
import { getAuthToken } from '@shared/lib/auth-token';

/**
 * API xatoliklarini boshqarish uchun custom Error class
 */
export class ApiException extends Error {
  constructor(
    public statusCode: number,
    public apiError: ApiError,
    public meta?: {
      path?: string;
      timestamp?: string;
    },
  ) {
    super(apiError.message);
    this.name = 'ApiException';
  }
}

/**
 * API request options
 */
interface RequestOptions extends RequestInit {
  timeout?: number;
}

type UnknownRecord = Record<string, unknown>;

/**
 * API client - barcha HTTP so'rovlar uchun asosiy funksiya
 * Bu yerda authentication, error handling, timeout kabi umumiy logika joylashgan
 */
class ApiClient {
  private baseURL: string;
  private defaultTimeout: number;

  constructor(baseURL: string, timeout: number) {
    this.baseURL = baseURL;
    this.defaultTimeout = timeout;
  }

  /**
   * Request headerlarini tayyorlash
   */
  private getHeaders(customHeaders?: HeadersInit): HeadersInit {
    const headers: HeadersInit = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const token = getAuthToken();
    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Timeout bilan fetch
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestOptions = {},
  ): Promise<Response> {
    const timeout = options.timeout || this.defaultTimeout;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiException(408, {
          message: "So'rov vaqti tugadi",
          code: 'TIMEOUT',
        });
      }
      throw error;
    }
  }

  private normalizeErrorPayload(
    statusCode: number,
    payload: unknown,
  ): { apiError: ApiError; meta?: ApiException['meta'] } {
    // Backend odatda shunday yuboradi:
    // { statusCode, message, error, location, timestamp, path }
    if (payload && typeof payload === 'object') {
      const p = payload as UnknownRecord;

      const messageRaw = p.message;
      const message =
        typeof messageRaw === 'string'
          ? messageRaw
          : Array.isArray(messageRaw)
            ? messageRaw.filter((x) => typeof x === 'string').join(', ')
            : "Noma'lum xatolik";

      const location =
        typeof p.location === 'string' ? (p.location as string) : undefined;
      const code =
        typeof p.code === 'string'
          ? (p.code as string)
          : typeof p.error === 'string'
            ? (p.error as string)
            : location;

      const apiError: ApiError = {
        message,
        code,
        location,
        path: typeof p.path === 'string' ? (p.path as string) : undefined,
        timestamp:
          typeof p.timestamp === 'string' ? (p.timestamp as string) : undefined,
        details: p,
      };

      return {
        apiError,
        meta: {
          path: apiError.path,
          timestamp: apiError.timestamp,
        },
      };
    }

    return {
      apiError: {
        message:
          typeof payload === 'string' ? payload : `HTTP xatolik: ${statusCode}`,
        details: payload,
      },
    };
  }

  /**
   * Response ni parse qilish va xatolarni handle qilish
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let payload: unknown = undefined;

      try {
        payload = await response.json();
      } catch {
        payload = undefined;
      }

      const normalized = this.normalizeErrorPayload(response.status, payload);
      throw new ApiException(
        response.status,
        normalized.apiError,
        normalized.meta,
      );
    }

    // 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    try {
      return await response.json();
    } catch {
      throw new ApiException(500, {
        message: 'Javobni parse qilishda xatolik',
        code: 'PARSE_ERROR',
      });
    }
  }

  /**
   * GET so'rov
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithTimeout(url, {
      ...options,
      method: 'GET',
      headers: this.getHeaders(options?.headers),
    });
    return this.handleResponse<T>(response);
  }

  /**
   * POST so'rov
   */
  async post<T, D = unknown>(
    endpoint: string,
    data?: D,
    options?: RequestOptions,
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithTimeout(url, {
      ...options,
      method: 'POST',
      headers: this.getHeaders(options?.headers),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  /**
   * PUT so'rov
   */
  async put<T, D = unknown>(
    endpoint: string,
    data?: D,
    options?: RequestOptions,
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithTimeout(url, {
      ...options,
      method: 'PUT',
      headers: this.getHeaders(options?.headers),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  /**
   * PATCH so'rov
   */
  async patch<T, D = unknown>(
    endpoint: string,
    data?: D,
    options?: RequestOptions,
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithTimeout(url, {
      ...options,
      method: 'PATCH',
      headers: this.getHeaders(options?.headers),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  /**
   * DELETE so'rov
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithTimeout(url, {
      ...options,
      method: 'DELETE',
      headers: this.getHeaders(options?.headers),
    });
    return this.handleResponse<T>(response);
  }
}

/**
 * Global API client instance
 */
export const apiClient = new ApiClient(API_BASE_URL, API_TIMEOUT);
