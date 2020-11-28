import React from 'react';
import {Field} from "redux-form";
import SurveyField from "../SurveyField/SurveyField";

const AnswerField = ({index, questionIndex, answer, id}) => {
    return (
        <div className="row" style={{margin: '0'}}>
            <div className="col s12">
                <div className="row" style={{margin: '0'}}>
                    {id === 3 ? null : <p className="col s1">{questionIndex + 1}.{index + 1})</p>}
                    <div className="col s11">
                        <Field type="text"
                               name={answer}
                               component={SurveyField}/>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnswerField;
