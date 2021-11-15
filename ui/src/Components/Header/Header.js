import React, { useState, useContext, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { withRouter } from 'react-router-dom';
import Identicon from 'react-identicons';
import MetaMaskOnboarding from '@metamask/onboarding';
import { Switch } from 'antd';
import { Web3Context } from '../../Context/Web3Context';
import { GlobalVariablesContext } from '../../Context/GlobalVariablesContext';
import { networkCheckFn, getVariables } from '../../Utils/utils';
import PopupComponent from '../Popup/PopupComponent';
import './header.scss';
import OwnerBtns from '../OwnerBtns/OwnerBtns';
// import OwnerBtnsVoting from '../OwnerBtnsVoting/OwnerBtnsVoting';

const Header = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupObj, setPopupObj] = useState({
    title: 'Success',
    message: '',
  });
  const [signInBtnText, setSignInBtnText] = useState('Connect Metamask');
  const [web3Instance] = useContext(Web3Context);
  const [globalVariables, setGlobalVariables] = useContext(
    GlobalVariablesContext
  );
  const [networkValue, setNetworkValue] = useState(true);
  const { ethereum } = window;

  const initialize = () => {
    const isMetaMaskInstalled = () => {
      return Boolean(ethereum && ethereum.isMetaMask);
    };
    const MetamaskClientCheck = () => {
      if (!isMetaMaskInstalled()) {
        setSignInBtnText('Install Metamask!');
      } else {
        setSignInBtnText('Connect Metamask');
      }
    };
    MetamaskClientCheck();
    getAccounts();
  };

  const onboarding = new MetaMaskOnboarding();

  const onClickInstall = () => {
    onboarding.startOnboarding();
  };

  window.addEventListener('DOMContentLoaded', initialize);

  const getAccounts = async () => {
    if (signInBtnText === 'Install Metamask') {
      onClickInstall();
    } else if (
      signInBtnText === 'Connect Metamask' ||
      signInBtnText === 'Please authenticate Metamask'
    ) {
      try {
        window.ethereum.enable().then(function (address) {
          if (address?.length > 0) {
            setSignInBtnText('Metamask Connected');
            props.setRetriggerFlow();
          } else {
            setSignInBtnText('Please authenticate Metamask');
          }
        });
      } catch (e) {
        console.log('Please connect to metamask');
      }
    }
  };

  const networkCheckCall = async () => {
    const check = await networkCheckFn(web3Instance, globalVariables.NETWORK);
    if (!check) {
      let message = '';
      switch (globalVariables.NETWORK) {
        case 42:
          message = 'Please connect to Kovan network on Metamask';
          break;
        default:
          message = 'Please connect to Kovan network on Metamask';
          break;
      }
      setShowPopup(true);
      setPopupObj({
        title: 'Error',
        message: (
          <div className='network-span'>
            <span className='network-span'>
              {message}
              <br />
            </span>
          </div>
        ),
      });
    } else {
      return await check;
    }
  };

  useEffect(() => {
    if (globalVariables.NETWORK === 42) {
      setNetworkValue(true);
    } else {
      setNetworkValue(false);
      networkCheckCall();
    }
    props.setRetriggerFlow();
    window.ethereum.on('accountsChanged', function (accounts) {
      setSignInBtnText('Connect Metamask');
    });
    window.ethereum.on('networkChanged', (networkId) => {
      // handle the new network
      networkId = Number(networkId);
      if (networkId === 42) {
        setNetworkValue(true);
        setGlobalVariables(getVariables(networkId));
      } else {
        networkCheckCall();
      }
      props.setRetriggerFlow();
      networkCheckFn(web3Instance, networkId).then((response) => {
        if (!response) {
          setSignInBtnText('Connect Metamask');
        }
      });
    });
  }, [window.ethereum.selectedAddress, JSON.stringify(globalVariables)]);

  return (
    <div className='header'>
      <div className='headerLogo headerItemLeft'>BONDS CONTRACT</div>
      <div
        className={`sidebarItem ${
          window.location.pathname === '/' ? 'selected' : ''
        } `}
        onClick={() => {
          props.history.push('/');
        }}
      >
        <i className='fa fa-university' aria-hidden='true'></i>
        <span className='sidebarItemText'>Info</span>
      </div>
      <div className='headerItemRight'>
        {signInBtnText === 'Metamask Connected' ? (
          <>
            <div
              className='networkSwitchDiv'
              data-multiline='true'
              data-tip={`Please connect your account to the website from Metamask.`}
            >
              <Switch
                checkedChildren='Kovan'
                unCheckedChildren='Connect'
                checked={networkValue}
                disabled={networkValue}
              />
            </div>
            {!networkValue ? <ReactTooltip /> : null}
            <div className='identiconImg '>
              <Identicon
                size={32}
                fg={'#ff7e45'}
                string={window.ethereum.selectedAddress}
              />
            </div>
          </>
        ) : (
          <button onClick={getAccounts} className='connectBtn'>
            <img
              alt='logo'
              className='metamaskLogo'
              src={
                'https://lh3.googleusercontent.com/AWXpXmPH-dW_tkkj1eKu4EYA_HUE76CvMyYHp_MhiWbvS5VpgJWsC1pDRpbocc3EmGwELvh4A2g=w128-h128-e365'
              }
            />
            <span className='metamask-text'>{signInBtnText}</span>
          </button>
        )}
      </div>
      <PopupComponent
        show={showPopup}
        title={popupObj.title}
        message={popupObj.message}
        closePopup={() => setShowPopup(false)}
      />
      {props.showOwnerButtons && <OwnerBtns />}
    </div>
  );
};

export default withRouter(Header);
