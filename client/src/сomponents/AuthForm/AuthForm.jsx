import React from "react";
import "./auth-form.css";

const AuthForm = ({ children }) => {
  return (
    <div className="container__forms">
      <div className="auth__header">
        <h1>Вход</h1>
      </div>
      <form className="auth__content">{children}</form>
    </div>
  );
};

export default AuthForm;
