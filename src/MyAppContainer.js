import React from 'react';
import {I18nManager, SafeAreaView, StyleSheet} from 'react-native';
import MyStackNavigator from './navigation/MyStackNavigator';
import MyDialogModal from './components/AlertModal/MyDialogModal';
import {useNavigation} from '@react-navigation/native';

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

const MyAppContainer = () => {
  return (
    <SafeAreaView style={styles.navigatorContainer}>
      <MyDialogModal />
      <MyStackNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navigatorContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default MyAppContainer;
