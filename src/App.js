import React from 'react';
import styled from 'styled-components';
import MenuItemCard from './components/MenuItemCard';
import { Menu } from './data/menu';

const Header = styled.h1`
  text-align: center;
`;

const App = () => {
  return (
    <div className="App">
      <Header>Menu</Header>
      {Menu.map((item, index) => <MenuItemCard key={item?.id || index} {...item} />)}
    </div>
  );
}

export default App;
