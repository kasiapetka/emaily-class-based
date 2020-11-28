import React from 'react';
import './Landing.scss';
import {Link} from "react-router-dom";
import {RiAddLine as Plus} from "react-icons/ri";

const Landing = ({auth}) => {
    let addNewSurvey, helloNote;

    if (auth){
        addNewSurvey = <div className="fixed-action-btn" style={{bottom: '50px', right: '50px'}}>
            <Link to="/surveys/new"
                  className="btn-floating btn-large waves-effect waves-light red">
                        <span
                            className="dashboard_icon flex flex-middle flex-justify-center h-100"><Plus/></span>
            </Link>
        </div>;
        helloNote= <h6>Hello {auth.name}! Your email is: {auth.email}.</h6>
    }

    return (
        <div className="bg bg-primary">
            <div className="container landing">
                <div className='row'>
                    <div className='col m9 s12'>
                        <br/>
                        <div className="landing_space"></div>
                        <h1>Emaily!</h1>
                        <hr/>
                        {helloNote}
                        <h6>Create surveys and collect feedback, and keep all Your data well-organised and
                            consistent.</h6>
                    </div>

                </div>
                {addNewSurvey}
            </div>
        </div>
    )
};

export default Landing;
