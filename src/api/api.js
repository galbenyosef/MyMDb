import axios from 'axios';
import {API_KEY, API_URL} from '../utilities/Utilities';

export const getMovie = (imdbID) =>
  axios.get(`${API_URL}?i=${imdbID}&apikey=${API_KEY}&type=movie`);

export const getMovies = (title, page) =>
  axios.get(`${API_URL}?s=${title}&apikey=${API_KEY}&page=${page}&type=movie`);
