import React from 'react';

const Button = ({ children, onClick, ...allyProps }) => (
  <button onClick={onClick} {...allyProps}>
    {children}
  </button>
);

export default Button;
