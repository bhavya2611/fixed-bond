import React from "react";
import Toast from "react-bootstrap/Toast";
import "./popup.scss";

const PopupComponent = (props) => {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{ display: props.show ? "block" : "none" }}
      className="toast-modal"
    >
      <Toast show={props.show} animation={true} className="toast-container">
        <div
          className={
            props.title === "Error"
              ? "toastHeaderMessageError"
              : "toastHeaderMessageSuccess"
          }
        >
          {props.title}
          <i
            className="fa fa-times"
            style={{
              margin: 0,
            }}
            onClick={props.closePopup}
          />
        </div>
        <div className="toast-icon">
          {props.title !== "Error" ? (
            <div>
              <i
                className="fa fa-check"
                style={{
                  margin: 0,
                  color: "#8ae261",
                }}
              ></i>
            </div>
          ) : (
            <div>
              <i
                className="fa fa-times"
                style={{
                  margin: 0,
                  color: "#ff6363",
                }}
              ></i>
            </div>
          )}
        </div>
        <h2
          style={{
            color: props.title === "Error" ? "#ff6363" : "#8ae261",
            textAlign: "center",
            fontWeight: "300",
          }}
        >
          <p style={{ margin: 0 }}>
            {props.title === "Error" ? "Uh Oh." : "Woo Hoo!"}
          </p>
        </h2>
        <Toast.Body>
          <div
            className={
              props.title === "Error" ? "colorBitterSweet" : "colorMintGreen"
            }
          >
            {props.message}
          </div>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default PopupComponent;
