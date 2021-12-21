import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '..';

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

test('TextInput - returns correct value', () => {
  render(<Input variant='text' />);
  userEvent.type(screen.getByRole('textbox'), 'This is a text input');
  expect(screen.getByRole('textbox')).toHaveValue('This is a text input');
});

test('TextAreaInput - returns correct value', () => {
  render(<Input variant='textarea' />);
  userEvent.type(screen.getByRole('textbox'), 'This is a textarea input');
  expect(screen.getByRole('textbox')).toHaveValue('This is a textarea input');
})