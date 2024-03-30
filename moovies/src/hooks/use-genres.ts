import { useAppSelector } from "./redux";
const useGenres = () => {
  const genreList = useAppSelector((state) => state.genreList);
  return genreList;
};
export default useGenres;
