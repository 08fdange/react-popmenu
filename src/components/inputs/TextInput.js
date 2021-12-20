import React from 'react';
import styled from 'styled-components';
import Colors from '../../theme/colors';

const StyledInput = styled.input`
  height: 42px;
  width: 100%;
  font-size: 22px;
  font-family: 'Raleway';
  color: ${Colors.GrayVeryDark};
  border: 1px solid lightgray;
  border-radius: 6px;
  padding-left: 6px;
  -webkit-appearance: none;
  &:focus {
    outline: none;
    border: 1px solid black;
  }
`;

const TextInput = React.forwardRef((props, ref) => {
  return <StyledInput ref={ref} {...props} />
});

export default TextInput;
