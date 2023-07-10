import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    isCompleted: false
  },
  reducers: {
    onOpen: (state, action) => {
      state.isCompleted = action.payload;
    },
    onClose: (state, action) => {
      state.isCompleted = action.payload;
    }
  }
});

export const { onOpen, onClose } = commentSlice.actions;
export default commentSlice.reducer;
