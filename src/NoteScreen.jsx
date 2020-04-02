import React, { useState, useEffect } from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import TextArea from './TextArea';
import { SaveButton } from './buttons';
import { getNote } from './notesStorage';

export default function NoteScreen({ route: { params } }) {
  const [value, setValue] = useState('');
  const [noteName, setNoteName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getNote(params.key)
      .then((note) => {
        setNoteName(note.title);
        setValue(note.text);
        setIsLoading(false);
      });
  }, [params, navigation]);

  navigation.setOptions({
    headerTitle: () => (
      <TextInput value={noteName} onChangeText={(newTitle) => setNoteName(newTitle)} />
    ),
    headerRight: () => (
      <SaveButton
        buttonTitle="SAVE"
        notes={{ text: value, title: noteName, key: params.key }}
      />
    ),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <TextArea value={value} setValue={setValue} />
  );
}

NoteScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ key: PropTypes.string.isRequired }),
  }).isRequired,
};
