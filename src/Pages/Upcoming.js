import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../features/movieSlice';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';

const Upcoming = () => {
  const dispatch = useDispatch();
  const { upcomingMovies, status,page } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies('upcoming'));
  }, [dispatch, page]);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Upcoming Movies</h2>
      {status === 'loading' ? (
        <p className="text-center text-lg md:text-xl">Loading...</p>
      ) : (
        <div>
        <MovieList movies={upcomingMovies} />
        <Pagination/>
        </div>
      )}
    </div>
  );
};

export default Upcoming;
