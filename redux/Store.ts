import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { postReducer } from "./reducers/postReducer";
import { ticketReducer } from "./reducers/ticketReducer";
import { notificationReducer } from "./reducers/notificationReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    ticket: ticketReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default Store;
