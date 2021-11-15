import React, { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import '../../Styles/modal.scss';
import './amountInputModal.scss';

const AmountInputModal = (props) => {
  const showClass = props.isActive ? 'show' : '';
  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState(1);

  const onClick = () => {
    if (Number(amount) > 0) {
      props.flow === 'Deposit'
        ? props.onClick(amount, time)
        : props.onClick(amount);
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
        <div className='somodal1__content'>
          <div className='somodal1__header'>
            <h5 className='modal-title somodal1__title'>
              <span>{props.flow}</span>
            </h5>
            <button
              type='button'
              className='somodal1__close'
              aria-label='Close'
              onClick={props.closeModal}
            >
              <i className='fa fa-times'></i>
            </button>
          </div>
          <div className='somodal1__body'>
            <form action=''>
              <div className='form-group'>
                <div className='balanceInfoDiv'>
                  <label className='somodal1__label'>
                    Amount <span className='colorBitterSweet'>*</span>
                  </label>
                </div>
                <div className='inputGroup'>
                  <input
                    type='number'
                    min={0}
                    className='form-control'
                    placeholder={`Enter amount to ${props.flow}...`}
                    value={amount}
                    onChange={(event) => setAmountValue(event.target.value)}
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='balanceInfoDiv'>
                  <label className='somodal1__label'>
                    Deposit for (Months){' '}
                    <span className='colorBitterSweet'>*</span>
                  </label>
                </div>
                <div className='inputGroup'>
                  <select
                    className='form-control'
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                  >
                    <option value={1}>1</option>
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div className='socard1' style={{ paddingTop: 0 }}>
            <div className='socard1__header'>
              <div className='modalBtn'>
                <CustomButton
                  onCLick={onClick}
                  btnClass='primary1'
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
