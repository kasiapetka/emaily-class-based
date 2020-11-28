import React from 'react';
import {Field} from "redux-form";
import SurveyField from "../../SurveyForm/SurveyField/SurveyField";

const AnswerOpen =({index, question})=> {
        return (
            <div className="row question">
                <div className="col s12">
                    <p className="question-fill">{index+1}. {question}</p>
                    <Field
                        name={'answers['+index+']'}
                        type="text"
                        component={SurveyField}
                    />
                </div>
            </div>
        );
};

export default AnswerOpen;
