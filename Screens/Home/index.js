import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import MyNotes from './MyNotes';
import NewNote from './NewNote';

const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Notes" component={MyNotes} />
      <Stack.Screen name="New Note" component={NewNote} />
    </Stack.Navigator>
  );
}

export default Home;
