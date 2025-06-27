import React from 'react';
import Card from '../common/Card';
import './main.css'

const ChartCard = ({ title, children }) => {
  return (
    <Card>
      <h3 className="heading">{title}</h3>
      <div className="chart-container">
        {children}
      </div>
    </Card>
  );
};

export default ChartCard;