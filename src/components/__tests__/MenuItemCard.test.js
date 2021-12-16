import React from 'react';
import renderer from 'react-test-renderer';
import MenuItemCard from '../MenuItemCard';

const testData = {
  id: 0,
  title: 'Bologna Sandwich',
  description: 'Fried bologna sandwich with cheese that\'s likely past it\'s expiration date.',
  price: 1,
  imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Bolgona_sandwich.jpg'
}

test('MenuItemCard - renders correctly', () => {
  const tree = renderer.create(<MenuItemCard {...testData} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('MenuItemCard - renders props correctly', () => {
  const testRenderer = renderer.create(<MenuItemCard {...testData} />);
  const testInstance = testRenderer.root;
  expect(testInstance.props.title).toBe('Bologna Sandwich');
  expect(testInstance.props.imgUrl).toBe('https://upload.wikimedia.org/wikipedia/commons/2/20/Bolgona_sandwich.jpg');
  expect(testInstance.props.price).toBe(1);
});