import React, {useRef, useEffect} from 'react';
import {StyleSheet, Animated, Dimensions, StatusBar} from 'react-native';
import {getLogo, windowHeight, windowWidth} from '../../utilities/Utilities';

const StatusBarHeight = StatusBar.currentHeight;

const MyAnimatedBackground = ({
  active = 1,
  topOffset = 0,
  bottomOffset = 0,
}) => {
  const firstParticleUp = useRef(new Animated.Value(0)).current;
  const secondParticleUp = useRef(new Animated.Value(0)).current;
  const thirdParticleUp = useRef(new Animated.Value(0)).current;

  const firstParticleSlide = useRef(new Animated.Value(0)).current;
  const secondParticleSlide = useRef(new Animated.Value(0)).current;
  const thirdParticleSlide = useRef(new Animated.Value(0)).current;
  const lastParticleSlide = useRef(new Animated.Value(0)).current;

  const playFirstParticleUp = () => {
    firstParticleUp.setValue(0);
    Animated.timing(firstParticleUp, {
      toValue: -windowHeight - 80 + topOffset,
      duration: 3500,
      useNativeDriver: true,
    }).start(({finished}) => playFirstParticleUp());
  };
  const playSecondParticleUp = () => {
    secondParticleUp.setValue(0);
    Animated.timing(secondParticleUp, {
      toValue: -windowHeight - 80 + topOffset,
      duration: 2300,
      useNativeDriver: true,
    }).start(({finished}) => playSecondParticleUp());
  };
  const playThirdParticleUp = () => {
    thirdParticleUp.setValue(0);
    Animated.timing(thirdParticleUp, {
      toValue: windowHeight + 80 - topOffset,
      duration: 4600,
      useNativeDriver: true,
    }).start(({finished}) => playThirdParticleUp());
  };

  const playFirstParticleSlide = () => {
    firstParticleSlide.setValue(0);
    Animated.timing(firstParticleSlide, {
      toValue: windowWidth + (80 * 2127) / 1024,
      duration: 4600,
      useNativeDriver: true,
    }).start(({finished}) => playFirstParticleSlide());
  };

  const playSecondParticleSlide = () => {
    secondParticleSlide.setValue(0);
    Animated.timing(secondParticleSlide, {
      toValue: -windowWidth - (80 * 2127) / 1024,
      duration: 2800,
      useNativeDriver: true,
    }).start(({finished}) => playSecondParticleSlide());
  };

  const playThirdParticleSlide = () => {
    thirdParticleSlide.setValue(0);
    Animated.timing(thirdParticleSlide, {
      toValue: -windowWidth - (80 * 2127) / 1024,
      duration: 3700,
      useNativeDriver: true,
    }).start(({finished}) => playThirdParticleSlide());
  };

  const playLastParticleSlide = () => {
    lastParticleSlide.setValue(0);
    Animated.timing(lastParticleSlide, {
      toValue: windowWidth + (80 * 2127) / 1024,
      duration: 1900,
      useNativeDriver: true,
    }).start(({finished}) => playLastParticleSlide());
  };

  const play = (anim, toValue, duration) =>
    Animated.timing(anim, {
      toValue,
      duration,
      useNativeDriver: true,
    });

  useEffect(() => {
    Animated.parallel([
      playFirstParticleUp(),
      playSecondParticleUp(),
      playThirdParticleUp(),
      playFirstParticleSlide(),
      playSecondParticleSlide(),
      playThirdParticleSlide(),
      playLastParticleSlide(),
    ]).start(({finished}) => {});
  }, []);

  if (!active) {
    return null;
  }
  return (
    <>
      <Animated.Image
        source={getLogo()}
        resizeMode={'contain'}
        style={{
          ...styles.firstParticleUp,
          transform: [{translateY: firstParticleUp}],
        }}
      />
      <Animated.Image
        source={getLogo()}
        resizeMode={'contain'}
        style={{
          ...styles.secondParticleUp,
          transform: [{translateY: secondParticleUp}],
        }}
      />

      <Animated.Image
        source={getLogo()}
        resizeMode={'contain'}
        style={{
          ...styles.thirdParticleUp,
          transform: [{translateY: thirdParticleUp}],
        }}
      />
      <Animated.Image
        source={getLogo()}
        resizeMode={'contain'}
        style={{
          ...styles.firstParticleSlide,
          transform: [{translateX: firstParticleSlide}],
        }}
      />
      <Animated.Image
        source={getLogo()}
        resizeMode={'contain'}
        style={{
          ...styles.secondParticleSlide,
          transform: [{translateX: secondParticleSlide}],
        }}
      />
      <Animated.Image
        source={getLogo()}
        resizeMode={'contain'}
        style={{
          ...styles.thirdParticleSlide,
          transform: [{translateX: thirdParticleSlide}],
        }}
      />
      <Animated.Image
        source={getLogo()}
        resizeMode={'contain'}
        style={{
          ...styles.lastParticleSlide,
          transform: [{translateX: lastParticleSlide}],
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  firstParticleUp: {
    bottom: -80,
    left: 20,
    position: 'absolute',
    height: 80,
    width: (80 * 2127) / 1024,
    zIndex: -1,
    opacity: 0.3,
  },
  secondParticleUp: {
    bottom: -80,
    right: 20,
    position: 'absolute',
    height: 80,
    width: (80 * 2127) / 1024,
    zIndex: -1,
    opacity: 0.3,
  },
  thirdParticleUp: {
    top: -80,
    position: 'absolute',
    height: 80,
    width: (80 * 2127) / 1024,
    zIndex: -1,
    opacity: 0.3,
  },
  firstParticleSlide: {
    left: -(80 * 2127) / 1024,
    top: 80 * 1,
    position: 'absolute',
    height: 80,
    width: (80 * 2127) / 1024,
    zIndex: -1,
    opacity: 0.3,
  },
  secondParticleSlide: {
    right: -(80 * 2127) / 1024,
    top: 80 * 3,
    position: 'absolute',
    height: 80,
    width: (80 * 2127) / 1024,
    zIndex: -1,
    opacity: 0.3,
  },
  thirdParticleSlide: {
    right: -(80 * 2127) / 1024,
    bottom: 80 * 3,
    position: 'absolute',
    height: 80,
    width: (80 * 2127) / 1024,
    zIndex: -1,
    opacity: 0.3,
  },
  lastParticleSlide: {
    bottom: 80,
    left: -(80 * 2127) / 1024,
    position: 'absolute',
    height: 80,
    width: (80 * 2127) / 1024,
    zIndex: -1,
    opacity: 0.3,
  },
});

export default MyAnimatedBackground;
