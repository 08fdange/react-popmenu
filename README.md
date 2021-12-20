# React Popmenu

### Deployment link: https://react-popmenu.vercel.app/

## An example of a simple menu application for Popmenu 
Notes:
- All styling is built with styled-components using custom CSS. There's no styling libraries like Bootstrap or Material UI used.
- I've used a couple external libraries/packages for certain features including enquire.js, react-hook-form, react-redux and uuidv4.
- Testing libraries consist of react-test-renderer, jest-styled-components and redux-mock-store.

## Level 1 - Basics
#### Desktop:

![Menu-Basics-desktop](https://user-images.githubusercontent.com/60116865/146436705-96030b48-ade3-4612-b7da-1f7e1a847503.gif)

#### Mobile:

![Menu-Basics-mobile](https://user-images.githubusercontent.com/60116865/146436962-3828f883-7751-4dd5-80bf-28a525442009.gif)

### Additions:
- MenuItemCard component and it's implementation to display dummy data supplied by javascript object in menu.js
- The implementation is currently located directly in the App component via a map function mapping through the menu.js data, a Menu component may be added in the future to extract it's implementation for scaling purposes
- It's simplicity allows it to display/scale properly on both mobile and desktop viewports, future iterations may include a viewport manager to support more complexity in the layout of the MenuItemCard component among other future components

## Level 2 - Add/Remove
#### Desktop:

![Menu-AddRemove-desktop](https://user-images.githubusercontent.com/60116865/146685764-1ef99050-354d-4ddb-891e-c59298badf5d.gif)

#### Mobile:

![Menu-AddRemove-mobile](https://user-images.githubusercontent.com/60116865/146685777-948e687b-a4e1-448e-a8f6-e47bcf95ae7b.gif)

### Components added:
- Button components with hover and focus states added
- Header component that sticks to the top of the page to always allow access to button to add a menu item
- BaseModal component used to build two modals for adding or deleting menu items
- Basic unit tests provided for all components although, the tests can be extended further 

### Features added:
- Viewport Manager built with enquire.js to handle media queries within components. It's used to scale MenuItemCard and Modal components. It could also be used in a parent component to pass down the viewport to children 
- Animation Wrapper used with the modals
- Redux with actions/reducers and a redux store that's stored in localStorage allowing you to save menu items and have them persist even when refreshing the page
- Ability to add items via add menu item form in a modal with validation and error messages 
- Ability to remove an item with a modal that pops up for confirmation

### Misc:
- Theme folder with colors (if time weren't limited I would also define a constants object for spacing/padding variables for consistency throughout app)

## Level 3 - Edit
#### Desktop:

![Menu-Edit-desktop](https://user-images.githubusercontent.com/60116865/146711510-7fc1b335-f1cf-4c46-967f-5d40b39c6b06.gif)

#### Mobile: 

![Menu-Edit-mobile](https://user-images.githubusercontent.com/60116865/146711533-a6b67b1a-a7a3-47fc-8b19-9acf0a917f17.gif)

### Additions:
- Extracted Inputs from AddItemModal, with Input orchestrator and two variants: TextInput and TextAreaInput
- Added an edit button for each item, state values for editing and editing image url editing
- Added inputs that are based on ternary operators that render either text or inputs based on isEdit state
- Added image overlay for menu item pictures, with "Click to edit" text and onClick that renders another input to edit the image url based on the editImg state
