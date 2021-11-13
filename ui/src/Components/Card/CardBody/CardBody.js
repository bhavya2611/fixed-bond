import './cardBody.scss';

const CardBody = ({ userStake, stackReward, rewardsInPool }) => {
  return (
    <div className='cardBody'>
      <p className='mb-10'>
        Deposit <b className='colorDogerBlue'>Token</b> and earn{' '}
        <b className='colorDogerBlue'>rewards</b>
      </p>
      <p className='mb-10'>
        Total Rewards In The Pool{' '}
        <b className='colorDogerBlue'>{rewardsInPool}</b>{' '}
      </p>
      <div className='cardBodyContents'>
        <div>
          <div>Deposit Date</div>
          <div>1 March 2021 10.30 UTC</div>
        </div>
        <div>
          <div>Maturity Date</div>
          <div>1 March 2021 10.30 UTC</div>
        </div>
        <div>
          <div>Deposit Amount</div>
          <div>{userStake}</div>
        </div>
        <div>
          <div>Rewards Accumulated</div>
          <div>{stackReward}</div>
        </div>
        <div>
          <div>Maturity Amount</div>
          <div>{stackReward}</div>
        </div>
      </div>
    </div>
  );
};

export default CardBody;
