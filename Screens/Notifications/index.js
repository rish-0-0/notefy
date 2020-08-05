import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notification Settings" />
    </Stack.Navigator>
  );
}