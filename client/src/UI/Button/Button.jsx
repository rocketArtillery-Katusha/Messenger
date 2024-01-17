import React from "react";
import "./button.css";

const Button = ({ cb, value }) => {
  return (
    <button className="buttonUI" onClick={cb}>
      {value}
    </button>
  );
};

export default Button;
