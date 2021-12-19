export const addItem = payload => {
  return {
    type: 'ADD_MENU_ITEM',
    payload
  }
}

export const removeItem = id => {
  return {
    type: 'REMOVE_MENU_ITEM',
    id
  }
}