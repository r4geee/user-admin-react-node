import React from 'react';
import { NavLink } from 'react-router-dom';

const navigationItem = props => {
    const link = props.link ?
        <NavLink
            to={props.link}
            exact
        >
            {props.children}
        </NavLink> :(// eslint-disable-next-line
        <a href="#" onClick={props.clicked}>{props.children}</a>
        );

    return <li>{link}</li>
};

export default navigationItem;
