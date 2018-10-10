import React, {Component} from 'react';

import axios from '../../axios';
import classes from './Users.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Users extends Component {
    state = {
        users: [],
        hasPrev: false,
        hasNext: false,
        from: 0,
        limit: 5
    };

    userSelectedHandler = id => {
        this.props.history.push('/users/' + id);
    };

    userDeleteHandler = (e, id, email) => {
        e.stopPropagation();
        const isOnlyElementOnPage = this.state.users.length === 1;
        // eslint-disable-next-line
        if (confirm(`Delete user ${email} ?`)) {
            axios.post('/delete-user', { id })
                .then(() => {
                    if (isOnlyElementOnPage && this.state.hasPrev) {
                        this.onPrevHandler();
                    }
                    else {
                        this.loadData();
                    }
                });
        }
    };

    loadData = () => {
        axios.get('/users', { params: { from: this.state.from, limit: this.state.limit } })
            .then(response => {
                this.setState({
                    ...this.state,
                    users: response.data.users,
                    hasPrev: response.data.hasPrev,
                    hasNext: response.data.hasNext
                })
            });
    };

    onPrevHandler = () => {
        this.setState((state, props) => {
            return {
                ...state,
                from: state.from - state.limit
            }
        }, () => {
            this.loadData();
        });
    };

    onNextHandler = () => {
        this.setState((state, props) => {
            return {
                ...state,
                from: state.from + state.limit
            }
        }, () => {
            this.loadData();
        });
    };

    componentDidMount () {
        this.loadData();
    }

    render () {
        const users = (
            <ul className={'list-group ' + classes.UserList}>
                {this.state.users.map(user => (<li
                    key={user.id}
                    className={'list-group-item ' + classes.UserListItem}
                    onClick={() => this.userSelectedHandler(user.id)}>
                    {user.email}
                    <span className="pull-right" onClick={(e) => this.userDeleteHandler(e, user.id, user.email)}>
                        <FontAwesomeIcon icon="trash"/>
                    </span>
                </li>)
                )}
            </ul>
        );
        return (
            <div>
                <div className="btn-group">
                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={!this.state.hasPrev}
                        onClick={this.onPrevHandler}
                    >
                        Prev
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={!this.state.hasNext}
                        onClick={this.onNextHandler}>
                        Next
                    </button>
                </div>
                {users}
            </div>

        );
    }
}

export default Users;
