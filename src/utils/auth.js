const TOKEN_KEY = 'auth_token';

export const setToken = (token, rememberMe = true) => {
  try {
    if (rememberMe) {
      console.log('auth.js: Setting token in localStorage:', token);
      localStorage.setItem(TOKEN_KEY, token);
      sessionStorage.removeItem(TOKEN_KEY);
    } else {
      console.log('auth.js: Setting token in sessionStorage:', token);
      sessionStorage.setItem(TOKEN_KEY, token);
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export const getToken = () => {
  try {
    const sessionToken = sessionStorage.getItem(TOKEN_KEY);
    if (sessionToken) {
      return sessionToken;
    }
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const removeToken = () => {
  try {
    console.log('auth.js: Removing token from storage');
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

export const isLoggedIn = () => {
  return !!getToken();
};
