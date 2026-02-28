import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account/reducer";
import coursesReducer from "./courses/reducer";
import assignmentsReducer from "./courses/[cid]/assignments/reducer";
import modulesReducer from "./courses/[cid]/modules/reducer";
import enrollmentsReducer from "./enrollments/reducer";

const store = configureStore({
  reducer: {
    accountReducer,
    assignmentsReducer,
    coursesReducer,
    enrollmentsReducer,
    modulesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
