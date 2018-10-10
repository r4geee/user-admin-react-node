import React from 'react';

const navigationButton = props => {
    let classes = "btn btn-primary navbar-btn";
    if (props.right) {
        classes += " pull-right"
    }
    return (
        <button
            className={classes}
            onClick={props.clicked}
        >
            {props.children}
        </button>);
};

export default navigationButton;
