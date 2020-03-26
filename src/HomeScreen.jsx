import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import notesStorage from './notesStorage';
import model from './backendModel.json';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  noteBadge: {
    height: '10%',
  },
});

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <FlatList
      data={model.data}
      keyExtractor={({ id }) => id}
      renderItem={({ item: { title, id } }) => (
        <>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('Note', { id });
            }}
          >
            <Text style={styles.title}>{title}</Text>
          </TouchableHighlight>
        </>
      )}
    />
  );
}
