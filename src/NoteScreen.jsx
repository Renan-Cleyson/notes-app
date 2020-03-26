import React from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import NoteText from './NoteText';
import model from './backendModel';

export default function NoteScreen({ route: { params } }) {
  const { text, title } = model.data.find(({ id }) => id === params.id);
  useNavigation().setOptions({ title });

  return (
    <NoteText text={text} />
  );
}

NoteScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
};
