import React, {Component} from "react";
import './Dashboard.scss';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import {RiUserShared2Fill as Logout, RiFileListFill as List, RiAddLine as Plus} from "react-icons/ri";

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="bg bg-primary">
                    <div className="container dashboard">
                        <div className="dashboard_space"></div>
                        <h2>Dashboard</h2>
                        <hr/>
                        <h5>Hello {this.props.auth.name}! Your email is: {this.props.auth.email}.</h5>
                        <h5>What do You want to do now?</h5>
                        <div className="row">
                            <ul className="dashboard_navigation col s5">
                                <li className="dashboard_navigation_item z-depth-1 flex flex-middle">
                                    <Link to="/surveys/list"
                                          className="flex flex-middle black-text">
                                        <List/>
                                        <span style={{paddingLeft: '15px'}}>Show my surveys.</span>
                                    </Link>
                                </li>
                                <li className="dashboard_navigation_item z-depth-1">
                                    <Link to="/surveys/new"
                                          className="flex flex-middle black-text">
                                        <span><Plus/></span>
                                        <span style={{paddingLeft: '15px'}}>Create new survey.</span>
                                    </Link>
                                </li>
                                <li className="dashboard_navigation_item z-depth-1">
                                    <a href={"/api/logout"} className="flex flex-middle black-text">
                                        <span><Logout/></span>
                                        <span style={{paddingLeft: '15px'}}>Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="fixed-action-btn" style={{bottom: '50px', right: '50px'}}>
                            <Link to="/surveys/new"
                                  className="btn-floating btn-large waves-effect waves-light red">
                        <span
                            className="dashboard_icon flex flex-middle flex-justify-center h-100"><Plus/></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps({auth}) {
    return {auth};
}

export default (connect(mapStateToProps, actions)(Dashboard));
