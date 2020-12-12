import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Details from './screens/Details';
import SplashScreen from './screens/SplashScreen';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

const Stack = createStackNavigator();

const MyStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({navigation, route: {name}}) => ({
          headerStyle: {
            backgroundColor: 'gold',
            elevation: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 28,
            color: 'black',
          },
          headerTitleAlign: 'center',
        })}
        initialRouteName="SplashScreen">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          options={({navigation, route}) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  style={{margin: 0, height: 70}}
                  size={70}
                  name="arrow-left"
                />
              </TouchableOpacity>
            ),
          })}
          name="Details"
          component={Details}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStackNavigator;
