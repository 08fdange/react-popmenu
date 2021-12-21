import React from 'react';
import styled from 'styled-components';
import Colors from '../../theme/colors';
import withAppManager from '../../utilities/withAppManager';

const ButtonIcon = styled.button`
  display: flex;
  width: 50px;
  height: 45px;
  padding-top: 20px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  justify-content: center;
`;

const MenuWrapper = styled.div`
  span:first-child{
    transform: translateY(0) rotateZ(0);
    transition: transform 400ms ease-in-out;
    ${({ isExpanded }) => isExpanded
  && `
    transform: translateY(5px) rotateZ(45deg);
    transition: transform 400ms ease-in-out;
  `}
  }
  span:nth-last-child(2){
    width: 16px;
    transform: translateX(0);
    transition: all 400ms;
    ${({ isExpanded }) => isExpanded
  && `
    width: 0;
    transform: translateX(8px);
    transition: all 400ms;
  `}
  }
  span:last-child{
    transform: translateY(0) rotateZ(0);
    transition: transform 400ms ease-in-out;
    margin-bottom: 0;
    ${({ isExpanded }) => isExpanded
  && `
    transform: translateY(-5px) rotateZ(-45deg);
    transition: transform 400ms ease-in-out;
  `}
  }
`;

const HamburgerLine = styled.span`
  display: block;
  width: 16px;
  height: 2px;
  border-radius: 2px;
  margin-bottom: 3px;
  background-color: ${Colors.Gray};
  ${({ isExpanded }) => isExpanded
  && `
    width: 320px;
    transition: width 400ms ease-in-out;
  `}
`;

const MenuButton = (props) => {
  const { sideNavAppHandler, sideNavExpanded, ...rest } = props;

  const toggleExpanded = () => {
    if (sideNavAppHandler) sideNavAppHandler(!sideNavExpanded);
  };

  return (
    <ButtonIcon
      onClick={toggleExpanded}
      {...rest}
    >
      <MenuWrapper isExpanded={sideNavExpanded}>
        <HamburgerLine />
        <HamburgerLine />
        <HamburgerLine />
      </MenuWrapper>
    </ButtonIcon>
  );
};

export default withAppManager(MenuButton);