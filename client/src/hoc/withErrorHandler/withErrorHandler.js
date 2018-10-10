import React, {Component} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import AppModal from '../../components/UI/AppModal/AppModal';
import Aux from '../Auxiliary/Auxiliary';
import { showModal, hideModal } from '../../store/actions';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        UNSAFE_componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.props.removeModal();
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.props.setModal({
                    type: 'error',
                    title: 'Error',
                    text: error.message
                });
                return Promise.reject(error);
            })
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.props.removeModal();
        };

        render () {
            return (
                <Aux>
                    <AppModal
                        show={this.props.modal}
                        title={this.props.modal ? this.props.modal.title : null}
                        type={this.props.modal ? this.props.modal.type : null}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.props.modal ? this.props.modal.text : null}
                    </AppModal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
};

const mapStateToProps = state => {
    return {
        modal: state.modal
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setModal: modal => dispatch(showModal(modal)),
        removeModal: () => dispatch(hideModal())
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withErrorHandler);
