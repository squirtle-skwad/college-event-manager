export default {
  getRememberMe: () => localStorage.getItem('remember-me') === 'true',
  setRememberMe: check => localStorage.setItem('remember-me', check),

  useAuthToken: () => localStorage.getItem('auth-token'),
  setAuthToken: token => localStorage.setItem('auth-token', token),

  logout: () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-id');
  },

  useUserId: () => localStorage.getItem('user-id'),
  setUserId: id => localStorage.setItem('user-id', id),
};
