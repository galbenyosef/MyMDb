import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NO_IMAGE_URL, windowHeight} from '../../utilities/Utilities';

const MyListItem = ({
  item: {Title, Year, Poster, imdbID},
  index,
  seperators,
  onItemPress,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onItemPress(imdbID)}
      style={{
        ...styles.container,
        backgroundColor: index % 2 ? 'black' : 'grey',
      }}>
      <Image
        resizeMode={'stretch'}
        source={{uri: Poster !== 'N/A' ? Poster : NO_IMAGE_URL}}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <Text style={{...styles.title, color: index % 2 ? 'white' : 'black'}}>
          {Title}
        </Text>
        <Text style={{...styles.year, color: index % 2 ? 'white' : 'black'}}>
          {Year}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    height: (windowHeight - 140) / 3.5,
    flexDirection: 'row',
    padding: 20,
  },
  contentContainer: {width: '60%'},
  image: {width: '33%'},
  title: {fontSize: 26, fontWeight: 'bold'},
  year: {
    fontSize: 20,
  },
});

export default MyListItem;
