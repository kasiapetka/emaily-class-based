import React from 'react';
import {connect} from "react-redux";
import {RiUserReceived2Fill as Login, RiUserShared2Fill as Logout, RiMailStarFill as Logo} from "react-icons/ri";
import {Link} from "react-router-dom";
import './Header.scss';

const Header = ({auth}) => {

    const renderContent = () => {
        switch (auth) {
            case null:
                return;
            case false:
                return <li><a href={"/auth/google"} className="flex flex-middle"><Login/>Login with Google</a></li>;
            default:
                return <li><a href={"/api/logout"} className="flex flex-middle"><Logout/>Logout</a></li>;
        }
    };

    return (
        <nav>
            <div className="nav-wrapper indigo darken-4 header flex flex-justify-between">
                <Link to={auth ? '/surveys' : '/'}
                      className="flex flex-middle header_logo"><Logo/>Emaily</Link>
                <ul className='header_buttons'>
                    {renderContent()}
                </ul>
            </div>
        </nav>
    );

};

function mapStateToProps({auth}) {
    return {auth};
}

export default connect(mapStateToProps)(Header);
