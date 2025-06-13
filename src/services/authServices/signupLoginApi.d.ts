declare module '../../services/signupLoginApi' {
  export function signup(userData: any): Promise<any>;
  export function login(userData: any): Promise<any>;
}
