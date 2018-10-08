import React, {Component} from 'react';

import Form from '../../components/Form/Form';
import FormField from "../../components/Form/FormField/FormField";
import FormButton from "../../components/Form/FormButton/FormButton";
import axios from "../../axios";

class Login extends Component {
    state = {
        email: ''
    };

    emailChangedHandler = (e) => {
        this.setState({
            ...this.state,
            email: e.target.value
        })
    };

    recoverButtonClickHandler = () => {
        if (this.state.password === this.state.passwordConfirm) {
            axios.post('/recovery', {
                email: this.state.email
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
                title="Recover password">
                <FormField
                    title="Your Email"
                    type="text"
                    icon="envelope"
                    placeholder="Enter your email"
                    value={this.state.email}
                    changed={this.emailChangedHandler}
                />
                <FormButton
                    title="Recover"
                    clicked={this.recoverButtonClickHandler}
                />
            </Form>
        );
    }
}

export default Login;
