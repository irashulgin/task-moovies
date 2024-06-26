export interface ISearch {
  searchTerm: string;
  page: string;
  year: string;
  with_genres: string;
}

export interface IFilterData {
  genreId: string;
  year: string;
}

export interface ICompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface ILanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MoovieData {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }