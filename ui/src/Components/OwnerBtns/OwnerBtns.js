import React, { useState, useContext } from 'react';
import { Web3Context } from '../../Context/Web3Context';
import {
  addRewards,
  getBondInfo,
  setupBond,
} from '../../Utils/SmartContractUtils/BondsContractFunctions';
import { GlobalVariablesContext } from '../../Context/GlobalVariablesContext';
import PopupComponent from '../Popup/PopupComponent';
import SetupBondModal from '../AmountInputModal/SetupBondModal';
import AddRewardsModal from '../AmountInputModal/AddRewardsModal';
import Loader from '../Loader/loader';
import './ownerBtns.scss';

const OwnerBtns = () => {
  const [isActive, setIsActive] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupObj, setPopupObj] = useState({
    title: 'Success',
    message: '',
  });
  const [web3Instance] = useContext(Web3Context);
  const [globalVariables] = useContext(GlobalVariablesContext);

  const setupBondFn = async (bondInfoObject) => {
    if (isActive) {
      setShowLoader(true);
      const response = await setupBond(
        web3Instance,
        globalVariables,
        bondInfoObject
      );
      setIsActive(false);
      setShowPopup(true);
      if (response && response.status) {
        setPopupObj({
          title: 'Success',
          message: <h6>Bond setup done successfully</h6>,
        });
      } else {
        setPopupObj({
          title: 'Error',
          message: <h6>Unable to setup bond. Please try again.</h6>,
        });
      }
      setShowLoader(false);
    } else setIsActive(true);
  };

  const addRewardsFn = async (amount) => {
    if (showRewardsModal) {
      setShowLoader(true);
      const response = await addRewards(web3Instance, globalVariables, amount);
      setShowRewardsModal(false);
      setShowPopup(true);
      if (response) {
        setPopupObj({
          title: 'Success',
          message: <h6>Reward Tokens successfully added</h6>,
        });
      } else {
        setPopupObj({
          title: 'Error',
          message: <h6>Unable to add reward tokens. Please try again.</h6>,
        });
      }
      setShowLoader(false);
    } else setShowRewardsModal(true);
  };

  const getBondInformation = async () => {
    setShowLoader(true);
    const response = await getBondInfo(web3Instance, globalVariables);
    setShowPopup(true);
    if (response) {
      setPopupObj({
        title: 'Success',
        message: <h6>You can view the pool info in the console</h6>,
      });
    } else {
      setPopupObj({
        title: 'Error',
        message: <h6>Unable to get pool info. Please try again.</h6>,
      });
    }
    setShowLoader(false);
  };

  return (
    <div>
      {window?.ethereum?.selectedAddress &&
      window.ethereum.selectedAddress?.toString().toLowerCase() ===
        globalVariables.OWNER_ADDRESS?.toString().toLowerCase() ? (
        <div className='btns-div'>
          <button onClick={setupBondFn} className='connectBtn'>
            Setup Bond
          </button>
          <button onClick={addRewardsFn} className='connectBtn'>
            Add Rewards
          </button>
          <button onClick={getBondInformation} className='connectBtn'>
            Bond Info
          </button>
        </div>
      ) : null}
      <PopupComponent
        show={showPopup}
        title={popupObj.title}
        message={popupObj.message}
        closePopup={() => setShowPopup(false)}
      />
      <SetupBondModal
        onClick={setupBondFn}
        isActive={isActive}
        closeModal={() => setIsActive(false)}
      />
      <AddRewardsModal
        onClick={addRewards}
        isActive={showRewardsModal}
        closeModal={() => setShowRewardsModal(false)}
      />
      <Loader show={showLoader} />
    </div>
  );
};

export default OwnerBtns;
