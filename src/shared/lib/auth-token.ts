const AUTH_TOKEN_STORAGE_KEY = 'auth_token';

/**
 * Auth token bilan ishlash - shared qatlamda, chunki bu cross-cutting infra.
 * Bu yerda hech qanday entity/feature bilim bo'lmaydi.
 */
export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
}
