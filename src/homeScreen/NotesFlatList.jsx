import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { removeNote } from '../notesStorage';

const NoteCard = styled.TouchableOpacity`
  height: 60px;
  padding: 0 20px;
  margin-bottom: 10px;
  border: 2px solid #ac7c46;
  border-radius: 5px;

  justify-content: center;
`;

const NoteTitle = styled.Text`
  font-size: 20px;
  padding-bottom: 10px;
`;

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
        <NoteCard
          onPress={() => navigation.navigate('Note', { key })}
          onLongPress={() => {
            Alert.alert(
              title,
              'Do you want to delete this note?',
              [{ text: 'No' }, { text: 'Yes', onPress: () => handleRemove(index) }],
            );
          }}
        >
          <View>
            <NoteTitle>{title}</NoteTitle>
          </View>
        </NoteCard>
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
