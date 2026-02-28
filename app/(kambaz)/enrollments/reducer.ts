import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload }) => {
      const { user, course } = payload;
      const exists = state.enrollments.some(
        (enrollment: any) =>
          enrollment.user === user && enrollment.course === course
      );
      if (exists) return;
      state.enrollments = [
        ...state.enrollments,
        { _id: uuidv4(), user, course },
      ] as any;
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

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
