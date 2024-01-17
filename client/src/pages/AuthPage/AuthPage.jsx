import React from "react";
import { useState } from "react";
import LoginSection from "./LoginSection/LoginSection";
import RegisterSection from "./RegisterSection/RegisterSection";
import AuthForm from "../../сomponents/AuthForm/AuthForm";
import "./auth-page.css";

const AuthPage = () => {
    const [choiceForm, setChoiceFrom] = useState(true);

    return (
        <div className="container__auth">
            {choiceForm ? (
                <AuthForm>
                    <LoginSection setChoiceFrom={setChoiceFrom} />
                </AuthForm>
            ) : (
                <AuthForm>
                    <RegisterSection setChoiceFrom={setChoiceFrom} />
                </AuthForm>
            )}
        </div>
    );
};

export default AuthPage;
