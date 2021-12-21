import React from 'react';
import styled from 'styled-components';
import Colors from '../../theme/colors';
import withAppManager from '../../utilities/withAppManager';
import MenuButton from './MenuButton';


function calculatePaddingLeft(
  offsetLeft,
  variant,
  sideNavExpanded,
) {
  if ((variant === 'loggedIn' || variant === 'hasBackLink') && !sideNavExpanded) {
    return `padding-left: calc(${offsetLeft}px + 40px); transition: padding-left 400ms`;
  }
  if ((variant === 'loggedIn' || variant === 'hasBackLink') && sideNavExpanded) {
    return `padding-left: calc(${offsetLeft}px + 268px); transition: padding-left 400ms`;
  }
  return 'padding-left: 80px';
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 46px;
 ${({ offsetLeft, variant, sideNavExpanded }) => calculatePaddingLeft(offsetLeft, variant, sideNavExpanded)};
`;

function calculateNavBarPadding(viewport) {
  let padding;
  switch (viewport) {
  case 'desktop':
  case 'desktopSmall':
  case 'tablet':
    padding = '0px 40px';
    break;
  case 'mobile':
  case 'mobileSmall':
  default:
    padding = '0px 16px';
    break;
  }
  return padding;
}

const StyledHeader = styled.div`
  position: ${({ viewport }) => (viewport === 'desktop' ? 'absolute' : 'fixed')}; 
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  box-shadow: rgb(166 179 194 / 30%) 0px 4px 14px 0px;
  padding: ${({ viewport }) => calculateNavBarPadding(viewport)};
  height: ${({ viewport }) => (viewport === 'mobileSmall' || viewport === 'mobile' ? '84px' : '94px')}; 
  justify-content: space-between;
  text-align: left;
  display: flex;
  align-items: center;
  width: -webkit-fill-available;
  z-index: 985;
  background-color: ${({ variant, isDesktop }) => (variant === 'loggedOut' || !isDesktop ? Colors.White : Colors.GrayFaded)};
`;

const NavBar = (props) => {
  const {
    children,
    variant,
    offsetLeft,
    sideNavExpanded,
    viewport,
  } = props;

  const isDesktop = viewport === 'desktop';

  return (
    <StyledHeader viewport={viewport} isDesktop={isDesktop} variant={variant}>
      {!isDesktop && (
        <>
          <MenuButton />
          {children}
        </>
      )}
      {isDesktop
        && (
          <>
            <InputWrapper
              offsetLeft={offsetLeft}
              sideNavExpanded={sideNavExpanded}
              variant={variant}
            >
              {/* {renderHeaderContent(variant)} */}
            </InputWrapper>
          </>
        ) }
    </StyledHeader>
    );
};

export default withAppManager(NavBar);