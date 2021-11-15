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
  const [bondInfo, setBondInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [lpTokenUserBalance, setLpTokenUserBalance] = useState(0);
  const [totalStakedVal, setTotalStakedVal] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupObj, setPopupObj] = useState({
    title: 'Success',
    message: '',
  });

  const onExit = async () => {
    setShowLoader(true);
    const withdrawResponse = await emergencyWithdraw(
      web3Instance,
      globalVariables
    );
    if (withdrawResponse && withdrawResponse.status) {
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

  const onDeposit = async (amount, time) => {
    setShowLoader(true);
    const depositResponse = await depositToken(
      web3Instance,
      globalVariables,
      amount,
      time
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

  const onWithdraw = async () => {
    setShowLoader(true);
    const withdrawResponse = await withdraw(web3Instance, globalVariables);
    if (withdrawResponse) {
      await getUserInfoFn();
      setIsActive(false);
      setShowPopup(true);
      setPopupObj({
        title: 'Success',
        message: <h6>Withdrawn successfully</h6>,
      });
    } else {
      setIsActive(false);
      setShowPopup(true);
      setPopupObj({
        title: 'Error',
        message: <h6>Unable to Withdraw. Please try again.</h6>,
      });
    }
    setShowLoader(false);
  };

  const onClickDeposit = () => {
    setIsActive(true);
    setFlow('Deposit');
  };

  const onClickFn = (amount, time) => {
    flow === 'Deposit' ? onDeposit(amount, time) : onWithdraw();
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
        const userRewardValue = await getPendingRewards(
          web3Instance,
          globalVariables
        );
        setRewards(userRewardValue);
        const info = await getUserInfo(web3Instance, globalVariables);
        if (info && !isNaN(Number(info.amount))) {
          setYourStake(info.amount / 1000000000000000000);
        }
        const bondInfoResponse = await getBondInfo(
          web3Instance,
          globalVariables
        );
        if (bondInfoResponse) {
          setBondInfo(bondInfoResponse);
        }
        const userInfoResponse = await getUserInfo(
          web3Instance,
          globalVariables
        );
        if (userInfoResponse) {
          setUserInfo(userInfoResponse);
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
        <CardHeader staked={Number(totalStakedVal)} bondInfo={bondInfo} />
      </div>
      <div className='subCardBody'>
        <CardBody
          bondInfo={bondInfo}
          rewards={rewards}
          rewardsInPool={rewardsInPool}
          userInfo={userInfo}
          NETWORK={globalVariables.NETWORK}
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
              onCLick={onWithdraw}
              btnClass='primary1'
              btnName='Withdraw'
              btnText={`Token`}
            />
          </div>
        </div>
        <div className='customBtnParent'>
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
