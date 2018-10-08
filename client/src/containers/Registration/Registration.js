import React, {Component} from 'react';
import Form from "../../components/Form/Form";
import FormField from "../../components/Form/FormField/FormField";
import FormButton from "../../components/Form/FormButton/FormButton";
import axios from "../../axios";

class Registration extends Component {
    state = {
        email: '',
        password: '',
        passwordConfirm: ''
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

    passwordConfirmChangedHandler = (e) => {
        this.setState({
            ...this.state,
            passwordConfirm: e.target.value
        })
    };

    registerButtonClickHandler = () => {
        if (this.state.email.length &&
            this.state.password.length &&
            this.state.passwordConfirm.length &&
            this.state.password === this.state.passwordConfirm) {
            axios.post('/new-user', {
                email: this.state.email,
                password: this.state.password
            })
                .then(response => {
                    //todo show success
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
                title="Registration">
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
                    icon="lock-open"
                    placeholder="Enter your Password"
                    value={this.state.password}
                    changed={this.passwordChangedHandler}
                />
                <FormField
                    title="Confirm Password"
                    type="password"
                    icon="lock"
                    placeholder="Confirm your Password"
                    value={this.state.passwordConfirm}
                    changed={this.passwordConfirmChangedHandler}
                />
                <FormButton
                    title="Register"
                    clicked={this.registerButtonClickHandler}
                />
            </Form>
        );
    }
}

export default Registration;
