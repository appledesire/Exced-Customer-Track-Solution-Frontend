import { IdentifyData } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IdentifyData = {
  userId: '',
};

export const identifyData = createSlice({
  name: 'identify_user',
  initialState,
  reducers: {
    setIdentifyData: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setIdentifyData } = identifyData.actions;
export default identifyData.reducer;
