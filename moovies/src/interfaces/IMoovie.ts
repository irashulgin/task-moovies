import { ICompany, ILanguages } from ".";
import { IGenre } from "./IGenre";

 
export interface IMoovie {
  adult: boolean;
  backdrop_path: string;
  genres?: IGenre[];
  genre_ids?: IGenre[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  budget: number;
  homepage: string;
  imdb_id: string;
  production_companies: ICompany[];
  revenue: number;
  runtime: number;
  spoken_languages: ILanguages[];
  tagline: string;
  video: boolean;
  status: string;
}
