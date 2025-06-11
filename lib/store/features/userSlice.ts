import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@/types/user';
import { api_deleteAvatarUser, api_getUserMe, api_updateUserMeByID } from '@/lib/api/user';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk để lấy thông tin user
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    try {
      const response = await api_getUserMe();
      return response;
    } catch (error: unknown) {
      throw error;
    }
  }
);

// Async thunk để update thông tin user
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user:User) => {
    try {
      const response = await api_updateUserMeByID(user);
      return response;
    } catch (error: unknown) {
      throw error;
    }
  }
);

// Async thunk để xoá avatar acf image user
export const deleteAvatarUser = createAsyncThunk(
  'user/deleteAvatarUser',
  async (user_id: number) => {
    try {
      const response = await api_deleteAvatarUser(user_id);
      return response;
    } catch (error: unknown) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
    // Thêm action để load user từ localStorage
    loadUserFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const savedState = localStorage.getItem('userState');
        if (savedState) {
          try {
            const parsedState = JSON.parse(savedState);
            state.user = parsedState.user;
          } catch (e) {
            console.error('Error parsing user state:', e);
          }
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {...state.user, ...action.payload};
      })
      .addCase(deleteAvatarUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {...state.user, ...action.payload};
      });
  },
});

export const { setUser, clearUser, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer; 