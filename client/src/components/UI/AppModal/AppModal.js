import React, { Component } from 'react';
import Modal from 'react-bootstrap-modal';
import 'react-bootstrap-modal/lib/css/rbm-patch.css'

class AppModal extends Component {
    state = {
        show: false
    };

    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children;
    }

    closeModal = () => this.props.modalClosed();

    render () {
        return (
            <div>
                <Modal
                    show={!!this.props.show}
                    aria-labelledby="ModalHeader"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>{this.props.header}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-primary' onClick={this.closeModal}>
                            OK
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default AppModal;
