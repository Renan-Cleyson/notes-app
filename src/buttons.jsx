import React, { useState } from 'react';
import { TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { setNote } from './notesStorage';

const PlusIcon = () => <FontAwesomeIcon icon={faPlus} />;

export function AddButton({ onPress }) {
  const [disabled, setDisabled] = useState(false);
  const navigation = useNavigation();

  const handleAddButtonPress = () => {
    setDisabled(true);
    setNote('untitled', '').then((note) => {
      setDisabled(false);
      navigation.navigate('Note', { key: note.key });
      onPress(note);
    });
  };

  return (
    <TouchableOpacity onPress={handleAddButtonPress} disabled={disabled}>
      <PlusIcon />
    </TouchableOpacity>
  );
}

AddButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export function SaveButton({ buttonTitle, notes: { title, text, key } }) {
  const [disabled, setDisabled] = useState(false);

  const handleSaveButtonPress = () => {
    setDisabled(true);
    setNote(title, text, key)
      .then(() => {
        setDisabled(false);
      });
  };

  return (
    <Button
      title={buttonTitle}
      onPress={handleSaveButtonPress}
      disabled={disabled}
    />
  );
}

SaveButton.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  notes: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  }).isRequired,
};
