import "./App.css";
import Moovies from "./pages/Moovies";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import theme from "./styles/style";
import { ThemeProvider } from "@mui/material/styles";
import MoovieDetails from "./components/Moovie/MoovieDetails";
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Moovies />} />
          <Route path="/moovie/:id" element={<MoovieDetails />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
