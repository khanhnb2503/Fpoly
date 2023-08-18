import { createSlice } from '@reduxjs/toolkit';

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    videoId: '',
    totalTime: 0,
    iframe: '',
    course_id: undefined,
    document: undefined,
  },
  reducers: {
    videoInfo: (state, action) => {
      const { video_id, time, iframe, course_id, document } = action.payload;
      state.videoId = video_id;
      state.totalTime = time;
      state.iframe = iframe;
      state.course_id = course_id;
      state.document = document;
    }
  }
});

export const { videoInfo } = videoSlice.actions;
export default videoSlice.reducer;
