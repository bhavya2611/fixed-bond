import React, { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import '../../Styles/modal.scss';
import './amountInputModal.scss';

const SetupBondModal = (props) => {
  const showClass = props.isActive ? 'show' : '';
  const [poolAddObject, setPoolAddObject] = useState({
    allocPoint: 0,
    lpTokenAddress: '',
    update: false,
  });

  const onClick = () => {
    props.onClick(poolAddObject);
  };

  const setValue = (value, prop) => {
    const poolAddObjectNew = { ...poolAddObject };
    if (prop === 'update') {
      if (value === 'true') poolAddObjectNew[prop] = true;
      else poolAddObjectNew[prop] = false;
    } else {
      poolAddObjectNew[prop] = value;
    }
    setPoolAddObject(poolAddObjectNew);
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
                    Alloc Point <span className='colorBitterSweet'>*</span>
                  </label>
                </div>
                <div className='inputGroup'>
                  <input
                    type='number'
                    min={0}
                    className='form-control'
                    placeholder={`Enter alloc points ...`}
                    value={poolAddObject.allocPoint}
                    onChange={(event) =>
                      setValue(event.target.value, 'allocPoint')
                    }
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='balanceInfoDiv'>
                  <label className='somodal1__label'>
                    LP Token Address <span className='colorBitterSweet'>*</span>
                  </label>
                </div>
                <div className='inputGroup'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder={`Enter lp token address ...`}
                    value={poolAddObject.lpTokenAddress}
                    onChange={(event) =>
                      setValue(event.target.value, 'lpTokenAddress')
                    }
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='balanceInfoDiv'>
                  <label className='somodal1__label'>
                    Mass Update Pools{' '}
                    <span className='colorBitterSweet'>*</span>
                  </label>
                </div>
                <div className='inputGroup'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder={`Mass Update pools ...`}
                    value={poolAddObject.update}
                    onChange={(event) => setValue(event.target.value, '')}
                  />
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
                  btnName='Add Pool'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupBondModal;
