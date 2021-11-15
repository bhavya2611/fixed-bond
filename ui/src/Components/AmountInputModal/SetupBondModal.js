import React, { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import '../../Styles/modal.scss';
import './amountInputModal.scss';

const SetupBondModal = (props) => {
  const showClass = props.isActive ? 'show' : '';
  const [bondInfoObject, setBondInfoObject] = useState({
    isActive: true,
    minimumDeposit: 0,
    interestOneMonth: 0,
    interestThreeMonth: 0,
    interestSixMonth: 0,
    interestTwelveMonth: 0,
  });

  const onClick = () => {
    props.onClick(bondInfoObject);
  };

  const setValue = (value, prop) => {
    const bondInfoObjectNew = { ...bondInfoObject };
    bondInfoObjectNew[prop] = value;
    setBondInfoObject(bondInfoObjectNew);
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
                    Is Active <span className='colorBitterSweet'>*</span>
                  </label>
                </div>
                <div className='inputGroup'>
                  <select
                    className='form-control'
                    value={bondInfoObject.isActive}
                    onChange={(event) =>
                      setValue(event.target.value, 'isActive')
                    }
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </select>
                </div>
              </div>
              <div className='form-group'>
                <div className='balanceInfoDiv'>
                  <label className='somodal1__label'>
                    Minmum Deposit <span className='colorBitterSweet'>*</span>
                  </label>
                </div>
                <div className='inputGroup'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder={`Enter amount ...`}
                    value={bondInfoObject.minimumDeposit}
                    onChange={(event) =>
                      setValue(event.target.value, 'minimumDeposit')
                    }
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='balanceInfoDiv'>
                  <label className='somodal1__label'>
                    Interest for One Month{' '}
                    <span className='colorBitterSweet'>*</span>
                  </label>
                </div>
                <div className='inputGroup'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder={`Enter pecentage ...`}
                    value={bondInfoObject.interestOneMonth}
                    onChange={(event) =>
                      setValue(event.target.value, 'interestOneMonth')
                    }
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='balanceInfoDiv'>
                  <label className='somodal1__label'>
                    Interest for Three Month{' '}
                    <span className='colorBitterSweet'>*</span>
                  </label>
                </div>
                <div className='inputGroup'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder={`Enter pecentage ...`}
                    value={bondInfoObject.interestThreeMonth}
                    onChange={(event) =>
                      setValue(event.target.value, 'interestThreeMonth')
                    }
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='balanceInfoDiv'>
                  <label className='somodal1__label'>
                    Interest for Six Month{' '}
                    <span className='colorBitterSweet'>*</span>
                  </label>
                </div>
                <div className='inputGroup'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder={`Enter pecentage ...`}
                    value={bondInfoObject.interestSixMonth}
                    onChange={(event) =>
                      setValue(event.target.value, 'interestSixMonth')
                    }
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='balanceInfoDiv'>
                  <label className='somodal1__label'>
                    Interest for Twelve Month{' '}
                    <span className='colorBitterSweet'>*</span>
                  </label>
                </div>
                <div className='inputGroup'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder={`Enter pecentage ...`}
                    value={bondInfoObject.interestTwelveMonth}
                    onChange={(event) =>
                      setValue(event.target.value, 'interestTwelveMonth')
                    }
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
                  btnName='Setup Bond'
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
