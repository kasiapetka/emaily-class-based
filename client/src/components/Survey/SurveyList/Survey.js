import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {RiCheckDoubleFill as Full} from 'react-icons/ri'
import * as actions from "../../../store/actions";
import {connect} from 'react-redux';

const formatDate = (date) => {
    if (date) {
        let dateArr = date.split('T')[0].split('-');
        return dateArr[2] + '/' + dateArr[1] + '/' + dateArr[0];
    } else return 'No response yet.';
};

class Survey extends Component {
    render() {
        let title = <h5 style={{margin: '0'}}>Title: {this.props.title}</h5>;
        if (this.props.limit === this.props.repliesCount) {
            title =
                <h5 style={{margin: '0'}} className="green-text text-darken-1">Title: {this.props.title} <Full/></h5>;
        }

        return (
            <div className="survey-list">
                <div className="flex flex-justify-between">
                    {title}
                    <div className="flex">
                        <Link to={"/surveys/list/" + this.props.URL}>
                            <button className="btn btn-small indigo darken-4">See more</button>
                        </Link>
                        <button type="button" className="flex flex-middle btn btn-small red darken-4"
                                style={{padding:'0 10px', marginLeft: '10px'}}
                                onClick={()=>this.props.deleteSurvey(this.props.URL)}>X</button>
                    </div>
                </div>
                <h6>Subject: {this.props.subject}</h6>
                <h6>Body: {this.props.body}</h6>
                <div className="flex flex-justify-between">
                    <div className="flex-column">
                        <div className="flex flex-column">
                            <span style={{fontWeight: 'bold'}}>Created on:</span>
                            <span>{formatDate(this.props.dateSend)}</span>
                        </div>
                        <div className="flex flex-column">
                            <span style={{fontWeight: 'bold'}}>Last response:</span>
                            <span>{formatDate(this.props.lastResponded)}</span>
                        </div>
                        <div className="flex flex-column flex-end">
                            <span style={{fontWeight: 'bold'}}>Password:</span>
                            <span>{this.props.password ? this.props.password : 'No password'}</span>
                        </div>
                    </div>
                    <div className="flex-column">
                        <div className="flex flex-column">
                            <span style={{fontWeight: 'bold'}}>Limit:</span>
                            <span>{this.props.limit}</span>
                        </div>
                        <div className="flex flex-column">
                            <span style={{fontWeight: 'bold'}}>Responses:</span>
                            <span>{this.props.repliesCount}</span>
                        </div>
                        <div className="flex flex-column">
                            <span style={{fontWeight: 'bold'}}>Link:</span>
                            <Link to={"/surveys/" + this.props.URL}>
                            <span>
                                Here
                            </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default connect(
    null,actions
)(Survey);
