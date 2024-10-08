import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../features/movieSlice';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';

const TopRated = () => {
  const dispatch = useDispatch();
  const { popularMovies, status,page } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies('popular'));
  }, [dispatch,page]);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-4"> Movies</h2>
      {status === 'loading' ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div className='container mx-auto p-4'>
        <MovieList movies={popularMovies} />
        <Pagination/>
        </div>
      )}
    </div>
  );
};

export default TopRated;
