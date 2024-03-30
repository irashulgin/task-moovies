import styled from "@emotion/styled";
import { Box, Chip, ListItem, Typography } from "@mui/material";
import { FC } from "react";
import { API_PIC } from "../../http";
import useGenres from "../../hooks/use-genres";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { MoovieData } from "../../interfaces";
import { IGenre } from "../../interfaces/IGenre";

const StyledBox = styled(Box)`
  overflow-wrap: break-word;
  margin-bottom: 0.2rem;
  div {
    margin: 0.2rem;
  }
  justify-content: center;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  max-width: 200px;
  padding: 1rem;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;
const EmptyBox = styled.div`
  width: 180px;
  height: 270px;
`;
const StyledImg = styled.img`
  cursor: pointer;
  width: 180px;
`;

interface MoovieCardProps {
  item: MoovieData;
}

const MoovieCard: FC<MoovieCardProps> = ({ item }) => {
  const { genreList } = useGenres();
  const getNameGenreById = (id: number) => {
    let items = genreList.filter((item: IGenre) => item.id === id);
    return items?.length > 0 ? items[0].name : "";
  };
  const navigate = useNavigate();

  const handleListItemClick = (id: number) => {
    navigate(`/moovie/${id}`);
  };

  return (
    <StyledDiv key={item.id}>
      <StyledBox>
        <ListItem onClick={() => handleListItemClick(item.id)}>
          {item?.poster_path ? (
            <StyledImg src={`${API_PIC}${item?.poster_path}`} alt="" />
          ) : (
            <EmptyBox></EmptyBox>
          )}
        </ListItem>
      </StyledBox>
      <StyledBox>
        <Typography variant="body1" fontWeight="bold">
          {item?.title}
        </Typography>
      </StyledBox>
      <StyledBox>Popularity: {item?.popularity}</StyledBox>
      <StyledBox>{moment(item?.release_date).format("MMM DD, YYYY")}</StyledBox>
      <StyledBox sx={{ display: "flex", flexWrap: "wrap" }} id="chips">
        {item?.genre_ids?.map((genre: number) => (
          <Chip key={genre} label={getNameGenreById(genre)} />
        ))}
      </StyledBox>
    </StyledDiv>
  );
};
export default MoovieCard;
