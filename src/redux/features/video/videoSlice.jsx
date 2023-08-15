import { createSlice } from '@reduxjs/toolkit';

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    videoId: '',
    totalTime: 0,
    iframe: '',
    course_id: undefined
  },
  reducers: {
    videoInfo: (state, action) => {
      const { video_id, time, iframe, course_id } = action.payload;
      state.videoId = video_id;
      state.totalTime = time;
      state.iframe = iframe;
      state.course_id = course_id
    }
  }
});

export const { videoInfo } = videoSlice.actions;
export default videoSlice.reducer;
