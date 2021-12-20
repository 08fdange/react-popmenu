export const addItem = payload => {
  return {
    type: 'ADD_MENU_ITEM',
    payload
  }
};

export const removeItem = id => {
  return {
    type: 'REMOVE_MENU_ITEM',
    id
  }
};

export const editItem = (id, payload) => {
  return {
    type: 'EDIT_MENU_ITEM',
    id,
    payload
  }
};