import React from "react";
import "./text-input.css";

const TextInput = ({ placeholder, state, setState, onChangeState, type }) => {
  return (
    <div className="auth__input">
      <input
        type={type}
        placeholder={placeholder}
        value={state[onChangeState]}
        onChange={(e) =>
          setState({ ...state, [onChangeState]: e.target.value })
        }
      />
    </div>
  );
};

export default TextInput;
