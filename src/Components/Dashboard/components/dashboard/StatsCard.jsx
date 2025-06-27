import React from 'react';
import Card from '../common/Card';
import './main.css'

const StatsCard = ({ title, value, icon }) => {
  return (
    <Card>
      <div className="stats-content">
        <div className="stats-icon">{icon}</div>
        <div className="stats-info">
          <h3 className="heading">{title}</h3>
          <p className="stats-value">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;