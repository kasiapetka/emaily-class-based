import React, {Component} from 'react';
import {Field, getFormValues, reduxForm} from "redux-form";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";
import {RiCheckFill} from "react-icons/ri";
import validate from "./validate";

class SurveyFormLastPage extends Component {
    renderQuestions = () => {
        return this.props.values.questions?.map((question, index) => {
            let answers;
            if (question.id === 0) {
                answers = <textarea disabled value="Space for answer." style={{height: '5rem'}}>
                            </textarea>
            }
            if ((question.id === 1 || question.id === 2) && question.answers) {
                answers = <div>
                    {question.answers.map((answer, i) => {
                        return <p key={i} style={{paddingLeft: "15px"}}>
                            <label>
                                <Field name={"answers[" + index + "]"}
                                       component="input"
                                       type="radio"
                                       disabled={true}
                                       checked={false}
                                />
                                <span>{index + 1}.{i} {answer}</span>
                            </label>
                        </p>
                    })}
                </div>;
            } else if (question.id === 3 && question.answers) {
                answers = <select name="dropdown" style={{display: 'block'}}>
                    <option value="">Options</option>
                    {question.answers.map((answer, i) => {
                        return <option key={i} value={answer} disabled={true}>{answer}</option>
                    })}
                </select>;
            }

            return <div key={index} className="question">
                <h6>{index + 1}.{question.question}</h6>
                {answers}
            </div>
        })
    };

    onSubmit = (values) => {
        this.props.onSubmit(values);
        this.props.reset()
    };

    render() {
        return <div className="bg bg-secondary">
            <div className="container">
                <div className="survey row">
                    <div className="col m8 s12">
                        <form onSubmit={this.props.handleSubmit((values) => this.onSubmit(values))}>
                            <h5>Title: {this.props.values.title}</h5>
                            <h6>Subject: {this.props.values.subject}</h6>
                            <h6>Body: {this.props.values.body}</h6>
                            <p style={{marginBottom: "0", display: "inline-block"}}>Limit of replies: for Your
                                survey:</p>
                            <h6 style={{display: "inline-block"}}>{this.props.values.limit}</h6>
                            <p style={{marginTop: "0"}}>Your
                                survey {this.props.values.password === "false" ? "has no" : "has"} password.</p>
                            {this.renderQuestions()}
                            <div className="flex flex-justify-between buttons">
                                <button onClick={this.props.previousPage} className="btn large red darken-4">Back
                                </button>
                                <button type="submit" className="btn large indigo darken-4">Next <RiCheckFill/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>;
    }
}


SurveyFormLastPage = connect(state => ({
    values: getFormValues('surveyForm')(state),
}))(SurveyFormLastPage);

export default reduxForm({
    form: 'surveyForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(connect(null, actions)(SurveyFormLastPage));

