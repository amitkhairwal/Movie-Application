import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../features/movieSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const { page, totalPages } = useSelector((state) => state.movies);

  const handlePrevPage = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };
  

  const handleNextPage = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
  };
  
  useEffect(() => {
    console.log("Current Page:", page);
    console.log("Total Pages:", totalPages);
  }, [page, totalPages]);

  return (
    <div className="flex justify-center mt-6">
      <button onClick={handlePrevPage} disabled={page === 1} className="px-4 py-2 bg-blue-500 text-white rounded mr-2 disabled:bg-gray-500">
        Previous
      </button>
      <span className="text-white items-center m-3">{page} / {totalPages}</span>
      <button onClick={handleNextPage} className="px-4 py-2 bg-blue-500 text-white rounded mr-2 disabled:bg-gray-500">
        Next
      </button>
    </div>
  );
};

export default Pagination;
