import React from 'react';
import './main.css'

const Button = ({ variant = 'primary', children, onClick, className = '' }) => {
  const buttonClass = `button button-${variant} ${className}`;
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;