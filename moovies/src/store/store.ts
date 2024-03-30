import { combineReducers, configureStore } from "@reduxjs/toolkit";
import moovieListReducer from "./reducers/MoovieListSlice";
import moovieReducer from "./reducers/MoovieSlice";
import genresReducer from "./reducers/GenresSlice";

const rootReducer = combineReducers({
  moovie: moovieReducer,
  moovieList: moovieListReducer,
  genreList: genresReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
