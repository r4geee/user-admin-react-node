import React, {Component} from 'react';
import Route from "react-router/es/Route";

import axios from '../../axios';
import UserDetails from "./UserDetails/UserDetails";

class Users extends Component {
    state = {
        users: []
    };

    componentDidMount () {
        axios.get('/users')
            .then(response => {
                this.setState({
                    ...this.state,
                    users: response.data.users
                })
            })
            .catch(error => {
                //todo show error
            });
    }

    render () {
        const users = (
            <ul className="list-group">
                {this.state.users.map(user => <li key={user.id} className="list-group-item">{user.email}</li>)}
            </ul>
        );
        return (
            <div>
                {users}
                <Route path={this.props.match.url + '/:id'} exact component={UserDetails}/>
            </div>
        );
    }
}

export default Users;
