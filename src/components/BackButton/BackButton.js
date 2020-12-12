import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const MyBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon style={{margin: 0, height: 70}} size={70} name="arrow-left" />
    </TouchableOpacity>
  );
};

export default MyBackButton;
