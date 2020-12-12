import React, {useEffect, useMemo, useRef} from 'react';
import {SearchBar} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  onClear,
  onSearchChange,
  fetchMovies,
} from '../../redux/actions/Actions';

const MySearchBar = () => {
  const mySearchBarRef = useRef(null);
  const query = useSelector((state) => state.query);
  const loading = useSelector((state) => state.loading);
  const alertMessage = useSelector((state) => state.alertMessage);
  const dispatch = useDispatch();

  const ClearIcon = useMemo(
    () => (
      <TouchableOpacity
        style={styles.searchBarIcons}
        onPress={() => !loading && dispatch(onClear())}>
        <Icon name="cancel" size={50} />
      </TouchableOpacity>
    ),
    [loading, dispatch],
  );

  const SearchIcon = useMemo(
    () => () => {
      if (loading) {
        return <ActivityIndicator size={50} color="#0000ff" />;
      } else if (alertMessage) {
        return (
          <Icon
            type={'feather'}
            name="alert-triangle"
            size={50}
            color={'black'}
          />
        );
      }
      return (
        <TouchableOpacity
          onPress={() => dispatch(fetchMovies(query))}
          disabled={!query}
          style={styles.searchBarIcons}>
          <Icon
            color={query ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.3)'}
            name="search"
            size={50}
          />
        </TouchableOpacity>
      );
    },
    [loading, query, dispatch, alertMessage],
  );

  /*
  useEffect(() => {
    mySearchBarRef && mySearchBarRef.current.blur();
  }, [mySearchBarRef, loading]);
*/

  return (
    <View style={styles.container}>
      <SearchBar
        platform={'android'}
        placeholder="Search By Title"
        clearIcon={ClearIcon}
        cancelIcon={SearchIcon}
        searchIcon={SearchIcon}
        containerStyle={styles.searchBarContainer}
        leftIconContainerStyle={styles.leftIconSearchBarContainer}
        inputStyle={styles.input}
        autoFocus={true}
        ref={mySearchBarRef}
        rightIconContainerStyle={{flex: 0.2, marginRight: 0}}
        onChangeText={(txt) => dispatch(onSearchChange(txt))}
        value={query}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarContainer: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    borderBottomWidth: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  leftIconSearchBarContainer: {
    flex: 0.2,
    marginLeft: 0,
  },
  input: {
    flex: 0.6,
    fontSize: 26,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  searchBarIcons: {width: '100%', justifyContent: 'center', height: 70},
});

export default MySearchBar;
