import React, { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import '../../Styles/modal.scss';
import './amountInputModal.scss';

const AmountInputModal = (props) => {
  const showClass = props.isActive ? 'show' : '';
  const [amount, setAmount] = useState(0);

  const onClick = () => {
    if (Number(amount) > 0) {
      props.onClick(amount);
    }
  };

  const setAmountValue = (value) => {
    if (Number(value) <= 0 || isNaN(Number(value))) {
      setAmount(0);
      return;
    } else {
      setAmount(Math.trunc(value));
    }
  };

  const onMaxClick = () => {
    setAmount(
      props.flow === 'Deposit'
        ? parseInt(props.lpTokenUserBalance.toFixed(4))
        : props.yourStake
    );
  };

  return (
    <div
      className={`modal somodal1 fade ${showClass}`}
      style={{
        display: props.isActive ? 'block' : 'none',
        overflowY: props.isActive ? 'auto' : 'hidden',
      }}
    >
      <div
        className={`modal-dialog somodal1__dialog ${
          props.isMaximize ? 'maximize-modal' : ''
        }`}
      >
        <div className="somodal1__content">
          <div className="somodal1__header">
            <h5 className="modal-title somodal1__title">
              <span>{props.flow}</span>
            </h5>
            <button
              type="button"
              className="somodal1__close"
              aria-label="Close"
              onClick={props.closeModal}
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
          <div className="somodal1__body">
            <form action="">
              <div className="form-group">
                <div className="balanceInfoDiv">
                  <label className="somodal1__label">
                    Amount <span className="colorBitterSweet">*</span>
                  </label>
                  <label>
                    Your {props.flow === 'Deposit' ? 'Wallet' : 'Pool'} STACK
                    Balance:{' '}
                    <span className="colorDogerBlue">
                      {props.flow === 'Deposit'
                        ? props.lpTokenUserBalance.toFixed(4)
                        : props.yourStake}
                    </span>
                  </label>
                </div>
                <div className="inputGroup">
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    placeholder={`Enter amount to ${props.flow}...`}
                    value={amount}
                    onChange={(event) => setAmountValue(event.target.value)}
                  />
                  <div onClick={onMaxClick} className="inputGroupAppend">
                    <span className="inputGroupText colorDogerBlue">MAX</span>
                  </div>
                </div>
              </div>
              <div className="socardItemContainer borderNone stakedValue">
                <div>You {props.flow === 'Deposit' ? 'Stake' : 'Withdraw'}</div>
                <div className="justifyImp">{amount}</div>
              </div>
            </form>
            <div className="somodal1__body">
              <h5>Pool - </h5>
              <div className="socardItemContainer">
                <div>Daily Earnings</div>
                <div>STACK</div>
                <div>
                  {isNaN(Number(props.rewards.day))
                    ? 0
                    : Number(props.rewards.day)}
                </div>
              </div>
              <div className="socardItemContainer">
                <div>Monthly Earnings</div>
                <div>STACK</div>
                <div>
                  {isNaN(Number(props.rewards.month))
                    ? 0
                    : Number(props.rewards.month)}
                </div>
              </div>
              <div className="socardItemContainer">
                <div>Yearly Earnings</div>
                <div>STACK</div>
                <div>
                  {isNaN(Number(props.rewards.year))
                    ? 0
                    : Number(props.rewards.year)}
                </div>
              </div>
            </div>
          </div>
          <div className="socard1" style={{ paddingTop: 0 }}>
            <div className="socard1__header">
              <div className="modalBtn">
                <CustomButton
                  onCLick={onClick}
                  btnClass="primary1"
                  btnName={props.flow}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmountInputModal;
