import React from "react";
import "./customButton.scss";

const CustomButton = ({ onCLick, btnClass, btnName, btnText, disabled }) => {
  return (
    <button
      type="button"
      className={`btn-outline-${btnClass} btn-basic`}
      onClick={onCLick}
      disabled={disabled}
    >
      <div>
        <h5 className={btnText ? "mb-10" : ""}>{btnName}</h5>
        <span className="smallFont">{btnText ? <p>{btnText}</p> : null}</span>
      </div>
    </button>
  );
};

export default CustomButton;
