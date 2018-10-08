import * as actionTypes from './actionTypes';
import {getTokenFromLS} from '../localStorage';

const initialState = {
    auth: !!getTokenFromLS()
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
    }
    return state;
};

export default reducer;
