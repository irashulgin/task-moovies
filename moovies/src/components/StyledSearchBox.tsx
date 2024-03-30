import { ChangeEvent, FC, useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBox = styled(TextField)`
  min-width: 200px;
  margin-left: 1rem;
  background-color: "#f2f2f2";
  & .MuiInputBase-root {
    background-color: "#f2f2f2";
    border-radius: 4px; /* use px for values */
  }
  & .MuiInputBase-input {
    padding: "10px 12px"; /* remove quotes from numerical values */
  }
  & .MuiInputAdornment-root {
    margin-right: 0;
  }
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: transparent; /* Set border color to transparent when focused */
  }

  @media (max-width: 600px) {
    width: 100%;
    margin: 0 1rem 1rem 1rem ;
  }
`;
const StyledSearchBox: FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState(value);

  const handleClear = () => {
    setSearchTerm("");
    onChange(""); // Clear the search box
  };

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange(newValue);
  };

  return (
    <SearchBox
      placeholder="Search..."
      InputProps={{
        startAdornment: <SearchIcon />,
        endAdornment: value && (
          <IconButton edge="end" onClick={handleClear} tabIndex={-1} id="clear-button" data-testid="clear-button">
            <ClearIcon />
          </IconButton>
        ),
      }}
      value={searchTerm}
      onChange={onChangeSearch}
    />
  );
};

export default StyledSearchBox;
