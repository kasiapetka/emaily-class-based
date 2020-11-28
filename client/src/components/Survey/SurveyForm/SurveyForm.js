import React, {Component} from 'react';
import {connect} from "react-redux";
import SurveyFormFirstPage from "./SurveyFormFirstPage";
import SurveyFormSecondPage from "./SurveyFormSecondPage";
import SurveyFormThirdPage from "./SurveyFormThirdPage";
import * as actions from "../../../store/actions";
import SurveyFormLastPage from "./SurveyFormLastPage";
import Spinner from "../../UI/Spinner/Spinner";

class SurveyForm extends Component {

    componentDidMount() {
        this.props.createInit();
    }

    onSubmit=(values)=>{
        this.props.createSurvey(values);
    };

    renderStep(){
        switch(this.props.currentPage?.id){
            case 0:
                return <SurveyFormFirstPage onSubmit={this.props.goToNextPage}/>;
            case 1:
                return <SurveyFormSecondPage previousPage={this.props.goToPrevPage}
                                             onSubmit={this.props.goToNextPage}/>;
            case 2:
                return <SurveyFormThirdPage previousPage={this.props.goToPrevPage}
                                            onSubmit={this.props.goToNextPage}/>;
            case 3:
                return <SurveyFormLastPage previousPage={this.props.goToPrevPage}
                                            onSubmit={this.onSubmit}/>;
            default:
                return <p>Error</p>
        }
    }

    render() {
        let content;
        if(this.props.error){
            content = <p>{this.props.error}</p>;
        }else if(this.props.loading){
            content = <Spinner/>;
        }else{
            content = this.renderStep();
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

function mapStateToProps({survey}) {
    return {
        currentPage: survey.currentPage,
        loading: survey.loading,
        error: survey.error,
    };
}

export default (connect(mapStateToProps, actions)(SurveyForm));

