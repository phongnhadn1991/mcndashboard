import { Middleware } from '@reduxjs/toolkit';

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Chỉ lưu vào localStorage ở phía client
  if (typeof window !== 'undefined') {
    const state = store.getState();
    localStorage.setItem('userState', JSON.stringify(state.user));
  }
  
  return result;
}; 