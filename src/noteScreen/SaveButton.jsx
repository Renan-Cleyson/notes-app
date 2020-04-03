import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { setNote } from '../notesStorage';

const SaveButtonWrapper = styled.TouchableOpacity`
  padding-right: 20px;
  align-items: center;
`;

const SaveButtonText = styled.Text`
  color: #fff;
`;

export default function SaveButton({ note: { title, text, key } }) {
  const [disabled, setDisabled] = useState(false);

  const handleSaveButtonPress = () => {
    setDisabled(true);
    setNote(title, text, key)
      .then(() => {
        setDisabled(false);
      });
  };

  return (
    <SaveButtonWrapper onPress={handleSaveButtonPress} disabled={disabled}>
      <SaveButtonText>SAVE</SaveButtonText>
    </SaveButtonWrapper>
  );
}

SaveButton.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  }).isRequired,
};
