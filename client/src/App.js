import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEnvelope, faLock, faLockOpen} from '@fortawesome/free-solid-svg-icons';
import {Route, Switch, Redirect} from 'react-router-dom';

import Layout from "./hoc/Layout/Layout";
import Registration from './containers/Registration/Registration';
import Login from './containers/Login/Login';
import PasswordRecovery from './containers/PasswordRecovery/PasswordRecovery';
import AddUser from "./containers/Users/AddUser/AddUser";
import Users from "./containers/Users/Users";
import withErrorHandler from "./hoc/withErrorHandler/withErrorHandler";
import axios from './axios';

library.add(faEnvelope, faLock, faLockOpen);

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Layout>
                        {!this.props.auth ? (
                            <Switch>
                                <Route path="/login" component={Login}/>
                                <Route path="/register" component={Registration}/>
                                <Route path="/recovery" component={PasswordRecovery}/>
                                <Redirect exact from="/" to="/login"/>
                            </Switch>) : (
                            <Switch>
                                <Route path="/users" component={Users}/>
                                <Route path="/add-user" component={AddUser}/>
                                <Redirect exact from="/" to="/users"/>
                            </Switch>)}
                    </Layout>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps)(withErrorHandler(App, axios));
