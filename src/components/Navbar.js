import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${search}`);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">MovieDb</h1>
          <button
            className="text-white md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div
          className={`md:flex flex-col md:flex-row md:space-x-4 w-full ${isMenuOpen ? 'block' : 'hidden'} md:block`}
        >
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4 md:mb-0">
            <button
              onClick={() => navigate('/popular')}
              className="text-white hover:text-gray-400 mb-2 md:mb-0"
            >
              Popular
            </button>
            <button
              onClick={() => navigate('/top-rated')}
              className="text-white hover:text-gray-400 mb-2 md:mb-0"
            >
              Top Rated
            </button>
            <button
              onClick={() => navigate('/upcoming')}
              className="text-white hover:text-gray-400"
            >
              Upcoming
            </button>
          </div>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-700 p-2 rounded text-white mb-2 md:mb-0 md:mr-2"
              placeholder="Search..."
            />
            <button type="submit" className="p-2 bg-blue-500 rounded text-white hover:bg-blue-600">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
