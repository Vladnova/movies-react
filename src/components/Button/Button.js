import React from 'react';

const Button = ({ children, onClick, className, ...allyProps }) => (
  <button className={className} onClick={onClick} {...allyProps}>
    {children}
  </button>
);

export default Button;
