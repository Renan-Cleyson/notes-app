import React from 'react';
import {
  KeyboardAvoidingView,
} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const TextAreaInput = styled.TextInput`
  font-size: 18px;
  line-height: 25px;
`;

export default function TextArea({ value, onChangeText }) {
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-100}>
      <TextAreaInput
        placeholder="Tap here to insert text..."
        placeholderTextColor="#555"
        value={value}
        onChangeText={onChangeText}
        multiline
      />
    </KeyboardAvoidingView>
  );
}

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
};
