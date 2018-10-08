import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const formField = props => {
    return (
        <div className="form-group">
            <label className="cols-sm-2 control-label">{props.title}</label>
            <div className="cols-sm-10">
                <div className="input-group">
                    <span className="input-group-addon"><FontAwesomeIcon icon={props.icon}/></span>
                    <input
                        type={props.type}
                        className="form-control"
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.changed}/>
                </div>
            </div>
        </div>
    );
};

export default formField;
