import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMoovieDetail } from "../services/mooviesService";

export const fetchMoovieDetails = createAsyncThunk(
  "fetchMoovieDetails",
  async (id: string, thunkAPI) => {
    try {
      return await fetchMoovieDetail(id);
    } catch (error) {
      return thunkAPI.rejectWithValue("Can't get movie details");
    }
  }
);
