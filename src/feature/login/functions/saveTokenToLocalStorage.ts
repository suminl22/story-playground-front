export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem('token', token);
};