import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

import NavigationItem from "./NavigationItem/NavigationItem";
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { deleteToken } from "../../../token";
import { logout } from '../../../store/actions';
import NavigationButton from "./NavigationButton/NavigationButton";
import {withRouter} from "react-router";

class NavigationItems extends Component {
    onLogoutHandler = () => {
        deleteToken();
        this.props.onLogout();
        this.props.history.push('/');
    };

    render () {
        const mainItems = !this.props.auth ?
            (
                <ul className="nav navbar-nav">
                    <NavigationItem link="/login" active>Login</NavigationItem>
                    <NavigationItem link="/register" active>Registration</NavigationItem>
                    <NavigationItem link="/recovery" active>Recover password</NavigationItem>
                </ul>
            ) :
            (
                <ul className="nav navbar-nav">
                    <NavigationItem link="/users" active>Users</NavigationItem>
                    <NavigationItem link="/add-user" active>Add user</NavigationItem>
                </ul>
            );

        const onRightItems = this.props.auth ?
            (
                <NavigationButton right clicked={this.onLogoutHandler} active>
                    Logout
                </NavigationButton>
            ) : null;
        return (
            <Aux>
                {mainItems}
                {onRightItems}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationItems));
