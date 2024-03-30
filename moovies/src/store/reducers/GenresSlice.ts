import { PayloadAction, createSlice } from "@reduxjs/toolkit"; 
import { IGenre } from "../../interfaces/IGenre";
import { fetchAllGenres } from "../../actions/genreActions";



interface GenreListState {
  genreList: IGenre[];
  isLoading: boolean;
  error: string;
} 

const initialState: GenreListState = {
  genreList: [],
  isLoading: false,
  error: "",
};

export const GenresSlice = createSlice({
  name: "Genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGenres.pending, (state: GenreListState) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllGenres.fulfilled, (state: GenreListState,  action: PayloadAction<{ genres: IGenre[] }>) => {
        state.isLoading = false;
        state.error = "";
        state.genreList = action.payload.genres;
      })
      .addCase(fetchAllGenres.rejected, (state: GenreListState, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default GenresSlice.reducer;
