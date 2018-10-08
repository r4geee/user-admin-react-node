import React from 'react';

const formButton = props => {
    let bootstrapClass = ' btn-primary';
    if (props.bootstrapClass) {
        bootstrapClass = ` btn-${props.bootstrapClass}`;
    }
    return (
        <div className="form-group ">
            <button
                type="button"
                className={"btn btn-lg btn-block" + bootstrapClass}
                onClick={props.clicked}>
                {props.title}
            </button>
        </div>
    );
};

export default formButton;
