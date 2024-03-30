import { FC, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import styled from "@emotion/styled";
import useGenres from "../hooks/use-genres";
import { IGenre } from "../interfaces/IGenre";

const StyledFormControl = styled(FormControl)`
  min-width: 200px;
  margin-left: 1rem;
  margin-bottom: 1rem;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

interface GenreProps {
  onSelect: (genreId: number) => void;
  disabled: boolean;
}

const GenreSelect:FC<GenreProps> = ({ onSelect, disabled }) => {
  const initValue = localStorage.getItem("genre") || "";
  const [selectedGenre, setSelectedGenre] = useState(initValue);
  const { genreList, isLoading, error } = useGenres();

  const handleGenreChange = (event: any) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    if (genreId !== -1) {
      localStorage.setItem("genre", genreId);
    } else {
      localStorage.removeItem("genre");
    }

    onSelect(genreId);
  };
  if (isLoading) {
    return <>Loading...</>;
  }
  if (error) {
    return <> {error}</>;
  }
  return (
    <StyledFormControl>
      <InputLabel id="genre-select-label">Genre</InputLabel>
      <Select
        disabled={disabled}
        labelId="genre-select-label"
        id="genre-select"
        value={selectedGenre}
        onChange={handleGenreChange}
      >
        <MenuItem key="" value={-1}>
          Select genre
        </MenuItem>
        {genreList?.map((genre: IGenre) => (
          <MenuItem key={genre.id} value={genre.id}>
            {genre.name}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default GenreSelect;
