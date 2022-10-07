export const getAuthHeaders = () => ({
  'auth-token': localStorage.getItem('jwt') || '',
});
