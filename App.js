/**
 * eWave Exercise
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import store from './src/redux/store';
import MyAppContainer from './src/MyAppContainer';
import {Modal, View} from 'react-native';

const App: () => React$Node = () => {
  return (
    <StoreProvider store={store}>
      <MyAppContainer />
    </StoreProvider>
  );
};

export default App;
