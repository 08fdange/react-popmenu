import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Colors from '../../theme/colors';

const propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
};

const defaultProps = {
  textColor: Colors.White,
};

const StyledButton = styled.button`
  color: ${({ color }) => color};
  background-color: transparent;
  display: inline-block;
  font-size: 1em;
  font-family: 'Raleway';
  padding: 8px 12px;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  &:focus {
    outline: 0;
  }
  &:hover {
    color: ${Colors.Gray};
  }
`;

const TransparentButton = (props) => {
  const {
    color,
    onClick,
    children,
    ...rest
  } = props;

  return(
    <StyledButton
      color={color}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

TransparentButton.propTypes = propTypes;
TransparentButton.defaultProps = defaultProps;

export default TransparentButton;