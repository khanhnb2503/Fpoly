import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    isCompleted: false,
    username: '',
    commentId: ''
  },
  reducers: {
    onOpen: (state, action) => {
      state.isCompleted = action.payload;
    },
    onClose: (state, action) => {
      state.isCompleted = action.payload;
    },
    replyComment: (state, action) => {
      const { username, commentId } = action.payload;
      state.username = username;
      state.commentId = commentId;
    }
  }
});

export const { onOpen, onClose, replyComment } = commentSlice.actions;
export default commentSlice.reducer;
