import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { IMoovie } from "../../interfaces/IMoovie";
import { fetchMoovieDetails } from "../../actions/movieActions";

interface MoovieState {
  moovie: IMoovie;
  isLoading: boolean;
  error: string;
}

const initialState: MoovieState = {
  moovie: {} as IMoovie,
  isLoading: false,
  error: "",
};

export const MoovieSlice = createSlice({
  name: "moovie",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<MoovieState>) => {
    builder
      .addCase(fetchMoovieDetails.pending, (state: MoovieState) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(
        fetchMoovieDetails.fulfilled,
        (state: MoovieState, action: PayloadAction<IMoovie>) => {
          state.isLoading = false;
          state.error = "";
          state.moovie = action.payload;
        }
      )
      .addCase(
        fetchMoovieDetails.rejected,
        (state: MoovieState, action: any) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default MoovieSlice.reducer;
