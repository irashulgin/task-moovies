import { API_URL, fetchWithInterceptors } from "../http";
import { ISearch } from "../interfaces";

export const fetchMooviesList = async (search: ISearch) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  let urlQuery = `${API_URL}/discover/movie?page=${search.page}`;
  urlQuery += search.year ? `&primary_release_year=${search.year}` : "";
  urlQuery += search.with_genres ? `&with_genres=${search.with_genres}` : "";

  const response = await fetchWithInterceptors(urlQuery, options);
  return response.json();
};

export const fetchMoovieListFiltered = async ({
  searchTerm,
  page,
  year,
}: {
  searchTerm: string;
  page: number;
  year: string;
}) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const response = await fetchWithInterceptors(
    `${API_URL}/search/movie?query=${searchTerm}&page=${page}&primary_release_year=${year}`,
    options
  );
  return response.json();
};

export const fetchMoovieDetail = async (id: string) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const response = await fetchWithInterceptors(
    `${API_URL}/movie/${id}`,
    options
  );
  return response.json();
};
