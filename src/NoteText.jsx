import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

export default function NoteText({ text }) {
  const [value, setValue] = useState(text);

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={85}>
      <ScrollView onScroll={Keyboard.dismiss}>
        <TextInput
          placeholder="Insert text here..."
          placeholderTextColor="#aaa"
          value={value}
          onChangeText={(newText) => setValue(newText)}
          scrollEnable={false}
          multiline
          autoFocus
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

NoteText.propTypes = {
  text: PropTypes.string.isRequired,
};
