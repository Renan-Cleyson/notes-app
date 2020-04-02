import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { removeNote } from './notesStorage';

export default function NotesFlatList({ notes, setNotes }) {
  const navigation = useNavigation();
  const handleRemove = (index) => {
    removeNote(notes[index].key);
    setNotes((prevState) => (
      prevState.slice(0, index).concat(prevState.slice(index + 1))
    ));
  };

  return (
    <FlatList
      data={notes}
      renderItem={({ index, item: { title, key } }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Note', { key })}
          onLongPress={() => {
            Alert.alert(
              title,
              'Do you want to delete this note?',
              [{ text: 'No' }, { text: 'Yes', onPress: () => handleRemove(index) }],
            );
          }}
        >
          <Text>{title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

NotesFlatList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  setNotes: PropTypes.func.isRequired,
};
