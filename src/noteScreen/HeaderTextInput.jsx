import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const HeaderTextInputWrapper = styled.TextInput`
  width: 200px;
  padding: 0 5px;
  color: #fff;
  font-size: 16.5px;
  border: ${({ isFocused }) => (isFocused ? '1.5px #9e6627' : 'none')};
`;

export default function HeaderTextInput({ value, onChangeText }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <HeaderTextInputWrapper
      value={value}
      onChangeText={onChangeText}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      isFocused={isFocused}
    />
  );
}

HeaderTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
};
