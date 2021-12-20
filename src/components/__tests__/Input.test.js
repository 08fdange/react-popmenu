import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Input } from '../inputs';
import Colors from '../../theme/colors';

test('Input - renders correctly', () => {
  const tree = renderer.create(<Input />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextInput - renders TextInput', () => {
  const testRenderer = renderer.create(<Input variant='text' />);
  const testInstance = testRenderer.root;
  expect(testInstance.props.variant).toBe('text');
});

test('TextAreaInput - renders correctly', () => {
  const testRenderer = renderer.create(<Input variant='textarea' />);
  const testInstance = testRenderer.root;
  expect(testInstance.props.variant).toBe('textarea');
});