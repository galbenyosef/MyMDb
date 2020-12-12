import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {clearSelectedMovie, fetchMovie} from '../../redux/actions/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {getLogo, isEmptyObject, NO_IMAGE_URL} from '../../utilities/Utilities';
import MyAnimatedBackground from '../../components/AnimatedBackground/MyAnimatedBackground';
import {Icon} from 'react-native-elements';

const Details = () => {
  const {
    params: {imdbID},
  } = useRoute();
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.selectedMovie);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovie(imdbID));
    }
    return () => dispatch(clearSelectedMovie());
  }, [dispatch, imdbID]);

  if (loading || !selectedMovie || isEmptyObject(selectedMovie)) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MyAnimatedBackground />
        <ActivityIndicator size={120} color={'black'} />
      </View>
    );
  }

  const {
    Title,
    Poster,
    imdbRating,
    imdbVotes,
    Released,
    Runtime,
    Genre,
    Plot,
  } = selectedMovie;

  return (
    <View style={styles.container}>
      <MyAnimatedBackground />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{Title}</Text>
      </View>

      <Image
        source={{uri: Poster !== 'N/A' ? Poster : NO_IMAGE_URL}}
        resizeMode={'contain'}
        style={styles.image}
      />

      <ScrollView>
        <Text style={styles.plotText}>{Plot}</Text>
      </ScrollView>

      <View style={styles.infoContainer}>
        {/*Rating*/}
        <View style={styles.infoTopView}>
          <View style={styles.rankingContainer}>
            <View style={styles.starContainer}>
              <Icon name={'star'} size={50} color={'gold'} />
            </View>
            <View style={styles.rankingTextContainer}>
              <Text style={styles.rankingTextActual}>
                {imdbRating}
                <Text style={styles.rankingTextTotal}>/10</Text>
              </Text>
              <Text style={styles.rankingTotalVotes}>{imdbVotes}</Text>
            </View>
          </View>
          <View style={styles.rankingContainerSpacer} />
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`https://www.imdb.com/title/${imdbID}`)
            }>
            <Image
              resizeMode={'contain'}
              source={getLogo()}
              style={styles.imdbLogo}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoBottomView}>
          <View style={styles.infoBottomViewColumn}>
            <Text style={styles.columnTextSubject}>Released:</Text>
            <Text style={styles.columnTextContent}>{Released}</Text>
          </View>
          <View style={styles.infoBottomViewColumn}>
            <Text style={styles.columnTextSubject}>Genre:</Text>
            <Text style={styles.columnTextContent}>{Genre}</Text>
          </View>
          <View style={styles.infoBottomViewColumn}>
            <Text style={styles.columnTextSubject}>Runtime:</Text>
            <Text style={styles.columnTextContent}>{Runtime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', padding: 20},
  titleContainer: {paddingBottom: 20, justifyContent: 'center'},
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  image: {height: 400, width: '100%', marginBottom: 20},
  plotText: {fontSize: 24},
  infoContainer: {
    width: '100%',
  },
  infoTopView: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  rankingContainer: {
    flexDirection: 'row',
  },
  rankingTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    justifyContent: 'center',
  },
  rankingTextActual: {fontSize: 34, fontWeight: 'bold'},
  rankingTextTotal: {fontSize: 24},
  rankingTotalVotes: {fontSize: 18},
  rankingContainerSpacer: {width: 25},
  imdbLogo: {height: 80, width: 160},
  infoBottomView: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  infoBottomViewColumn: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  columnTextSubject: {fontSize: 28, fontWeight: 'bold'},
  columnTextContent: {textAlign: 'center', fontSize: 22},
});

export default Details;
