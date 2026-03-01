import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
    enroll: (state, { payload }) => {
      const enrollment = payload;
      const exists = state.enrollments.some(
        (enrollment: any) =>
          enrollment.user === payload.user && enrollment.course === payload.course
      );
      if (exists) return;
      state.enrollments = [...state.enrollments, enrollment] as any;
    },
    unenroll: (state, { payload }) => {
      const { user, course } = payload;
      state.enrollments = state.enrollments.filter(
        (enrollment: any) =>
          !(enrollment.user === user && enrollment.course === course)
      ) as any;
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
