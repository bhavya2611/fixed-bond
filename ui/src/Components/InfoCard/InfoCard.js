import React from 'react';
import './infoCard.scss';

const InfoCard = ({
  value,
  changeInValue,
  changeInValuePercent,
  cardHeader,
  icon,
}) => {
  return (
    <div className="info-card">
      <h2>{value}</h2>
      {/* <div>
        <span>{changeInValue}</span>
        <span>{changeInValuePercent}</span>
      </div> */}
      <div className="svg-icon-info-card">{icon}</div>
      <h5>{cardHeader}</h5>
      {/* <div>
        <button>Graph</button>{' '}
        <i className="fa fa-line-chart" aria-hidden="true"></i>
      </div> */}
    </div>
  );
};

export default InfoCard;
