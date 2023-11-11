import { ScreenInfo } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ScreenInfo = {
  userId: "",
  data: {
    resolution: "1336x768",
    type: "desktop"
  }
};

export const screenData = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setScreenData: (state, action) => {
      state = {
        ...state,
        ...action.payload
      }
    },
  },
});

export const { setScreenData } = screenData.actions;
export default screenData.reducer;
