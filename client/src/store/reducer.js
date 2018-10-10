import * as actionTypes from './actionTypes';
import {getTokenFromLS} from '../localStorage';

const initialState = {
    auth: !!getTokenFromLS(),
    modal: null
};

const reducer = (state = initialState, action) => {
    // eslint-disable-next-line
    switch (action.type) {
    case actionTypes.LOGIN:
        return {
            ...state,
            auth: true
        };
    case actionTypes.LOGOUT:
        return {
            ...state,
            auth: false
        };
    case actionTypes.MODAL_SHOW:
        return {
            ...state,
            modal: {
                ...action.modal
            }
        };
    case actionTypes.MODAL_HIDE:
        return {
            ...state,
            modal: null
        };
    }
    return state;
};

export default reducer;
