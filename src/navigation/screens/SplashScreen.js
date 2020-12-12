import React, {useRef, useEffect} from 'react';
import {StyleSheet, Animated, Text, Easing} from 'react-native';
import {StackActions} from '@react-navigation/native';
import MyAnimatedBackground from '../../components/AnimatedBackground/MyAnimatedBackground';

import {windowHeight, windowWidth} from '../../utilities/Utilities';

const SplashScreen = ({navigation}) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const slideAnimations = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  const authorScaleAnim = useRef(new Animated.Value(0)).current;

  const screenRotateAnim = useRef(new Animated.Value(0)).current;
  const screenScaleAnim = useRef(new Animated.Value(1)).current;

  const play = (anim, toValue, duration) =>
    Animated.timing(anim, {
      toValue,
      duration,
      easing: Easing.in(Easing.bounce),
      useNativeDriver: true,
    });

  const playScreenSwitch = () =>
    Animated.parallel([
      Animated.timing(screenRotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(screenScaleAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => navigation.dispatch(StackActions.replace('Home')));

  useEffect(() => {
    play(opacityAnim, 1, 700 * 4).start();
    Animated.sequence([
      play(slideAnimations[0], windowHeight / 2 + 72 / 2, 700),
      play(slideAnimations[1], -windowWidth, 700),
      play(slideAnimations[2], -windowHeight / 2 - 72 / 2, 700),
      play(slideAnimations[3], windowWidth, 700),
      play(authorScaleAnim, 1, 2000),
    ]).start(({finished}) => playScreenSwitch());
  }, []);

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: [
          {scale: screenScaleAnim},
          {
            rotate: screenRotateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            }),
          },
        ],
      }}>
      <MyAnimatedBackground />
      <Animated.View style={{...styles.textBackground, opacity: opacityAnim}} />
      <Animated.Text
        style={{
          ...styles.movingLogo,
          top: -72,
          transform: [{translateY: slideAnimations[0]}],
        }}>
        My<Text style={{color: 'rgba(0,0,0,0)'}}>MDb</Text>
      </Animated.Text>
      <Animated.Text
        style={{
          ...styles.movingLogo,
          ...styles.transparent,
          top: windowHeight / 2 - 72 / 2,
          left: windowWidth,
          transform: [{translateX: slideAnimations[1]}],
        }}>
        My<Text style={{color: 'black'}}>M</Text>
        <Text style={{color: 'rgba(0,0,0,0)'}}>Db</Text>
      </Animated.Text>
      <Animated.Text
        style={{
          ...styles.movingLogo,
          ...styles.transparent,
          bottom: -72,
          transform: [{translateY: slideAnimations[2]}],
        }}>
        My<Text style={styles.transparent}>M</Text>
        <Text style={{color: 'black'}}>D</Text>
        <Text style={styles.transparent}>b</Text>
      </Animated.Text>
      <Animated.Text
        style={{
          ...styles.movingLogo,
          ...styles.transparent,
          top: windowHeight / 2 - 72 / 2,
          left: -windowWidth,
          transform: [{translateX: slideAnimations[3]}],
        }}>
        My<Text style={styles.transparent}>M</Text>
        <Text style={styles.transparent}>D</Text>
        <Text style={{color: 'black'}}>b</Text>
      </Animated.Text>

      <Animated.Text
        style={{
          ...styles.scalingAuthorName,
          transform: [{scale: authorScaleAnim}],
        }}>
        By Gal Ben yosef
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBackground: {
    width: 5 * 72,
    borderRadius: 20,
    backgroundColor: 'rgb(230, 185, 30)',
    height: 120,
    borderWidth: 8,
  },
  movingLogo: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 72,
    lineHeight: 72,
    zIndex: 1,
  },
  scalingAuthorName: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    textAlign: 'center',
    fontSize: 32,
    height: 100,
    zIndex: 1,
  },
  transparent: {color: 'rgba(0,0,0,0)'},
});

export default SplashScreen;
