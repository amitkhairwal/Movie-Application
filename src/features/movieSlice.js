import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetch movies of a specific type
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (type, {getState}) => {
  const {page} = getState().movies;
  const response = await axios.get(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`);
  console.log('API Response:', page);

  return { type, results: response.data.results, totalPages: response.data.total_pages };
});

// Search for movies
export const searchMovies = createAsyncThunk('movies/searchMovies', async ({ query, page }) => {
  const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`);
  return { results: response.data.results, totalPages: response.data.total_pages };
});

// Fetch movie details
export const fetchMovieDetails = createAsyncThunk('movies/fetchMovieDetails', async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  return response.data;
});

// Fetch movie credits
export const fetchMovieCredits = createAsyncThunk('movies/fetchMovieCredits', async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
  return response.data.cast;
});

export const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    searchedMovies: [],
    movieDetails: {},
    movieCredits: [],
    status: null,
    page: 1,
    totalPages:0,
    searchedPage: 1,
  searchedTotalPages: 0,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearchedPage: (state, action) => {
      state.searchedPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if (action.meta.arg === 'popular') state.popularMovies = action.payload.results;
        if (action.meta.arg === 'top_rated') state.topRatedMovies = action.payload.results;
        if (action.meta.arg === 'upcoming') state.upcomingMovies = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.status = 'success';
      })
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.searchedMovies = action.payload.results;
        } else {
          state.searchedMovies = [...state.searchedMovies, ...action.payload.results];
        }
        state.searchedTotalPages = action.payload.totalPages;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload;
        state.status = 'success';
      })
      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        state.movieCredits = action.payload;
        state.status = 'success';
      });
  },
});

export const { setPage } = movieSlice.actions;
export default movieSlice.reducer;
