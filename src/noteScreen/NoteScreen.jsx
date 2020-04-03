import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import LayoutView from '../styles';
import TextArea from './TextArea';
import HeaderTextInput from './HeaderTextInput';
import SaveButton from './SaveButton';
import { getNote } from '../notesStorage';

export default function NoteScreen({ route: { params } }) {
  const [value, setValue] = useState('');
  const [noteName, setNoteName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const onChangeText = (newText) => setValue(newText);
  const onChangeTitleText = (newText) => setNoteName(newText);

  useEffect(() => {
    const loadNoteById = () => {
      getNote(params.key)
        .then((note) => {
          setNoteName(note.title);
          setValue(note.text);
          setIsLoading(false);
        });
    };
    loadNoteById();
  }, [params, navigation]);
  navigation.setOptions({
    headerTitle: () => (
      <HeaderTextInput value={noteName} onChangeText={onChangeTitleText} />
    ),
    headerRight: () => (
      <SaveButton note={{ text: value, title: noteName, key: params.key }} />
    ),
  });

  if (isLoading) {
    return <LayoutView><ActivityIndicator size="large" /></LayoutView>;
  }
  return (
    <LayoutView>
      <TextArea value={value} onChangeText={onChangeText} />
    </LayoutView>
  );
}

NoteScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ key: PropTypes.string.isRequired }),
  }).isRequired,
};
