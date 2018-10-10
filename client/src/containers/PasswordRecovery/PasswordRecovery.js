import React, {Component} from 'react';

import Form from '../../components/Form/Form';
import FormField from "../../components/Form/FormField/FormField";
import FormButton from "../../components/Form/FormButton/FormButton";
import axios from "../../axios";
import {showModal} from "../../store/actions";
import connect from "react-redux/es/connect/connect";

class PasswordRecovery extends Component {
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
        if (this.state.email.length) {
            axios.post('/recovery', {
                email: this.state.email
            }).then(response => {
                this.props.setModal({
                    type: "success",
                    title: "Success",
                    text: "New password will be sent to your email"
                });
            })
        }
        else {
            this.props.setModal({
                type: "error",
                title: "Error",
                text: "Please enter email address"
            });
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

const mapDispatchToProps = dispatch => {
    return {
        setModal: modal => dispatch(showModal(modal))
    }
};

export default connect(null, mapDispatchToProps)(PasswordRecovery);
