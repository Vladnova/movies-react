import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = { api_key: '2a30abfbe9eb903004963b24640e499f' };

const searchMovies = async ({ query = '', page = 1 }) => {
  try {
    const { data } = await axios.get('/search/movie', {
      params: { query, page },
    });
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

const Configuration = async () => {
  try {
    const { data } = await axios.get('/configuration');
    return data.images;
  } catch (error) {
    console.log(error);
  }
};

const getMoviesInTrend = async (page = 1) => {
  try {
    const { data } = await axios.get(`/trending/movie/day?&page=${page}`);
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

const getMovieDetails = async movieId => {
  const { data } = await axios.get(`movie/${movieId}`);
  return data;
};

const getMovieCast = async movieId => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/credits`);
    return data.cast;
  } catch (error) {
    console.log(error);
  }
};

const getMovieRaviews = async movieId => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/reviews`);
    return data.results;
  } catch (error) {
    console.log(error);
  }
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
