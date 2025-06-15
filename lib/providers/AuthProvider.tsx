'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';
import { loginUser, logoutUser } from '@/lib/api/authent';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { fetchUser, clearUser, loadUserFromStorage } from '@/lib/store/features/userSlice';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);

  // Load user từ localStorage sau khi component được mount
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    const token = Cookies.get('token');
    // Chỉ gọi API khi có token và chưa có user và không đang loading
    if (token && !user && !loading) {
      dispatch(fetchUser());
    }
  }, [dispatch, user, loading]);

  const login = async (userData: User) => {
    try {
      await loginUser(userData);
      // Đợi một chút để đảm bảo token đã được lưu vào cookie
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/');
      await dispatch(fetchUser());
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      dispatch(clearUser());
      // Đảm bảo clear user state trước khi redirect
      await new Promise(resolve => setTimeout(resolve, 100));
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Ngay cả khi có lỗi, vẫn clear user state và redirect
      dispatch(clearUser());
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 