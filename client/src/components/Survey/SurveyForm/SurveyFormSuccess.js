import React, {Component} from "react";
import { RiCheckboxCircleFill as Success, RiFileCopyFill as Clipboard, RiCheckFill as Copied} from "react-icons/ri"
import {Link} from "react-router-dom";
const copy = require('copy-text-to-clipboard');


class SurveyFormSuccess extends Component{

    state={
        copied: false
    };

    onCopyLink=()=>{
        copy(window.location.origin + "/surveys/" + this.props.URL);
        this.setState({
            copied: true
        })
    };

    render() {
        let content;
        if (this.props.URL) {
            content = <React.Fragment>
                <h5>Link to Your survey:</h5>

                <Link to={"/surveys/" + this.props.URL}>
                    <h5 style={{
                        marginTop: 0,
                        maxWidth: '90vw',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {window.location.origin + "/surveys/" + this.props.URL}
                    </h5>
                </Link>

                {
                    this.props.password
                        ?
                        <p>Password is: {this.props.password}</p>
                        :
                        null
                }

            </React.Fragment>
        } else content = <h5>Your reply has been sent. Thank You!</h5>;

        return (
            <div className="row">
                <div className="col l8 offset-l2 s12">
                    <div className='flex flex-middle flex-column success'>
                        <div className='flex flex-column flex-middle' style={{marginTop: 0, maxWidth: '100vw'}}>
                            <h2>
                                <Success/>
                            </h2>
                            {content}
                        </div>

                        <div className="flex flex-middle">
                            <Link to={"/"}
                                  className="inline">
                                <button className='waves-effect waves-light btn-small indigo darken-4'>
                                    Return to home.
                                </button>
                            </Link>
                            <button className='waves-effect waves-light btn-small transparent black-text'
                                    onClick={this.onCopyLink}
                                    style={{marginLeft: '10px', fontSize: '1.8rem'}}>
                                { this.state.copied ? <Copied/> : <Clipboard/>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default SurveyFormSuccess;
