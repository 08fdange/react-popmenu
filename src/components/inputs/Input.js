import React from 'react';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';

const Input = React.forwardRef((props, ref) => {
  const { variant, ...rest } = props;

  switch(variant) {
    case 'textarea':
      return <TextAreaInput ref={ref} {...rest} />;
    case 'text':
    default:
      return <TextInput ref={ref} {...rest} />;
  };
});

export default Input;