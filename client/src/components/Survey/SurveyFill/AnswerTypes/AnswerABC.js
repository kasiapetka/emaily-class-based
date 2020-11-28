import React from 'react';
import {Field} from "redux-form";
import '../../Survey.scss'

const renderRadioOptions = ({questionIndex, answers, values}) => {
    return answers.map((answer, index) => {
        return <p key={index}>
            <label>
                <Field name={'answers[' + questionIndex + ']'}
                       component="input"
                       type="radio"
                       value={index}
                       checked={values && values.answers[questionIndex] ? +values.answers[questionIndex] === index : false}
                />
                <span>{answer}</span>
            </label>
        </p>
    })
};

const renderCheckboxesOptions = ({questionIndex, answers, values}) => {
    return answers.map((answer, index) => {
        return <p key={index}>
            <label>
                <Field className="filled-in" name={'answers[' + questionIndex + '].answer[' + index + ']'}
                       component="input"
                       type="checkbox"
                       value={index}
                />
                <span>{answer}</span>
            </label>
        </p>
    })
};

const AnswerABC = ({questionIndex, question, id, answers, values}) => {
    return (
        <div className="row question ">
            <div className="col s12 survey">
                <p className="question-fill">{questionIndex + 1}. {question}</p>
                <div className="flex flex-column row">
                    <div className="col s11 survey-field">
                        {
                            id === 1
                                ?
                                renderRadioOptions({answers, questionIndex, values})
                                :
                                renderCheckboxesOptions({answers, questionIndex, values})
                        }
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AnswerABC;
