import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './homeScreen/HomeScreen';
import NoteScreen from './noteScreen/NoteScreen';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  screenHeader: { backgroundColor: '#482804' },
});

const stylesOptions = {
  headerStyle: styles.screenHeader,
  headerTintColor: '#fff',
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Notes App',
            ...stylesOptions,
          }}
        />
        <Stack.Screen
          name="Note"
          component={NoteScreen}
          options={{ ...stylesOptions }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
