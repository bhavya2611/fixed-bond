import React from 'react';
import './cardheader.scss';

const CardHeader = ({ bondInfo }) => {
  return (
    <div className='cardHeader'>
      <div className='cardHeaderContentLeft'>
        <h6 style={{ textAlign: 'end' }}>ROI (1M)</h6>
        <p>{bondInfo.interestOneMonth ?? 0}%</p>
      </div>
      <div className='cardHeaderContentLeft'>
        <h6 style={{ textAlign: 'end' }}>ROI (3M)</h6>
        <p>{bondInfo.interestThreeMonth ?? 0}%</p>
      </div>
      <div className='cardHeaderContentRightItems'>
        <h6 style={{ textAlign: 'end' }}>ROI (6M)</h6>
        <p>{bondInfo.interestSixMonth ?? 0}%</p>
      </div>
      <div className='cardHeaderContentRightItems'>
        <h6 style={{ textAlign: 'end' }}>ROI (12M)</h6>
        <p>{bondInfo.interestTwelveMonth ?? 0}%</p>
      </div>
    </div>
  );
};

export default CardHeader;
