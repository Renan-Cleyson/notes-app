import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import NoteScreen from './NoteScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          title="Notes App"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Note"
          component={NoteScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
