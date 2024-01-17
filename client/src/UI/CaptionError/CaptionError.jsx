import React from "react";
import "./caption-error.css";

const CaptionError = ({ messageError }) => {
  return <div className="caption-error">{messageError}</div>;
};

export default CaptionError;
