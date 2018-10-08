import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios';
import { setToken } from '../../token';
import Form from '../../components/Form/Form';
import FormField from "../../components/Form/FormField/FormField";
import FormButton from "../../components/Form/FormButton/FormButton";

import { login } from '../../store/actions';

class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    emailChangedHandler = (e) => {
        this.setState({
            ...this.state,
            email: e.target.value
        })
    };

    passwordChangedHandler = (e) => {
        this.setState({
            ...this.state,
            password: e.target.value
        })
    };

    loginButtonClickHandler = () => {
        if (this.state.email.length && this.state.password.length) {
            axios.post('/login', {
                email: this.state.email,
                password: this.state.password
            })
                .then(response => {
                    setToken(response.data.token);
                    this.props.onLogin();
                    this.props.history.push('/');
                })
                .catch(error => {
                    //todo show error
                });
        }
        else {
            //todo show error
        }
    };

    render () {
        return (
            <Form
                title="Login">
                <FormField
                    title="Your Email"
                    type="text"
                    icon="envelope"
                    placeholder="Enter your email"
                    value={this.state.email}
                    changed={this.emailChangedHandler}
                />
                <FormField
                    title="Password"
                    type="password"
                    icon="lock"
                    placeholder="Enter your Password"
                    value={this.state.password}
                    changed={this.passwordChangedHandler}
                />
                <FormButton
                    title="Login"
                    clicked={this.loginButtonClickHandler}
                />
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: () => dispatch(login())
    }
};

export default connect(null, mapDispatchToProps)(Login);
