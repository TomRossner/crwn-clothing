import React from 'react';

const Input = (props) => {
    const {type, name, id, placeholder, title, ...rest} = props;
  return (
    <>
    <input
        type={type}
        placeholder={placeholder}
        title={title}
        name={name} id={id}
        {...rest}
    />
    </>
  )
}

export default Input;