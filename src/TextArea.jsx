import React from 'react';
import {
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';


export default function TextArea({ value, setValue }) {
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={85}>
      <TextInput
        placeholder="Insert text here..."
        placeholderTextColor="#777"
        value={value}
        onChangeText={(newText) => setValue(newText)}
        multiline
      />
    </KeyboardAvoidingView>
  );
}

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};
