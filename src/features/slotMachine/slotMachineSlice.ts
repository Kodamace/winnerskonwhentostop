import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  slotNumbersGenerator,
  winningNumbersGenerator,
} from "./slotMachineAPi";

export interface SlotMachineState {
  slots: number[];
  clickCount: number;
  loading: boolean;
  points: number;
  betAmount: number;
  winnings: number;
}

const initialState: SlotMachineState = {
  slots: [],
  clickCount: 0,
  loading: false,
  points: 1000,
  betAmount: 10,
  winnings: 0,
};

export const spinSlots = createAsyncThunk(
  "slots/spinningReg",
  async (values: any) => {
    const { slotQuantity, range } = values;
    const response = await slotNumbersGenerator(slotQuantity, range);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const spinWinningSlot = createAsyncThunk(
  "slots/spinningW",
  async (values: any) => {
    const { slotQuantity, range } = values;
    const response = await winningNumbersGenerator(slotQuantity, range);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const slotMachineSlice = createSlice({
  name: "slots",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    awardPoints: (state) => {
      // Fire off this action when the user hits the winning round
      let pointsWon = Math.floor(Math.random() * (100 + state.betAmount * 10));
      state.points = state.points + pointsWon;
      state.winnings = pointsWon;
    },

    setBetAmount: (state, action) => {
      state.betAmount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(spinSlots.pending, (state) => {
        state.loading = true;
      })
      // Start spinning the slots and subtract the bet amount for the total points and set the values of the provided slot quantity to the array of slots
      .addCase(spinSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload;
        state.points = state.points - state.betAmount;
      })
      .addCase(spinWinningSlot.pending, (state) => {
        state.loading = true;
      })
      // Upon winning we will generate the numbers to all be the same for the winning spin
      .addCase(spinWinningSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload;
        state.points = state.points - state.betAmount;
      });
  },
});

export const { awardPoints, setBetAmount } = slotMachineSlice.actions;

export const selectCount = (state: RootState) => state.slotMachine.slots;

export default slotMachineSlice.reducer;
