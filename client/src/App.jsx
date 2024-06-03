import { Routes, Route } from "react-router-dom";
import MovieDetail from "./movieDetail";
import SavedList from "./savedList";

function App() {
  return (
    <Routes>
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/saved-list/:userId" element={<SavedList />} />
    </Routes>
  );
}

export default App;
