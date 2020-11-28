import React from "react";
import './Backdrop.scss';

export default (props) => (
         <div className="custom-backdrop" onClick={props.clicked} style={{
            opacity: props.show ? '1' : '',
            visibility: props.show ? 'visible' : ''
        }}></div>
);


