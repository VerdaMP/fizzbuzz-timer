import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import timerReducer from "./slices/timerSlice";
import settingsReducer from "./slices/settingSlice";

// Create the Redux store using configureStore
const store = configureStore({
  reducer: {
    // Combine the app and timer reducers
    app: appReducer,
    timer: timerReducer,
    settings: settingsReducer,
  },
  // Optional middleware and devTools configurations can be added here
});

// Export the configured store
export default store;
