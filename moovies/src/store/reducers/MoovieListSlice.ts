import { ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit"; 
import { fetchMoovieList, fetchMoovieListFiltered } from "../../actions/moovieListActions"; 
import { MoovieData } from "../../interfaces";

interface MoovieFilter {
  page: number;
  totalPages: number;
  searchTerm: string;
  year?: string;
  rating?: string;
  with_genres?: string | null;
}
interface MoovieListState {
  moovieList: MoovieData[];
  isLoading: boolean;
  filterData: MoovieFilter;
  error: string;
}

const initialState: MoovieListState = {
  moovieList: [],
  isLoading: false,
  error: "",
  filterData: {
    page: 1,
    searchTerm: "",
    totalPages: 1,
    with_genres: null,
  },
};

export const MoovieListSlice = createSlice({
  name: "moovieList",
  initialState,
  reducers: {
    updateCurrentPage: (state, action) => {
      state.filterData = { ...state.filterData, page: action.payload };
    },
    updateCurrentFilter: (state, action) => {
      const { genreId, year } = action.payload;
      if (genreId !== undefined) {
        if (genreId === '-1') { 
          const { with_genres, ...restFilterData } = state.filterData;
          state.filterData = restFilterData;
        } else { 
          state.filterData = {
            ...state.filterData,
            with_genres: action.payload.genreId,
          };
        }
      }
      if (year)
        state.filterData = { ...state.filterData, year: action.payload.year };
    },
    updateCurrentSearch: (state, action) => {
      state.filterData = { ...state.filterData, searchTerm: action.payload };
    },

    searchMovieByName: (state, action) => {
      state.moovieList = action.payload;
    },
  },

  extraReducers: (builder: ActionReducerMapBuilder<MoovieListState>) => {
    builder
      .addCase(fetchMoovieList.pending, (state: MoovieListState) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(
        fetchMoovieList.fulfilled,
        (
          state: MoovieListState,
          action: PayloadAction<{
            results: MoovieData[];
            page: number;
            total_pages: number;
          }>
        ) => {
          state.isLoading = false;
          state.error = "";
          state.moovieList = action.payload.results;
          state.filterData = {
            ...state.filterData,
            page: action.payload.page,
            totalPages: action.payload.total_pages,
          };
        }
      )
      .addCase(
        fetchMoovieList.rejected,
        (state: MoovieListState, action: any) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchMoovieListFiltered.pending, (state: MoovieListState) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(
        fetchMoovieListFiltered.fulfilled,
        (
          state: MoovieListState,
          action: PayloadAction<{
            results: MoovieData[];
            page: number;
            total_pages: number;
          }>
        ) => {
          state.isLoading = false;
          state.error = "";
          state.moovieList = action.payload.results;
          state.filterData = {
            ...state.filterData,
            page: action.payload.page,
            totalPages: action.payload.total_pages,
          };
        }
      );
  },
});

export const {
  updateCurrentPage,
  updateCurrentSearch,
  searchMovieByName,
  updateCurrentFilter,
} = MoovieListSlice.actions;

export default MoovieListSlice.reducer;
