import React from 'react';
import { NavLink } from 'react-router-dom';

const navigationItem = props => {
    return (
        <li>
            <NavLink
                to={props.link}
                exact
            >
                {props.children}
            </NavLink>
        </li>)
};

export default navigationItem;
