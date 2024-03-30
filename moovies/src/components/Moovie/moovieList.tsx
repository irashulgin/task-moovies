import styled from "@emotion/styled";
import { FC } from "react"; 
import useMoovies from "../../hooks/use-moovies";
import MoovieCard from "./MoovieCard";
import { MoovieData } from "../../interfaces";

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const MoovieList: FC = () => {
  const { moovieList, isLoading, error } = useMoovies();

  if (isLoading) {
    return <>Loading...</>;
  }
  if (error) {
    return <> {error}</>;
  }
  return (
    <StyledList>
      {moovieList?.map((item: MoovieData) => (
        <MoovieCard item={item} key={item.id} />
      ))}
    </StyledList>
  );
};
export default MoovieList;
