import React from 'react';
import {Field} from "redux-form";

const renderDropdownOptions = ({ input, label, answers, meta: {error, touched}}) => {
    return (
        <div className="survey-field">
            <label>{label}</label>
            <div style={{position: 'relative'}}>
                <select {...input} style={{display: 'block'}}>
                    <option value="" disabled>Answers</option>
                    {answers.map((answer, index) => {
                        return <option key={index} value={index}>{answer}</option>;
                    })}
                </select>
                {touched && error}
            </div>
        </div>
    );
};

const AnswerDropdown = ({index, question, answers}) => {
    return (
        <div className="row question">
            <div className="col s10">
                <p className="question-fill">{index + 1}. {question}</p>
                <Field name={'answers['+index+']'} component={renderDropdownOptions} answers={answers}/>
            </div>
        </div>
    );
};

export default AnswerDropdown;
