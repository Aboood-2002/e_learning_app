import React from 'react';
import './main.css'
const Badge = ({ type, children }) => {
  const badgeClass = `badge badge-${type}`;
  return <span className={badgeClass}>{children}</span>;
};

export default Badge;