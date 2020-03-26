import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import notesStorage from './notesStorage';

export const AddButton = () => {
  function addButtonOnPress() {
    notesStorage.setNote("Lorem ipsum", "ahshashahshashahshashahshashahshashahshashahshashahshashahshashahshashahshashahshash")
  }

  return (
    <TouchableWithoutFeedback onPress={addButtonOnPress}>
      <FontAwesomeIcon icon={faPlusCircle} />
    </TouchableWithoutFeedback>
  );
};

export const DeleteButton = () => {
  function deleteButtonOnPress() {
    console.log(notesStorage.getNote())
  }

  return (
    <TouchableWithoutFeedback onPress={deleteButtonOnPress}>
      <FontAwesomeIcon icon={faMinusCircle} />
    </TouchableWithoutFeedback>
  );
};
