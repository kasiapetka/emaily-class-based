import React, {Component} from 'react';
import {RiCheckFill} from "react-icons/ri";
import {Field, reduxForm,getFormValues } from "redux-form";
import {Link} from "react-router-dom";
import validate from './validate'
import SurveyField from "./SurveyField/SurveyField";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";
import SurveyFormSuccess from "./SurveyFormSuccess";

const renderError = ({meta: {touched, error}}) =>
    touched && error ? <span className="validation-message">{error}</span> : false;

class SurveyFormFirstPage extends Component {

    limitDetails = () => {
        if (this.props.values?.specifyRecipients) {
            return (
                <div>
                    provide emails
                </div>
            )
        } else if (!this.props.values?.specifyRecipients) {
            return (
                <div>
                    <Field name="limit"
                           component={SurveyField}
                           type="number"
                           label="Set limit for the number of replies"
                    />
                </div>
            )
        }
    };

    render() {
        let content;
        if(this.props.surveyCreatedSuccess){
            content = <SurveyFormSuccess URL={this.props.surveyCreatedURL} password={this.props.surveyCreatedPass}/>;
        }else{
            content = <div className="bg bg-secondary">
                <div className="container">
                    <div className="survey row">
                        <div className="col m8 s12">
                            <form onSubmit={this.props.handleSubmit(() => this.props.onSubmit())}>
                                <div className="survey-field">
                                    <label>Do You want to set password for Your survey?</label>
                                    <p>
                                        <label>
                                            <Field name="password"
                                                   component="input"
                                                   type="radio"
                                                   value="true"
                                            />
                                            <span>Yes, set password</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <Field name="password"
                                                   component="input"
                                                   type="radio"
                                                   value="false"
                                            />
                                            <span>No, skip password</span>
                                        </label>
                                    </p>
                                    <Field name="password" component={renderError}/>
                                </div>
                                {/*<div>*/}
                                {/*    <label>Do You want to specify the recipients?</label>*/}
                                {/*    <p>*/}
                                {/*        <label>*/}
                                {/*            <Field className="filled-in" name="specifyRecipients" component="input"*/}
                                {/*                   type="checkbox"*/}
                                {/*                   value={this.props.values?.specifyRecipients} checked={this.props.values?.specifyRecipients ? this.props.values?.specifyRecipients : false }/>*/}
                                {/*            <span>Yes</span>*/}
                                {/*        </label>*/}
                                {/*    </p>*/}
                                {/*</div>*/}
                                {this.limitDetails()}
                                <div className="flex flex-justify-between buttons">
                                    <Link to="/surveys" className="btn large red darken-4">Cancel</Link>
                                    <button type="submit" className="btn large indigo darken-4">Next <RiCheckFill/>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        }
        return content;
    }
};

function mapStateToProps({survey}) {
    return {
        surveyCreatedSuccess: survey.surveyCreatedSuccess,
        surveyCreatedURL: survey.surveyCreatedURL,
        surveyCreatedPass: survey.surveyCreatedPass
    };
}

SurveyFormFirstPage = connect(state => ({
    values: getFormValues('surveyForm')(state),
}))(SurveyFormFirstPage);

export default reduxForm({
    form: 'surveyForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(connect(mapStateToProps, actions)(SurveyFormFirstPage));
