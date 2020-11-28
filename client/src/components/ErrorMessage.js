import React from 'react';
import {RiErrorWarningFill as Error} from "react-icons/ri";
import {Link} from "react-router-dom";


const ErrorMessage = () => {
    return (
        <div className='flex flex-middle flex-column'>
            <h3 className='flex flex-column flex-middle'>
                <h2>
                    <Error/>
                </h2>
                <h2>404</h2>
                Oh, no! We can't find what You are looking for.
            </h3>
            <Link to={"/"}
                  className="inline">
                <button className='waves-effect waves-light btn-small indigo darken-4'>
                    Return to home.
                </button>
            </Link>
        </div>
    )
};

export default ErrorMessage;


