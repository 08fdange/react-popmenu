import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Colors from '../../theme/colors';

const propTypes = {
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
};

const defaultProps = {
  textColor: Colors.White,
  backgroundColor: Colors.Purple,
  hoverBackgroundColor: Colors.DarkPurple,
};

const StyledButton = styled.button`
  color: ${({ textColor }) => textColor};
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: inline-block;
  font-size: 1em;
  font-family: 'Raleway';
  padding: 8px 12px;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:focus {
    outline: 0;
    box-shadow: inset 0 2px 25px rgba(0, 0, 0, 0.5);
  }
  &:hover {
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor};
  }
`;

const PrimaryButton = (props) => {
  const {
    textColor,
    backgroundColor,
    hoverBackgroundColor,
    onClick,
    children,
    ...rest
  } = props;

  return(
    <StyledButton
      textColor={textColor}
      backgroundColor={backgroundColor}
      hoverBackgroundColor={hoverBackgroundColor}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

PrimaryButton.propTypes = propTypes;
PrimaryButton.defaultProps = defaultProps;

export default PrimaryButton;