import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from './Header/Header';
import Landing from "./Landing/Landing";
import ErrorMessage from './ErrorMessage';
import Dashboard from "./Dashboard/Dashboard";
import {connect} from "react-redux";
import * as actions from '../store/actions';
import SurveyForm from "./Survey/SurveyForm/SurveyForm";
import SurveyFill from "./Survey/SurveyFill/SurveyFill";
import PrivateRoute from './privateRoute';
import SurveyList from "./Survey/SurveyList/SurveyList";
import Spinner from "./UI/Spinner/Spinner";
import SurveyReplies from "./Survey/SurveyList/SurveyReplies";

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        let content =  <Spinner/>;
        if(this.props.auth !== null)
            content =   <Router>
                <React.Fragment>
                    <Header/>
                    <div>
                        <Switch>
                            <Route path='/' exact component={()=><Landing auth={this.props.auth}/>}/>
                            <PrivateRoute path='/surveys' exact component={Dashboard} auth={this.props.auth}/>
                            <PrivateRoute path='/surveys/new' exact component={SurveyForm} auth={this.props.auth}/>
                            <PrivateRoute path='/surveys/list' exact component={SurveyList} auth={this.props.auth}/>
                            <PrivateRoute path='/surveys/list/:surveyId' exact component={SurveyReplies} auth={this.props.auth}/>
                            <Route path='/surveys/:surveyId' component={SurveyFill}/>
                            <Route path='/' component={ErrorMessage}/>
                        </Switch>
                    </div>
                </React.Fragment>
            </Router>;

        return content;
    }
}

function mapStateToProps({auth}) {
    return {auth};
}

export default connect(mapStateToProps, actions)(App);
