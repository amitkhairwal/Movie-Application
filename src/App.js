import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import PopularMovies from './Pages/PopularMovies'
import TopRated from './Pages/TopRated';
import Upcoming from './Pages/Upcoming';
import MovieDetail from './Pages/MovieDetails';
import SearchResults from './Pages/SearchDetails';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="bg-gray-900 text-white min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/popular" element={<PopularMovies />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/search/:query" element={<SearchResults />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
