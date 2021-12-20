import React from 'react';
import styled from 'styled-components';
import Colors from '../../theme/colors';

const StyledTextArea = styled.textarea`
  flex: 1;
  height: 126px;
  width: 100%;
  font-size: 22px;
  font-family: 'Raleway';
  color: ${Colors.GrayVeryDark};
  border: 1px solid lightgray;
  border-radius: 6px;
  padding-left: 6px;
  padding-top: 8px;
  resize: none;
  -webkit-appearance: none;
  &:focus {
    outline: none;
    border: 1px solid black;
  }
`;

const TextAreaInput = React.forwardRef((props, ref) => {
  return <StyledTextArea ref={ref} {...props} />
});

export default TextAreaInput;