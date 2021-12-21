/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Colors from '../../theme/colors';
import withAppManager from '../../utilities/withAppManager';
import MenuButton from './MenuButton';

function getWidthExpanded(viewport) {
  let width;
  switch (viewport) {
  case 'desktop':
    width = '296px';
    break;
  case 'desktopSmall':
  case 'tablet':
    width = '300px';
    break;
  case 'mobile':
  case 'mobileSmall':
  default:
    // In case calc is not supported
    return `
      width: 96%;
      width:calc(100% - 24px);`;
  }
  return `width: ${width}`;
}

const StyledMenuButton = styled(MenuButton)`
  transform: translateX(0);
  transition: 400ms;
  position: absolute;
  top: 20px;
  left: 21px;
  padding-top: 20px;
  z-index: 987;
 ${({ sideNavExpanded }) => sideNavExpanded
  && `
    transform: translateX(240px);
    transition: transform 400ms;
    transition-delay: 100ms;
  `}
`;

function calculateOffsetTop(viewport) {
  let offsetTop;
  switch (viewport) {
  case 'desktop':
    offsetTop = 0;
    break;
  case 'desktopSmall':
  case 'tablet':
    offsetTop = 96;
    break;
  case 'mobile':
  case 'mobileSmall':
  default:
    offsetTop = 84;
    break;
  }
  return `${offsetTop}px`;
}

const getMargin = (desktop) => {
  if (desktop) {
    return '76px';
  }
  return '32px';
};

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${({ sideNavExpanded }) => !sideNavExpanded && 'overflow: hidden;'}
  height: ${({ viewport }) => (viewport === 'desktopSmall' || viewport === 'tablet' ? 'auto' : '100vh')};
  max-height: ${({ viewport }) => (viewport === 'desktopSmall' || viewport === 'tablet' ? '672px' : undefined)};
  ${({ isDesktop }) => (isDesktop ? 'position: sticky; float: left;' : 'position: fixed; left: 0;')};
  width: ${({ isDesktop }) => (!isDesktop ? 0 : '68px')};
  transition: width 400ms, padding 400ms linear;
  padding-left: ${({ isDesktop, sideNavExpanded }) => (!isDesktop && !sideNavExpanded ? 0 : '12px')};
  padding-right: ${({ isDesktop, sideNavExpanded }) => (!isDesktop && !sideNavExpanded ? 0 : '12px')};
  justify-content:  ${({ isDesktop }) => (isDesktop ? 'space-between' : undefined)};
  background-color: ${Colors.White};
  top: 0;
  z-index: ${({ isDesktop }) => (isDesktop ? 986 : 982)};
  box-shadow: 0 4px 14px 0 rgba(166,179,194,0.3);
  ${({ sideNavExpanded, viewport }) => sideNavExpanded
  && `
    ${getWidthExpanded(viewport)};
    transition: width 400ms;
  `}
`;

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: ${({ isDesktop, viewport }) => (isDesktop ? 0 : `calc(${calculateOffsetTop(viewport)} + 32px)`)};
  width: 100%;
`;

const MenuChoiceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: ${({ isDesktop }) => (isDesktop ? 'auto' : '76px')};
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  box-shadow: ${({ isDesktop}) => isDesktop ? undefined : '0 4px 14px 0 rgba(166,179,194,0.3)'};
  padding: 0px 16px;
  margin-top: ${({ isDesktop }) => (isDesktop && '24px')};
  margin-bottom: ${({ isDesktop }) => getMargin(isDesktop)};
  cursor: pointer;
`;

const ContentWrapper = styled.div``;


const renderList = (
  content,
  setMenu,
  isDesktop,
  sideNavExpanded,
  sideNavAppHandler,
  expandedBottomAction,
) => {
  if (!isDesktop) {
    return (
      <ContentWrapper>
        {Object.keys(content).map((key, index) => {
          const menu = content[key];
          return (
            <MenuChoiceWrapper 
              onClick={() => {
                setMenu(key);
                sideNavAppHandler(false);
              }}
              key={`${menu.title}-${index}`}
            >
              <h3>{menu.title}</h3>
            </MenuChoiceWrapper>
          )
        })}
      </ContentWrapper>
    );
  }
  return (
    <ContentWrapper>
    </ContentWrapper>
  );
}

const SideNavBar = (props) => {
  const {
    content,
    setMenu,
    viewport,
    sideNavExpanded,
    expandedBottomAction,
    sideNavAppHandler,
  } = props;

  const isDesktop = viewport === 'desktop';

  useEffect(() => () => {
    if (sideNavAppHandler) {
      sideNavAppHandler(false);
    }
  }, []);
  
  return (
    <>
      <SidebarWrapper
        sideNavExpanded={sideNavExpanded}
        viewport={viewport}
        isDesktop={isDesktop}
      >
        <NavigationWrapper isDesktop={isDesktop} viewport={viewport}>
          {isDesktop && (
            <StyledMenuButton
              sideNavExpanded={sideNavExpanded}
              isDesktop={isDesktop}
            />
          )}
        </NavigationWrapper>
        {renderList(
          content,
          setMenu,
          isDesktop,
          !!sideNavExpanded,
          sideNavAppHandler,
          expandedBottomAction,
        )}
      </SidebarWrapper>
    </>
  );
};

SideNavBar.defaultProps = {
  sideNavExpanded: false,
};

export default withAppManager(SideNavBar);
