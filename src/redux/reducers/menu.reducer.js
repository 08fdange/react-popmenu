import { Menu } from '../../data/menu';

const initialState = { results: Menu };

const menuReducer = (state = initialState, action) => {
  if (!action.type) return state;

  switch(action?.type) {
    case "ADD_MENU_ITEM":
      return {
        ...state,
        results: [
          ...state.results,
          action.payload
        ]
      }
    case "REMOVE_MENU_ITEM":
      return {
        ...state,
        results: [...state.results.filter((item) => action.id !== item.id)]
      }
    case "EDIT_MENU_ITEM":
      return {
        ...state,
        results: [...state.results.map((item) => {
          if (item.id !== action.id) return item;
          return {...item, ...action.payload}
        })]
      }
    default:
      return state; 
  }
}

export default menuReducer;