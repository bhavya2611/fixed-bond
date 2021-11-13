import React, { useState } from 'react';
import Card from '../Components/Card/Card';
import Header from '../Components/Header/Header';

const Home = () => {
  const [retriggerFlow, setRetriggerFlow] = useState(false);

  return (
    <div className='home-container'>
      <div style={{ width: '100%' }}>
        <Header
          setRetriggerFlow={() => setRetriggerFlow(!retriggerFlow)}
          showStakingButtons={true}
        />
        <div className='pageLayout'>
          <div className='mainCard'>
            <Card retriggerFlow={retriggerFlow} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
