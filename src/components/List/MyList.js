import React, {useRef, useEffect, useCallback} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import MyAnimatedBackground from '../../components/AnimatedBackground/MyAnimatedBackground';
import {useDispatch, useSelector} from 'react-redux';
import {scrollToTop} from '../../utilities/Utilities';
import {fetchMovies, setPage} from '../../redux/actions/Actions';
import {useNavigation} from '@react-navigation/native';
import MyListItem from './MyListItem';
import {StackActions} from '@react-navigation/native';

const MyList = (props) => {
  const movies = useSelector((state) => state.movies);
  const page = useSelector((state) => state.page);
  const currentMoviesCount = useSelector((state) => state.currentMoviesCount);
  const totalMoviesCount = useSelector((state) => state.totalMoviesCount);
  const moveToTop = useSelector((state) => state.moveToTop);
  const navigation = useNavigation();

  const listRef = useRef(null);
  const dispatch = useDispatch();

  const onItemPress = useCallback(
    (imdbID) => {
      navigation.dispatch(StackActions.push('Details', {imdbID}));
    },
    [navigation],
  );

  useEffect(() => {
    scrollToTop(listRef);
  }, [moveToTop, listRef]);

  useEffect(() => {
    if (page > 1) {
      console.log('moving to page ' + page);
      dispatch(fetchMovies(null, page));
    }
  }, [dispatch, page]);

  console.log('List Rendered');

  return (
    <View style={styles.container}>
      <FlatList
        removeClippedSubviews={true}
        style={styles.list}
        data={movies}
        keyExtractor={({imdbID}) => imdbID}
        renderItem={(props) => (
          <MyListItem {...props} onItemPress={onItemPress} />
        )}
        keyboardShouldPersistTaps={'handled'}
        ref={listRef}
        onEndReachedThreshold={100}
        onEndReached={() => {
          if (currentMoviesCount < totalMoviesCount) {
            dispatch(setPage(page + 1));
          }
        }}
      />
      <MyAnimatedBackground
        active={!movies?.length}
        topOffset={140}
        bottomOffset={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  list: {
    width: '100%',
  },
});

export default MyList;
