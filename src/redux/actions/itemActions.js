export const addItem = (payload, menu) => {
  return {
    type: 'ADD_MENU_ITEM',
    menu,
    payload
  }
};

export const removeItem = (id, menu) => {
  return {
    type: 'REMOVE_MENU_ITEM',
    menu,
    id
  }
};

export const editItem = (id, payload, menu) => {
  return {
    type: 'EDIT_MENU_ITEM',
    menu,
    id,
    payload
  }
};

export const addMenu = (payload) => {
  return {
    type: 'ADD_MENU',
    payload
  }
};