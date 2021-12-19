import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Header from '../Header';
import Colors from '../../theme/colors';

test('Header - renders correctly', () => {
  const tree = renderer.create(<Header title='Header' />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Header - renders props correctly', () => {
  const testRenderer = renderer.create(<Header title='Header'>Test</Header>);
  const tree = testRenderer.toJSON();
  const testInstance = testRenderer.root;
  expect(testInstance.props.children).toBe('Test');
  expect(tree).toHaveStyleRule(Colors.White);
});