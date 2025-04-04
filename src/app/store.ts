import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "../modules/events/eventsSlice";
import actionsReducer from "../modules/actions/actionSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    actions: actionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
