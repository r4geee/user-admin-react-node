import { LOGIN, LOGOUT, MODAL_SHOW, MODAL_HIDE } from './actionTypes';

export const login = () => {
    return {
        type: LOGIN
    }
};

export const logout = () => {
    return {
        type: LOGOUT
    }
};

export const showModal = modal => {
    return {
        type: MODAL_SHOW,
        modal
    }
};

export const hideModal = () => {
    return {
        type: MODAL_HIDE
    }
};
