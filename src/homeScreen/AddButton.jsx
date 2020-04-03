import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components/native';
import { setNote } from '../notesStorage';

const AddButtonWrapper = styled.View`
  width: 150px;
  padding-right: 20px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AddButtonText = styled.Text`
  font-size: 16.5px;
  color: #fff;
`;

const PlusIcon = () => (
  <FontAwesomeIcon icon={faPlus} size={24} color="#fff" />
);

export default function AddButton({ text }) {
  const [disabled, setDisabled] = useState(false);
  const navigation = useNavigation();

  const storeNoteAndRedirect = () => {
    setNote('untitled', '')
      .then((note) => {
        setDisabled(false);
        navigation.navigate('Note', { key: note.key });
      });
  };

  const handleAddButtonPress = () => {
    setDisabled(true);
    storeNoteAndRedirect();
  };

  if (!text) {
    return (
      <TouchableOpacity onPress={handleAddButtonPress} disabled={disabled}>
        <PlusIcon />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={handleAddButtonPress} disabled={disabled}>
      <AddButtonWrapper>
        <PlusIcon />
        <AddButtonText>{text}</AddButtonText>
      </AddButtonWrapper>
    </TouchableOpacity>
  );
}

AddButton.propTypes = {
  text: PropTypes.string,
};

AddButton.defaultProps = {
  text: '',
};
