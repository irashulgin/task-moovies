export const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGE1NmVmNGE0Mjk2NmE4OTMxYzIyNzI5MWUwMTc3YyIsInN1YiI6IjY2MDU2OWIwZmNlYzJlMDE2M2M0NzhlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e8SymyR741EqGRMIrQmzp_Is51uJYILkcOKkp3fDX28";
export const API_URL = "https://api.themoviedb.org/3";
export const API_PIC = "https://media.themoviedb.org/t/p/w440_and_h660_face/";

// Wrapper function for fetch with interceptors
export const fetchWithInterceptors = async (
  url: string,
  options: RequestInit
) => {
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${API_KEY}`,
  };
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    throw error;
  }
};
