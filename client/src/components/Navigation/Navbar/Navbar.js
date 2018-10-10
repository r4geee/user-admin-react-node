import React from 'react';

import classes from './Navbar.module.scss';
import NavigationItems from '../NavigationItems/NavigationItems';

const navbar = props => (
    <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
            <div className="navbar-collapse collapse">
                <div className="navbar-header">
                    <div className={classes.Logo}>
                    </div>
                </div>
                <NavigationItems />
            </div>
        </div>
    </nav>
);

export default navbar;
