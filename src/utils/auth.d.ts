declare module '../../utils/auth' {
  export function setToken(token: string): void;
  export function getToken(): string | null;
  export function removeToken(): void;
  export function isLoggedIn(): boolean;
}
