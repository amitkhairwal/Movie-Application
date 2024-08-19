import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchMovies } from '../features/movieSlice';
import MovieList from '../components/MovieList';
import useDebounce from '../customHooks/useDebouncing';

const SearchResults = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const { searchedMovies, status, searchedTotalPages } = useSelector((state) => state.movies);
  const debouncedQuery = useDebounce(query, 500); 
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(searchMovies({ query: debouncedQuery, page }));
    }
  }, [dispatch, debouncedQuery, page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < searchedTotalPages) {
      setPage(page + 1);
    }
  };

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
          <div className="flex justify-center mt-4">
            <button 
              onClick={handlePreviousPage} 
              disabled={page === 1} 
              className="px-4 py-2 bg-blue-500 text-white rounded mr-2 disabled:bg-gray-500"
            >
              Previous
            </button>
            <span className="px-4 py-2   ">{`${page} /${searchedTotalPages}`}</span>
            <button 
              onClick={handleNextPage} 
              disabled={page === searchedTotalPages} 
              className="px-4 py-2 bg-blue-500 text-white rounded mr-2 disabled:bg-gray-500"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
