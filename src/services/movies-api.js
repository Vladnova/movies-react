import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = { api_key: '2a30abfbe9eb903004963b24640e499f' };

const searchMovies = async ({ searchQuery = '', page = 1 }) => {
  const { data } = await axios.get(
    `/search/movie?query=${searchQuery}&page=${page}`,
  );
  return data.results;
};
const Configuration = async () => {
  const { data } = await axios.get('/configuration');
  return data.images;
};

const getMoviesInTrend = async (page = 1) => {
  const { data } = await axios.get(`/trending/movie/day?&page=${page}`);
  return data.results;
};

const getMovieDetails = async movieId => {
  const { data } = await axios.get(`movie/${movieId}`);
  return data;
};

const getMovieCast = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/credits`);
  return data.cast;
};

const getMovieRaviews = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/reviews`);
  return data.results;
};

const moviesApi = {
  searchMovies,
  getMoviesInTrend,
  getMovieDetails,
  getMovieCast,
  getMovieRaviews,
  Configuration,
};

export default moviesApi;
