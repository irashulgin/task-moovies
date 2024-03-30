import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, fetchWithInterceptors } from "../http";

export const fetchAllGenres = createAsyncThunk(
    "fetchAllGenres",
    async (_, thunkAPI) => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        };
        const response = await fetchWithInterceptors(
          `${API_URL}/genre/movie/list`,
          options
        );
  
        return response.json();
      } catch (e) {
       return thunkAPI.rejectWithValue("Cant get moovie list");
      }
    }
  );