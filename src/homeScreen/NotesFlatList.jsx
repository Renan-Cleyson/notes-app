import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { removeNote } from '../notesStorage';

const NoteCard = styled.TouchableOpacity`
  padding-bottom: 10px;
  justify-content: center;
`;

const NoteTitle = styled.Text`
  padding-left: 5px;
  font-size: 20px;
`;

const Underline = styled.View`
  background-color: ${({ underlineColor }) => underlineColor || '#000'};
  height: 0.55px;
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
            <Underline />
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
