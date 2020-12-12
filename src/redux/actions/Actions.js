import {getMovie, getMovies} from '../../api/api';
import {
  SET_ALERT,
  SET_PAGE,
  SET_LOADING,
  SET_QUERY_RESULT,
  SET_QUERY,
  CLEAR_ALL,
  SET_SELECTED_MOVIE,
} from './ActionTypes';

export const setAlert = (message = '') => ({
  type: SET_ALERT,
  payload: {message},
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: {page},
});

export const setLoading = (status = false) => ({
  type: SET_LOADING,
  payload: {status},
});

export const onSearchChange = (query = '') => ({
  type: SET_QUERY,
  payload: {query},
});

export const setQueryResult = (
  movies = [],
  current = 0,
  total = 0,
  concat = false,
) => ({
  type: SET_QUERY_RESULT,
  payload: {movies, current, total, concat},
});

const setSelectedMovie = (movie) => ({
  type: SET_SELECTED_MOVIE,
  payload: {selectedMovie: movie},
});

export const clearSelectedMovie = () => ({
  type: SET_SELECTED_MOVIE,
  payload: {selectedMovie: null},
});

export const fetchMovie = (imdbID) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const resp = await getMovie(imdbID);
    const {Response, Error} = resp?.data;
    if (Response === 'True') {
      dispatch(setSelectedMovie(resp.data));
    } else if (Response === 'False' && Error) {
      throw Error;
    } else {
      throw 'Response cannot be handled';
    }
  } catch (err) {
    dispatch(setAlert(err));
    // Handle Error Here
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchMovies = (query = '', page = 1) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch(setLoading(true));

    const resp = await getMovies(page > 1 ? getState().query : query, page);
    const {Response, Search, totalResults, Error} = resp?.data;

    if (
      Response === 'True' &&
      Array.isArray(Search) &&
      parseInt(totalResults) > 0
    ) {
      dispatch(setQueryResult(Search, Search.length, totalResults, page > 1));
    } else if (Response === 'False' && Error) {
      throw Error;
    } else {
      throw 'Response cannot be handled';
    }
  } catch (err) {
    dispatch(setAlert(err));
    // Handle Error Here
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const onClear = () => ({
  type: CLEAR_ALL,
});
