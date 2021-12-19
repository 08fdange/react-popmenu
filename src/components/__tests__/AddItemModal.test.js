import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import AddItemModal from '../modals/AddItemModal';

const mockStore = configureStore([]);
const initialState = {};
const closeModalFn = () => undefined;

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

describe('AddItemModal', () => {
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
        <AddItemModal handleModal={closeModalFn} />
      </Provider>
    );
  });

  it('AddItemModal - renders correctly', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});