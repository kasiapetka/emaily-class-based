import React from "react";
import { RiErrorWarningLine as Warning } from "react-icons/ri";

export default ({ input, label, placeholder, disabled, type, meta: { touched, error } }) =>{
    return(
        <div className="survey-field">
            <label>{label}</label>
            <div style={{position:'relative'}}>
                <input {...input} placeholder={placeholder} disabled={disabled} type={type} className={(touched && error) ? "error" : ""}/>
                {touched && error && <Warning className="error-icon"/>}
                {touched && error && <p className="validation-message">{error}</p>}

            </div>
        </div>
    );
}
