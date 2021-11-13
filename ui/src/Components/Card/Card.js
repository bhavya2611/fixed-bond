import React, { useState, useContext, useEffect } from 'react';
import CardBody from './CardBody/CardBody';
import CardHeader from './CardHeader/CardHeader';
import Loader from '../Loader/loader';
import CustomButton from '../CustomButton/CustomButton';
import AmountInputModal from '../AmountInputModal/AmountInputModal';
import PopupComponent from '../Popup/PopupComponent';
import { Web3Context } from '../../Context/Web3Context';
import {
  withdraw,
  depositToken,
  getUserInfo,
  getBondInfo,
  emergencyWithdraw,
  getPendingRewards,
  getRewardsBalance,
} from '../../Utils/SmartContractUtils/BondsContractFunctions';
import { GlobalVariablesContext } from '../../Context/GlobalVariablesContext';
import './card.scss';

const Card = (props) => {
  const [rewards, setRewards] = useState({});
  const [rewardsInPool, setRewardsInPool] = useState(0);
  const [web3Instance] = useContext(Web3Context);
  const [globalVariables] = useContext(GlobalVariablesContext);
  const [isActive, setIsActive] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [flow, setFlow] = useState('');
  const [yourStake, setYourStake] = useState(0);
  const [stackReward, setStackReward] = useState(0);
  const [lpTokenUserBalance, setLpTokenUserBalance] = useState(0);
  const [totalStakedVal, setTotalStakedVal] = useState(0);
  const [apyValue, setApyValue] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupObj, setPopupObj] = useState({
    title: 'Success',
    message: '',
  });

  const onClaim = async () => {
    setShowLoader(true);
    const claimResponse = await withdraw(web3Instance, '0', globalVariables);
    if (claimResponse) {
      await getUserInfoFn();
      setIsActive(false);
      setShowPopup(true);
      setPopupObj({
        title: 'Success',
        message: <h6>Reward successfully claimed</h6>,
      });
    } else {
      setIsActive(false);
      setShowPopup(true);
      setPopupObj({
        title: 'Error',
        message: <h6>Unable to Claim Rewards. Please try again.</h6>,
      });
    }
    setShowLoader(false);
  };

  const onExit = async () => {
    setShowLoader(true);
    const withdrawResponse = await withdraw(
      web3Instance,
      Math.trunc(yourStake).toString(),
      globalVariables
    );
    if (withdrawResponse) {
      await getUserInfoFn();
      setIsActive(false);
      setShowPopup(true);
      setPopupObj({
        title: 'Success',
        message: <h6>Exited successfully</h6>,
      });
    } else {
      setIsActive(false);
      setShowPopup(true);
      setPopupObj({
        title: 'Error',
        message: <h6>Unable to Exit. Please try again.</h6>,
      });
    }
    setShowLoader(false);
  };

  const onDeposit = async (amount) => {
    setShowLoader(true);
    const depositResponse = await depositToken(
      web3Instance,
      amount,
      globalVariables
    );
    if (depositResponse) {
      await getUserInfoFn();
      setIsActive(false);
      setShowPopup(true);
      setPopupObj({
        title: 'Success',
        message: <h6>Deposited {amount} successfully</h6>,
      });
    } else {
      setIsActive(false);
      setShowPopup(true);
      setPopupObj({
        title: 'Error',
        message: <h6>Unable to Deposit {amount}. Please try again.</h6>,
      });
    }
    setShowLoader(false);
  };

  const onWithdraw = async (amount) => {
    setShowLoader(true);
    const withdrawResponse = await withdraw(
      web3Instance,
      amount,
      globalVariables
    );
    if (withdrawResponse) {
      await getUserInfoFn();
      setIsActive(false);
      setShowPopup(true);
      setPopupObj({
        title: 'Success',
        message: <h6>Withdrawn {amount} successfully</h6>,
      });
    } else {
      setIsActive(false);
      setShowPopup(true);
      setPopupObj({
        title: 'Error',
        message: <h6>Unable to Withdraw {amount}. Please try again.</h6>,
      });
    }
    setShowLoader(false);
  };

  const onClickDeposit = () => {
    setIsActive(true);
    setFlow('Deposit');
  };

  const onClickWithdraw = () => {
    setIsActive(true);
    setFlow('Withdraw');
  };

  const onClickFn = (amount) => {
    flow === 'Deposit' ? onDeposit(amount) : onWithdraw(amount);
  };

  const getUserInfoFn = async () => {
    setShowLoader(true);
    setIsActive(false);
    setShowPopup(false);
    setPopupObj({
      title: '',
      message: '',
    });
    try {
      if (Object.keys(globalVariables).length > 0) {
        const rewardsInfo = await getRewardsBalance(
          web3Instance,
          globalVariables
        );
        if (rewardsInfo && !isNaN(Number(rewardsInfo))) {
          setRewardsInPool(rewardsInfo / 1000000000000000000);
        }
        const rewardValues = await getPendingRewards(
          web3Instance,
          globalVariables
        );
        setRewards(rewardValues);
        const info = await getUserInfo(web3Instance, globalVariables);
        if (info && !isNaN(Number(info.amount))) {
          setYourStake(info.amount / 1000000000000000000);
        }
        const apyResponse = 0;
        if (!isNaN(Number(apyResponse))) {
          setApyValue(apyResponse.toFixed(2));
        }
      }
    } catch (e) {
      console.log(e);
    }
    setShowLoader(false);
  };

  useEffect(() => {
    if (web3Instance && Object.keys(globalVariables).length > 0) {
      getUserInfoFn();
    }
  }, [props.retriggerFlow]);

  return (
    <div className='custommCard col-lg-4 col-md-6 col-sm-12'>
      <div className='subCardHeader'>
        <CardHeader staked={Number(totalStakedVal)} apy={apyValue} />
      </div>
      <div className='subCardBody'>
        <CardBody
          rewardsInPool={rewardsInPool}
          userStake={yourStake}
          NETWORK={globalVariables.NETWORK}
          stackReward={stackReward}
        />
      </div>
      <div className='btnsWrapper'>
        <div className='customBtnParent'>
          <div className='mr-10 mb-10'>
            <CustomButton
              onCLick={onClickDeposit}
              btnClass='primary1'
              btnName='Deposit'
              btnText={`Token`}
            />
          </div>
          <div className='mb-10'>
            <CustomButton
              onCLick={onClaim}
              btnClass='primary1'
              btnName='Claim'
              btnText='Rewards'
            />
          </div>
        </div>
        <div className='customBtnParent'>
          <div className='mr-10 mb-10'>
            <CustomButton
              onCLick={onClickWithdraw}
              btnClass='primary1'
              btnName='Withdraw'
              btnText={`Token`}
            />
          </div>
          <div className='mb-10'>
            <CustomButton
              onCLick={onExit}
              btnClass='primary1'
              btnName='Exit'
              btnText='Emergency Withdraw'
            />
          </div>
        </div>
      </div>
      <AmountInputModal
        isActive={isActive}
        flow={flow}
        closeModal={() => setIsActive(false)}
        onClick={onClickFn}
        rewards={rewards}
        lpTokenUserBalance={lpTokenUserBalance}
        yourStake={yourStake}
      />
      <PopupComponent
        show={showPopup}
        title={popupObj.title}
        message={popupObj.message}
        closePopup={() => setShowPopup(false)}
      />
      <Loader show={showLoader} />
    </div>
  );
};

export default Card;
