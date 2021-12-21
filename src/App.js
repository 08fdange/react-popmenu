import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { withAppManager } from './utilities';
import NavBar from './components/navigation/NavBar';
import SideNavBar from './components/navigation/SideNavBar';
import MenuItemCard from './components/MenuItemCard';
import { AddItemModal, RemoveItemModal } from './components/modals';
import Button from './components/buttons/Button';

const ButtonWrapper = styled.div`
  display: flex;
`;

const Menu = styled.div`
  padding-top: ${({ isMobile }) => isMobile ? '84px' : '94px'};
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

  return (
    <div className='App'>
        {modalType === 'add' ?
          <AddItemModal 
            open={modalOpen} 
            handleModal={handleModal} 
            scrollToBottom={scrollToBottom} 
            menu={menuKey}
          />
          :
          <RemoveItemModal 
            open={modalOpen} 
            item={item} 
            handleModal={handleModal} 
            menu={menuKey}
          />
        }
      <NavBar offsetLeft={80}>
        <h1>Menu</h1>
        <ButtonWrapper>
          <Button variant="primary" onClick={addItemModal}>Add menu item</Button>
        </ButtonWrapper>
      </NavBar>
      <SideNavBar setMenu={setMenu} content={menuStore} />
      <div ref={startOfMenuItems} />
      <Menu isMobile={isMobile}>
        {menu.items.map((item, index) => {
          return(
            <MenuItemCard key={item?.id || index} handleDelete={() => removeItemModal(item)} {...item} />
          )
        })}
      </Menu>
      <div ref={endOfMenuItems} />
    </div>
  );
};

export default withAppManager(App);
