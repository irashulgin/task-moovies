import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import useMoovie from "../../hooks/use-moovie";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { API_PIC } from "../../http";
import moment from "moment";
import VoteComponent from "../VoteComponent";
import styled from "@emotion/styled";
import { IMoovie } from "../../interfaces/IMoovie";
import { fetchMoovieDetails } from "../../actions/movieActions";
import { IGenre } from "../../interfaces/IGenre";

const StyledChipsBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem;
  div {
    margin: 0.2rem;
  }
`;
const StyledBox = styled(Box)`
  margin: 0.5rem 0;
`;

const MovieDetails: FC = () => {
  const { id } = useParams();
  const previewImage = (moovie: IMoovie) => {
    return moovie.poster_path
      ? `${API_PIC}${moovie.poster_path}`
      : `${API_PIC}${moovie.backdrop_path}`;
  };
  const dispatch = useAppDispatch();
  const { moovie, isLoading, error} = useMoovie();
  useEffect(() => {
    if (id) dispatch(fetchMoovieDetails(id));
  }, [id, dispatch]);
  if (isLoading) {
    return <>Loading...</>;
  }
  if (error) {
    return <> {error}</>;
  }
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {moovie.title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            {moovie?.backdrop_path ? (
              <CardMedia
                component="img"
                height="auto"
                image={previewImage(moovie)}
                alt={moovie.title}
              />
            ) : (
              <>no preview image</>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Overview
              </Typography>
              <Typography variant="body1">{moovie.overview}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          {moovie.genres?.length ?? 0 > 0 ? (
            <Card>
              <StyledChipsBox id="chips">
                {moovie?.genres?.map((genre: IGenre) => (
                  <Chip key={genre.id} label={genre.name} />
                ))}
              </StyledChipsBox>
            </Card>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Budget: ${moovie.budget}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <StyledBox>
        <Typography variant="subtitle1">
          Release date:{" "}
          {`${moment(moovie.release_date).format("MMM DD, YYYY")}`}
        </Typography>
        <Typography variant="subtitle1">Status: {moovie.status}</Typography>
        {moovie?.homepage?.length > 0 && (
          <Typography variant="body1">
            Click the homepage link:
            <Link
              href={moovie.homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              {moovie.homepage}
            </Link>
          </Typography>
        )}
      </StyledBox>
      <VoteComponent
        voteAverage={moovie.vote_average}
        voteCount={moovie.vote_count}
      />
    </Container>
  );
};
export default MovieDetails;
