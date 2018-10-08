import React from 'react';

import classes from './Form.module.scss';

const form = props => {
    return (
        <div className={classes.Form}>
            <div className="row"><h1>{props.title}</h1></div>
            <form className="form-horizontal" method="post" action="#">
                {props.children}
            </form>
        </div>
    );
};

export default form;
