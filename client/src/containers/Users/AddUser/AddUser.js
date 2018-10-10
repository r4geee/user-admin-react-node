import React, {Component} from 'react';
import Form from '../../../components/Form/Form';
import FormField from '../../../components/Form/FormField/FormField';
import FormButton from '../../../components/Form/FormButton/FormButton';
import axios from '../../../axios';
import {showModal} from '../../../store/actions';
import connect from 'react-redux/es/connect/connect';

class AddUser extends Component {
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

    createButtonClickHandler = () => {
        if (this.state.email.length &&
            this.state.password.length &&
            this.state.passwordConfirm.length &&
            this.state.password === this.state.passwordConfirm) {
            axios.post('/new-user', {
                email: this.state.email,
                password: this.state.password
            })
                .then(response => {
                    this.props.setModal({
                        type: 'success',
                        title: 'Success',
                        text: 'New user registered'
                    });
                })
        }
        else {
            this.props.setModal({
                type: 'error',
                title: 'Error',
                text: 'Please enter email address'
            });
        }
    };

    render () {
        return (
            <Form
                title="Add new user">
                <FormField
                    title="Email"
                    type="text"
                    icon="envelope"
                    placeholder="Enter email"
                    value={this.state.email}
                    changed={this.emailChangedHandler}
                />
                <FormField
                    title="Password"
                    type="password"
                    icon="lock-open"
                    placeholder="Enter Password"
                    value={this.state.password}
                    changed={this.passwordChangedHandler}
                />
                <FormField
                    title="Confirm Password"
                    type="password"
                    icon="lock"
                    placeholder="Confirm Password"
                    value={this.state.passwordConfirm}
                    changed={this.passwordConfirmChangedHandler}
                />
                <FormButton
                    title="Create"
                    clicked={this.createButtonClickHandler}
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

export default connect(null, mapDispatchToProps)(AddUser);
