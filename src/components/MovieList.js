import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-gray-800 rounded overflow-hidden shadow-lg">
          <Link to={`/movie/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
              <p className="text-sm">{movie.release_date}</p>
              <p className="text-yellow-500">{movie.vote_average}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
