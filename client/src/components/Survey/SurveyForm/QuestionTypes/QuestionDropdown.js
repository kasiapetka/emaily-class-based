import React from 'react';
import {Field, FieldArray} from "redux-form";
import SurveyField from "../SurveyField/SurveyField";
import AnswerField from "./AnswerField";

const renderDropdownOptions = ({fields, meta: {error, submitFailed}, questionIndex}) => {
    return (
            <div className="flex flex-justify-between">
                <button type="button" className="btn btn-small indigo darken-4"
                        onClick={() => fields.push()}>Add Answer</button>
                <div>
                    {
                        fields.map((answer, index) =>
                            <AnswerField
                                key={index}
                                index={index}
                                answer={answer}
                                id={3}
                                questionIndex={questionIndex}/>)
                    }
                </div>
            </div>
    );
};

const QuestionDropdown = ({index, question, removeQuestion, fields}) => {
    return (
        <div className="row question">
            <div className="col s1"><button type="button" className="flex flex-middle btn btn-small red darken-4"
                                            style={{height:'25px', padding:'0 10px'}}
                                            onClick={()=>removeQuestion(index,fields)}>X</button></div>
            <div className="col s10">
                <p>{index + 1}. Dropdown Question</p>
                <Field
                    name={`${question}.question`}
                    type="text"
                    component={SurveyField}
                />
                <FieldArray name={`${question}.answers`} questionIndex={index}
                            component={renderDropdownOptions}/>

            </div>
        </div>

    );
};

export default QuestionDropdown;
