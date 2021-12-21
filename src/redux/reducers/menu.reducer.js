import { Menu, Menu2, Menu3 } from '../../data';

const initialState = {
  menu1: {
    title: 'Menu 1',
    items: Menu
  }, 
  menu2: {
    title: 'Menu 2',
    items: Menu2,
  }, 
  menu3: {
    title: 'Menu 3',
    items: Menu3,
  }
};

const menuReducer = (state = initialState, action) => {
  if (!action.type) return state;

  switch(action?.type) {
    case "ADD_MENU_ITEM":
      return {
        ...state,
        [action.menu]: {
          ...state[action.menu],
          items: [...state[action.menu].items, action.payload]
        }
      }
    case "REMOVE_MENU_ITEM":
      return {
        ...state,
        [action.menu]: {
          ...state[action.menu],
          items: [...state[action.menu].items.filter((item) => action.id !== item.id)]
        }
      }
    case "EDIT_MENU_ITEM":
      return {
        ...state,
        [action.menu]: {
          ...state[action.menu],
          items: [...state[action.menu].map((item) => {
            if (item.id !== action.id) return item;
            return {...item, ...action.payload}
          })]
        }
      }
    default:
      return state; 
  }
}

export default menuReducer;