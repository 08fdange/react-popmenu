import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import MenuItemCard from '../MenuItemCard';

const mockStore = configureStore([]);
const initialState = {};

const testData = {
  id: 0,
  title: 'Bologna Sandwich',
  description: 'Fried bologna sandwich with cheese that\'s likely past it\'s expiration date.',
  price: 1,
  imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Bolgona_sandwich.jpg'
};

jest.mock('enquire.js', () => {
  return {
    matchMedia: jest.fn().mockImplementation(() => undefined)
  }
});

jest.mock('react-redux', () => {
  const ReactRedux = jest.requireActual('react-redux');
  return {
    ...ReactRedux,
    useSelector: jest.fn().mockImplementation(() => {
      return initialState;
    }),
    useDispatch: jest.fn().mockImplementation(() => {
      return initialState;
    })
  }
});

describe('MenuItemCard', () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore({
      menu: {
        results: []
      }
    })

    component = renderer.create(
      <Provider store={store}>
        <MenuItemCard {...testData} />
      </Provider>
    );
  });
  it('MenuItemCard - renders correctly', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('MenuItemCard - renders props correctly', () => {
    const testInstance = component.root.children[0];
    expect(testInstance.props.title).toBe('Bologna Sandwich');
    expect(testInstance.props.imgUrl).toBe('https://upload.wikimedia.org/wikipedia/commons/2/20/Bolgona_sandwich.jpg');
    expect(testInstance.props.price).toBe(1);
  });
});