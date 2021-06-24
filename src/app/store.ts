import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import counterReducer from "../features/counter/counterSlice";
import slotMachineReducer from "../features/slotMachine/slotMachineSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    slotMachine: slotMachineReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
