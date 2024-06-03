// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';
import Search from './Search.jsx';
import SignInPage from './SignIn.jsx';
import SavedListPage from './SavedList.jsx';

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
        <Route path="/saved" element={<SavedListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
