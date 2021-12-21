import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Button from '../Button';
import Colors from '../../../theme/colors';

test('Button - renders correctly', () => {
  const tree = renderer.create(<Button>Test</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button - renders default props correctly', () => {
  const testRenderer = renderer.create(<Button>Test</Button>);
  const testInstance = testRenderer.root;
  expect(testInstance.props.children).toBe('Test');
  expect(testInstance.props.variant).toBe(undefined);
});

test('PrimaryButton - renders properly', () => {
  const testRenderer = renderer.create(<Button variant='primary'>Primary</Button>);
  const tree = testRenderer.toJSON();
  const testInstance = testRenderer.root;
  expect(testInstance.props.variant).toBe('primary');
  expect(tree).toHaveStyleRule('background-color', Colors.Purple);
});

test('SecondaryButton - renders properly', () => {
  const testRenderer = renderer.create(<Button variant='secondary'>Secondary</Button>);
  const tree = testRenderer.toJSON();
  const testInstance = testRenderer.root;
  expect(testInstance.props.variant).toBe('secondary');
  expect(tree).toHaveStyleRule('background-color', Colors.White);
});

test('TransparentButton - renders properly', () => {
  const testRenderer = renderer.create(<Button variant='transparent'>Transparent</Button>);
  const tree = testRenderer.toJSON();
  const testInstance = testRenderer.root;
  expect(testInstance.props.variant).toBe('transparent');
  expect(tree).toHaveStyleRule('background-color', 'transparent')
});