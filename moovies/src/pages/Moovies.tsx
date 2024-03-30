import { FC, useEffect } from "react";
import { useAppDispatch } from "../hooks/redux";
import { Pagination, Typography } from "@mui/material";
import styled from "@emotion/styled";
import useMoovies from "../hooks/use-moovies";
import StyledSearchBox from "../components/StyledSearchBox";
import debounce from "lodash/debounce";
import GenreSelect from "../components/GenreSelect";
import YearSelect from "../components/YearSelect";
import MoovieList from "../components/Moovie/moovieList";
import { fetchAllGenres } from "../actions/genreActions";
import {
  fetchMoovieList,
  fetchMoovieListFiltered,
  updateFilter,
  updatePage,
  updateSearch,
} from "../actions/moovieListActions";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  margin: 1rem 0;
  width: 180px;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    width: 100%;
  }
`;
const StyledTypography = styled(Typography)`
  margin-left: 1rem;
`;

const StyledPagination = styled(Pagination)`
  margin: 1rem 0;
  position: fixed,
  bottom: 0,
`;

const Moovies: FC = () => {
  const { moovieList, filterData } = useMoovies();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllGenres());
  }, [dispatch]);
  useEffect(() => {
    const year = filterData.year
      ? filterData.year
      : localStorage.getItem("year") || "";
    if (filterData.searchTerm?.length > 0) {
      dispatch(
        fetchMoovieListFiltered({
          searchTerm: filterData.searchTerm,
          page: filterData.page,
          year: year.toString() || "",
        })
      );
    } else {
      const genre = filterData.with_genres
        ? filterData.with_genres
        : localStorage.getItem("genre") || "";
      dispatch(
        fetchMoovieList({
          searchTerm: "",
          page: filterData.page.toString(),
          year: year,
          with_genres: genre,
        })
      );
    }
  }, [
    filterData.searchTerm,
    filterData.page,
    filterData.with_genres,
    filterData.year,
    dispatch,
  ]);

  const search = debounce((value: string) => {
    dispatch(updateSearch(value));
    dispatch(updatePage(1));
  }, 600);

  const onSelectGenre = (genreId: number) => {
    dispatch(updateFilter({ genreId: genreId.toString() }));
    dispatch(updatePage(1));
  };
  const onSelectYear = (year: number | null) => {
    dispatch(updateFilter({ year }));
    dispatch(updatePage(1));
  };
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(updatePage(value));
  };
  return (
    <>
      <StyledTypography variant="h4">Moovies Catalog</StyledTypography>
      <StyledTypography>Search by title Or by genre and year</StyledTypography>
      <StyledSearchBox value={filterData.searchTerm} onChange={search} />

      <GenreSelect
        onSelect={onSelectGenre}
        disabled={filterData.searchTerm !== ""}
      />
      <YearSelect onSelect={onSelectYear} />

      {moovieList?.length === 0 ? (
        <StyledDiv>No moovies found</StyledDiv>
      ) : (
        <>
          <MoovieList />
          <StyledPagination
            count={filterData.totalPages}
            page={filterData.page}
            onChange={handleChangePage}
          />
        </>
      )}
    </>
  );
};
export default Moovies;
