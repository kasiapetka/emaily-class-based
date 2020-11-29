import React from "react";
import Survey from "./Survey";
import {Link} from "react-router-dom";

const Surveys = (props) => {

    let surveys;
    if (props.surveys?.length === 0) {
        surveys = <div className="flex flex-middle flex-column">
            <h6>You have no surveys yet :(</h6>
            <hr/>
            <Link to="/surveys/new"
                  className="flex flex-middle black-text">
                <button className="btn btn-small indigo darken-4"> Go create new survey.</button>
            </Link>
        </div>
    } else {
        surveys = props.surveys?.map((survey, index) => {
            return <Survey
                title={survey.title}
                subject={survey.subject}
                body={survey.body}
                lastResponded={survey.lastResponded}
                dateSend={survey.dateSend}
                repliesCount={survey.repliesCount}
                limit={survey.limit}
                password={survey.password}
                URL={survey.URL}
                key={index}
            />
        });
    }

    return (
        <div>
            {surveys}
        </div>
    )
};

export default Surveys;
