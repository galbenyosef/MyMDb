import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {useRoute, useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

const MyHeader = () => {
  const {name: routeName} = useRoute();
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 69,
        borderBottomWidth: 1,
      }}>
      <View style={{flex: 0.2, alignItems: 'center'}}>
        {routeName === 'Details' ? (
          <TouchableOpacity
            onPress={() => navigation.dispatch(CommonActions.goBack())}>
            <Icon style={{margin: 0, height: 70}} size={70} name="arrow-left" />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{flex: 0.6}}>
        <Text style={{fontSize: 30, textAlign: 'center'}}>{routeName}</Text>
      </View>
      <View style={{flex: 0.2, alignItems: 'center'}} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyHeader;
