import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFilterData, ISearch } from "../interfaces";
import { Dispatch } from "@reduxjs/toolkit";

import {
  fetchMooviesList,
  fetchMoovieListFiltered as fetchMoovieListFilteredService,
} from "../services/mooviesService";
import {
  updateCurrentFilter,
  updateCurrentPage,
  updateCurrentSearch,
} from "../store/reducers/MoovieListSlice";

export const fetchMoovieList = createAsyncThunk(
  "mooviesList",
  async (search: ISearch, thunkAPI) => {
    try {
      return await fetchMooviesList(search);
    } catch (error) {
      return thunkAPI.rejectWithValue("Can't get movie list");
    }
  }
);

export const fetchMoovieListFiltered = createAsyncThunk(
  "mooviesListFiltered",
  async (query: { searchTerm: string; page: number, year: string }, thunkAPI) => {
    try {
      return await fetchMoovieListFilteredService(query);
    } catch (error) {
      return thunkAPI.rejectWithValue("Can't get movie list");
    }
  }
);

export const updatePage = (page: number) => {
  return (dispatch: Dispatch) => {
    dispatch(updateCurrentPage(page));
  };
};

export const updateSearch = (search: string) => {
  return (dispatch: Dispatch) => {
    dispatch(updateCurrentSearch(search));
  };
};
export const updateFilter = (filter: {
  genreId?: string;
  year?: number | null;
}) => {
  return (dispatch: Dispatch) => {
    let currFilter = {} as IFilterData;
    if (filter.genreId) currFilter.genreId = filter.genreId;
    if (filter.year) currFilter.year = filter.year.toString();
    dispatch(updateCurrentFilter(currFilter));
  };
};
