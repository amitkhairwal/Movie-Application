import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCredits } from '../features/movieSlice';

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetails, movieCredits, status } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
    dispatch(fetchMovieCredits(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      <div className="flex flex-col lg:flex-row items-center lg:items-start bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="w-auto max-w-full lg:max-w-xs h-auto max-h-80 rounded mb-4 lg:mb-0"
        />
        <div className="lg:ml-4 w-full lg:w-2/3 p-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{movieDetails.title}</h2>
          <p className="mb-4 text-lg">{movieDetails.overview}</p>
          <p className="mb-2"><strong>Release Date:</strong> {movieDetails.release_date}</p>
          <p className="mb-2 text-blue-500"><strong>Rating:</strong> {movieDetails.vote_average}</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl lg:text-3xl font-bold mb-4">Cast</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movieCredits.map((cast) => (
            <div key={cast.id} className="flex flex-col items-center">
              <img
                src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                alt={cast.name}
                className="w-24 h-24 rounded-full mb-2 bg-slate-400"
              />
              <p className="font-bold text-center">{cast.name}</p>
              <p className="text-center text-sm text-gray-400">{cast.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
