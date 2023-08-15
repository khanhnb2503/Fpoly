import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    course_id: null
  },
  reducers: {
    setIdCourse: (state, action) => {
      state.course_id = action.payload;
    }
  }
});

export const { setIdCourse } = courseSlice.actions;
export default courseSlice.reducer;
