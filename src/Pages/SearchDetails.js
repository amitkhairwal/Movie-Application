import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchMovies } from '../features/movieSlice';
import MovieList from '../components/MovieList';
import useDebounce from '../customHooks/useDebouncing'; 
import Pagination from '../components/Pagination';

const SearchResults = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const { searchedMovies, status } = useSelector((state) => state.movies);
  const debouncedQuery = useDebounce(query, 500); 

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(searchMovies(debouncedQuery));
    }
  }, [dispatch, debouncedQuery]);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Search Results for "{query}"
      </h2>
      {status === 'loading' ? (
        <p className="text-center text-lg md:text-xl">Loading...</p>
      ) : (
        <div>
        <MovieList movies={searchedMovies} />
        
        </div>
      )}
    </div>
  );
};

export default SearchResults;
