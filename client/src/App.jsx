import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';
import Search from './Search.jsx';
import SignInPage from './SignIn.jsx';
import SavedList from "./savedList";
import MovieDetail from "./movieDetail";

function HomePage() {
  return (
    <>
      <Header />
      <Search />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/saved-list/:userId" element={<SavedList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>

  );
}

export default App;
