import React, {Component} from "react";
import './Modal.scss'
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.show !== nextProps.show || this.props.children !== nextProps.children;
    }

    render(){
        return (
            <React.Fragment>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}/>

                <div className="custom-modal" style={{
                    opacity: this.props.show ? '1' : '',
                    visibility: this.props.show ? 'visible' : ''
                }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
};

export default Modal;
