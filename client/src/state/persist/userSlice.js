import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  firstname: '',
  accesstoken: '',
  role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, { payload }) => Object.assign(state, payload),
    logout: () => initialState,
  },
});

export const { setUserData, logout } = userSlice.actions;
export default userSlice.reducer;
