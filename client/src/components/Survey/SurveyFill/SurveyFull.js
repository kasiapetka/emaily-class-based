import React from "react";
import {Link} from "react-router-dom";
import {RiGhost2Fill as Ghost} from 'react-icons/ri'

export default () => <div className="row">
        <div className="col l8 offset-l2 s12">
            <div className='flex flex-middle flex-column success'>
                <div className='flex flex-column flex-middle' style={{marginTop: 0, maxWidth: '100vw'}}>
                    <h2>
                        <Ghost/>
                    </h2>
                    <h5 style={{paddingBottom: '15px'}}>
                        This survey is full!
                    </h5>
                </div>

                <Link to={"/"}
                      className="inline">
                    <button className='waves-effect waves-light btn-small indigo darken-4'>
                        Return to home.
                    </button>
                </Link>
            </div>
        </div>
    </div>
