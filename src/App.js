import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import AppManager from './utilities/AppManager';
import Header from './components/Header';
import MenuItemCard from './components/MenuItemCard';
import { AddItemModal, RemoveItemModal } from './components/modals';
import Button from './components/buttons/Button';

const MenuWrapper = styled.div`
  margin-top: 78px;
`;

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [item, setItem] = useState();
  const menu = useSelector(({ menu }) => menu.results);
  const endOfMenuItems = useRef(null);

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

  const scrollToBottom = () => {
    endOfMenuItems.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AppManager>
      <div className='App'>
          {modalType === 'add' ?
            <AddItemModal open={modalOpen} handleModal={handleModal} scrollToBottom={scrollToBottom} />
            :
            <RemoveItemModal open={modalOpen} item={item} handleModal={handleModal} />
          }
        <Header 
          title='Menu'
        >
          <Button variant="primary" onClick={addItemModal}>Add menu item</Button>
        </Header>
        <MenuWrapper>
          {menu.map((item, index) => {
            return(
              <MenuItemCard key={item?.id || index} handleDelete={() => removeItemModal(item)} {...item} />
            )
          })}
          <div ref={endOfMenuItems} />
        </MenuWrapper>
      </div>
    </AppManager>
  );
};

export default App;
