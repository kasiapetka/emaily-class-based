import React from 'react';
import {Field} from "redux-form";
import SurveyField from "../SurveyField/SurveyField";

const QuestionOpen =({index, removeQuestion,fields, question})=> {
        return (
            <div className="row question">
                <div className="col s1"><button type="button" className="flex flex-middle btn btn-small red darken-4"
                                                style={{height:'25px', padding:'0 10px'}}
                    onClick={()=>removeQuestion(index,fields)}>X</button></div>
                <div className="col s10">
                    <p>{index+1}. Question Open</p>

                    <Field
                        name={`${question}.question`}
                        type="text"
                        value=''
                        component={SurveyField}
                    />
                    <Field type="text"
                           name={`${question}.answer`}
                           disabled={true}
                           placeholder="Space for an answer"
                           component={SurveyField}/>
                </div>
            </div>
        );
};

export default QuestionOpen;
