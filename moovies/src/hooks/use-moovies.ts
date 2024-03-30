import { useAppSelector } from "./redux";
const useMoovies = ()=>{
    const moovieList = useAppSelector(state=>state.moovieList);
    return moovieList;
}
export default useMoovies;