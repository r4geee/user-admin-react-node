import React, {Component} from 'react';

import axios from '../../../axios';
import classes from './UserDetails.module.scss';

class UserDetails extends Component {
    state = {
        userDetails: null
    };

    componentDidMount () {
        this.loadData();
    }

    loadData () {
        if (this.props.match.params.id) {
            if (!this.state.userDetails ||
                (this.state.userDetails && this.state.userDetails.id !== this.props.match.params.id)) {
                axios.get('/user', {params: {id: this.props.match.params.id}})
                    .then(response => {
                        this.setState({userDetails: response.data});
                    });
            }
        }
    }

    render () {
        let userDetails = <p style={{textAlign: 'center'}}>Loading...!</p>;
        if (this.state.userDetails) {
            const logins = this.state.userDetails.logins.length ? (
                <div className={classes.Logins}>
                    <h4>Logins:</h4>
                    <ul className="list-group">
                        {this.state.userDetails.logins.map((loginEntry, i) => (
                            <li
                                key={i}
                                className="list-group-item">
                                {loginEntry}
                            </li>)
                        )}
                    </ul>
                </div>
            ) : null;
            userDetails = (
                <div>
                    <h1>{this.state.userDetails.email}</h1>
                    <p>Id: <strong>{this.state.userDetails.id}</strong></p>
                    {logins}
                </div>

            );
        }
        return userDetails;
    }
}

export default UserDetails;
