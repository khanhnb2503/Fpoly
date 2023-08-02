import { createSlice } from '@reduxjs/toolkit';

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    videoId: '',
    totalTime: 0,
    iframe: ''
  },
  reducers: {
    videoInfo: (state, action) => {
      const { video_id, time, iframe } = action.payload;
      state.videoId = video_id;
      state.totalTime = time;
      state.iframe = iframe;
    }
  }
});

export const { videoInfo } = videoSlice.actions;
export default videoSlice.reducer;
