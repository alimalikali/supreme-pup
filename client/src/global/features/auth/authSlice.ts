import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for authentication state
interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ Start loading when authentication request begins
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    // ✅ Set user when login/signup is successful
    authSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },

    // ✅ Handle authentication failure
    authFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ Logout and clear user data
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

// Export actions
export const { authStart, authSuccess, authFailure, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
