import { useAppSelector } from "./redux";
const useMoovie = () => {
  const moovie = useAppSelector((state) => state.moovie);
  return moovie;
};
export default useMoovie;
