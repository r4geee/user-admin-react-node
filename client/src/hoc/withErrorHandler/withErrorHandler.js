import React, {Component} from 'react';

import AppModal from '../../components/UI/AppModal/AppModal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        UNSAFE_componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error })
            })
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        };

        render () {
            return (
                <Aux>
                    <AppModal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                        header="Error"
                    >
                        {this.state.error ? this.state.error.message : null}
                    </AppModal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
};

export default withErrorHandler;
