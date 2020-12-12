import {Dimensions, StatusBar} from 'react-native';
import imdbLogo from '../../assets/imdb_logo.png';

export const API_URL = 'http://www.omdbapi.com/';
export const API_KEY = '4536fdf9';
export const NO_IMAGE_URL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png';

export const windowHeight =
  Dimensions.get('window').height - StatusBar.currentHeight;

export const windowWidth = Dimensions.get('window').width;

export const scrollToTop = (listRef) =>
  listRef?.current?.scrollToOffset({animated: true, offset: 0});

export const isEmptyObject = (obj) =>
  obj && typeof obj === 'object' && !Object.keys(obj).length;

export const getLogo = () => imdbLogo;
