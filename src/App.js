import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { withAppManager } from './utilities';
import NavBar from './components/navigation/NavBar';
import SideNavBar from './components/navigation/SideNavBar';
import MenuItemCard from './components/cards/MenuItemCard';
import { AddItemModal, RemoveItemModal, AddMenuModal } from './components/modals';
import Button from './components/buttons/Button';

const ButtonWrapper = styled.div`
  display: flex;
`;

const Menu = styled.div`
  padding-top: ${({ isMobile }) => isMobile ? '84px' : '94px'};
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: ${({ isMobile }) => isMobile ? '24px' : '32px'};
`;

const EmptyMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 32px;
`;

const App = ({ viewport }) => {
  const [menuKey, setMenuKey] = useState('menu1');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [item, setItem] = useState();
  const menuStore = useSelector(({ menu }) => menu); 
  const menu = useSelector(({ menu }) => menu[menuKey]);
  const startOfMenuItems = useRef(null);
  const endOfMenuItems = useRef(null);
  const isMobile = viewport === 'mobile' || viewport === 'mobileSmall';

  const handleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const addMenuModal = () => {
    setModalType('addMenu');
    handleModal();
  }

  const addItemModal = () => {
    setModalType('add');
    handleModal();
  };

  const removeItemModal = (item) => {
    setModalType('remove');
    setItem(item)
    handleModal();
  };

  const setMenu = (key) => {
    setMenuKey(key);
    scrollToTop();
  };

  const scrollToTop = () => {
    startOfMenuItems.current.scrollIntoView();
  }

  const scrollToBottom = () => {
    endOfMenuItems.current.scrollIntoView({ behavior: 'smooth' });
  };

  const renderModal = () => {
    switch(modalType) {
      case 'addMenu':
        return (
          <AddMenuModal
            open={modalOpen}
            handleModal={handleModal}
            menu={menuKey}
          />
        );
      case 'remove':
        return (
          <RemoveItemModal 
            open={modalOpen} 
            item={item} 
            handleModal={handleModal} 
            menu={menuKey}
          />
        );
      case 'add':
      default:
        return (
          <AddItemModal 
            open={modalOpen} 
            handleModal={handleModal} 
            scrollToBottom={scrollToBottom} 
            menu={menuKey}
          />
        );
    }
  };

  return (
    <div className='App'>
        { renderModal() }
      <NavBar offsetLeft={80}>
        <Title isMobile={isMobile}>{menu?.title}</Title>
        <ButtonWrapper>
          <Button variant="primary" onClick={addItemModal}>Add menu item</Button>
        </ButtonWrapper>
      </NavBar>
      <SideNavBar 
        menuKey={menuKey} 
        setMenu={setMenu} 
        content={menuStore} 
        addMenuModal={addMenuModal}
      />
      <div className="top-of-menu" ref={startOfMenuItems} />
      <Menu isMobile={isMobile}>
        {(!!menu && menu?.items?.length > 0) ? menu?.items.map((item, index) => {
          return(
            <MenuItemCard 
              key={item?.id || index} 
              handleDelete={() => removeItemModal(item)}
              menu={menuKey}
              {...item} 
            />
          )
        }) :
          <EmptyMenu>
            <h2>There's no items on this menu yet.</h2>
          </EmptyMenu>
        }
      </Menu>
      <div className="bottom-of-menu" ref={endOfMenuItems} />
    </div>
  );
};

export default withAppManager(App);
