import React from 'react';
import styled from 'styled-components';
import Colors from '../../theme/colors';
import withAppManager from '../../utilities/withAppManager';
import MenuButton from './MenuButton';


function calculatePaddingLeft(
  offsetLeft,
  sideNavExpanded,
) {
  if (!sideNavExpanded) {
    return `padding-left: calc(${offsetLeft}px + 40px); transition: padding-left 400ms`;
  }
  if (sideNavExpanded) {
    return `padding-left: calc(${offsetLeft}px + 268px); transition: padding-left 400ms`;
  }
  return 'padding-left: 80px';
}

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 46px;
 ${({ offsetLeft, sideNavExpanded }) => calculatePaddingLeft(offsetLeft, sideNavExpanded)};
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
  background-color: ${({ isDesktop }) => !isDesktop ? Colors.White : Colors.GrayFaded};
`;

const NavBar = (props) => {
  const {
    children,
    offsetLeft,
    sideNavExpanded,
    viewport,
  } = props;

  const isDesktop = viewport === 'desktop';

  return (
    <StyledHeader viewport={viewport} isDesktop={isDesktop}>
      {!isDesktop && (
        <>
          <MenuButton />
          {children}
        </>
      )}
      {isDesktop
        && (
          <>
            <ContentWrapper
              offsetLeft={offsetLeft}
              sideNavExpanded={sideNavExpanded}
            >
            {children}
            </ContentWrapper>
          </>
        ) }
    </StyledHeader>
    );
};

export default withAppManager(NavBar);