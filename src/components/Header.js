import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};

const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  height: 78px;
  width: calc(100% - 32px);
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: rgb(166 179 194 / 30%) 0px 4px 14px 0px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
`;

const Header = (props) => {
  const { title, children } = props;

  return(
    <Wrapper>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  )
}

Header.propTypes = propTypes;

export default Header;