import './cardBody.scss';

const CardBody = ({
  userInfo = {},
  pendingRewards,
  rewardsInPool,
  bondInfo,
}) => {
  const maturityAmount = pendingRewards
    ? Number(userInfo.amountDeposited / 10e17) + Number(pendingRewards / 10e17)
    : 0;
  const maturityTimeStamp = userInfo.depositedOn
    ? Number(userInfo.depositedOn) + Number(userInfo.lockPeriod) * 2592000
    : 0;
  return (
    <div className='cardBody'>
      <p className='mb-10'>
        Deposit <b className='colorDogerBlue'>Token</b> and earn{' '}
        <b className='colorDogerBlue'>rewards</b>
      </p>
      <p className='mb-10'>
        Total Rewards In The Contract{' '}
        <b className='colorDogerBlue'>{rewardsInPool}</b>{' '}
      </p>
      <p className='mb-10'>
        Minimum Deposit for the Bond{' '}
        <b className='colorDogerBlue'>{bondInfo.minimumDeposit / 10e17 ?? 0}</b>{' '}
      </p>
      <div className='cardBodyContents'>
        <div>
          <div>Deposit Date</div>
          <div>
            {userInfo.depositedOn
              ? new Date(userInfo.depositedOn * 1000).toDateString()
              : '-'}
          </div>
        </div>
        <div>
          <div>Maturity Date</div>
          <div>
            {userInfo.depositedOn
              ? new Date(maturityTimeStamp * 1000).toDateString()
              : '-'}
          </div>
        </div>
        <div>
          <div>Deposit Amount</div>
          <div>
            {userInfo.amountDeposited ? userInfo.amountDeposited / 10e17 : 0}
          </div>
        </div>
        <div>
          <div>Rewards Accumulated</div>
          <div>{pendingRewards ?? 0 / 10e17}</div>
        </div>
        <div>
          <div>Maturity Amount</div>
          <div>{maturityAmount}</div>
        </div>
      </div>
    </div>
  );
};

export default CardBody;
