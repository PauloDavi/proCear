/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import ReactInputMask from 'react-input-mask';

import { useField } from '@rocketseat/unform';

const InputMask = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue(value);
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);
  return (
    <>
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <span className="error">{error}</span>}
    </>
  );
};
export default InputMask;
