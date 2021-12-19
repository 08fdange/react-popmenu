import React from 'react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import TransparentButton from './TransparentButton';

const Button = (props) => {
  const { variant, ...rest } = props;

  switch(variant) {
    case 'transparent':
      return <TransparentButton {...rest} />;
    case 'secondary':
      return <SecondaryButton {...rest} />;
    case 'primary':
    default:
      return <PrimaryButton {...rest} />;
  };
};

export default Button;