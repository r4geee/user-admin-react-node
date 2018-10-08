import React, { Component } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import classes from './Layout.module.scss';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    render () {
        return (
            <Aux>
                <Navbar/>
                <div className="container">
                    <div className={classes.Main + " row"}>
                        <div className="col-xs-12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Layout;
