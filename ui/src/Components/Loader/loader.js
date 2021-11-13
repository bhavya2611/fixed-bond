import React from "react";
import { SyncOutlined } from "@ant-design/icons";
import "./loader.scss";

const Loader = (props) => {
  return (
    <div
      style={{ display: props.show ? "flex" : "none" }}
      className="loader-div"
    >
      <SyncOutlined spin />
    </div>
  );
};

export default Loader;
