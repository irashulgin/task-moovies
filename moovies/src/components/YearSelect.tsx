import { FC, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import styled from "@emotion/styled";

const StyledFormControl = styled(FormControl)`
  min-width: 200px;
  margin-left: 1rem;
  margin-bottom: 1rem;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

interface YearProps {
  onSelect: (selectedYear: number | null) => void;
 
}

const YearSelect: FC<YearProps> = ({ onSelect }) => {
  const years = [];
  const initValue = localStorage.getItem("year") || null;
  const [selectedYear, setSelectedYear] = useState<string | null>(initValue);

  for (let year = new Date().getFullYear(); year > 1887; year--) {
    years.push(year);
  }

  const handleYearChange = (event: any) => {
    const selectedYear = event.target.value;
    if (selectedYear > 0) {
      setSelectedYear(selectedYear);
      localStorage.setItem("year", selectedYear);
      onSelect(selectedYear);
    } else {
      const selectedYear = -1;
      setSelectedYear(selectedYear.toString());
      localStorage.setItem("year", "-1");
      onSelect(-1);
    }
  };

  return (
    <StyledFormControl>
      <InputLabel id="year-select-label">Year</InputLabel>
      <Select
        labelId="year-select-label"
        id="year-select"
        onChange={handleYearChange}
        value={selectedYear}
      >
        <MenuItem key="" value={-1}>
          Select year
        </MenuItem>
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default YearSelect;
