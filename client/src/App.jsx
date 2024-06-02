import { Routes, Route } from "react-router-dom";
import MovieDetail from "./movieDetail";

function App() {
  return (
    <Routes>
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
}

export default App;
