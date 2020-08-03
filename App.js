/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from './Screens/Home';
import makeAFolder from './helpers/makeAFolder';

enableScreens();
const Stack = createNativeStackNavigator();

class App extends React.Component {
  componentDidMount() {
    makeAFolder(
      'Notefy',
      () => console.log('success'),
      (e) => {
        console.log(e);
      },
    );
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
